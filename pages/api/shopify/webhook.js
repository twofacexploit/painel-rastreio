// pages/api/shopify/webhook.js
import crypto from "crypto";
import getRawBody from "raw-body";
import { createOrGetTrackingForOrder } from "../../../lib/trackings";
import { sendTrackingEmail } from "../../../lib/email";
import clientPromise from "../../../lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const secret = process.env.SHOPIFY_WEBHOOK_SECRET;
  if (!secret) {
    return res.status(500).send("Webhook secret não configurado");
  }

  let rawBody;
  try {
    rawBody = await getRawBody(req);
  } catch (err) {
    console.error("Erro lendo raw body", err);
    return res.status(400).send("Erro lendo body");
  }

  const hmacHeader = req.headers["x-shopify-hmac-sha256"];
  const topic = req.headers["x-shopify-topic"];
  const shopDomain = req.headers["x-shopify-shop-domain"];

  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");

  if (generatedHmac !== hmacHeader) {
    console.log("❌ HMAC inválido");
    return res.status(401).send("HMAC inválido");
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (err) {
    return res.status(400).send("JSON inválido");
  }

  console.log("✅ Webhook verificado:", topic, "loja:", shopDomain);

  // 🔒 SÓ PROCESSA PEDIDO PAGO
  const isPaid =
    payload.financial_status === "paid" ||
    payload.financial_status === "partially_paid";

  if (!isPaid) {
    return res.status(200).send("Pedido ainda não pago");
  }

  if (topic === "orders/create" || topic === "orders/updated") {
    try {
      const tracking = await createOrGetTrackingForOrder(payload);

      if (!tracking?.customer?.email) {
        return res.status(200).send("Pedido sem email do cliente");
      }

      const client = await clientPromise;
      const db = client.db();

      // 🔒 IDPOTÊNCIA REAL (ANTI DUPLICAÇÃO)
      const result = await db.collection("trackings").findOneAndUpdate(
        {
          trackingCode: tracking.trackingCode,
          emailSent: false,
        },
        {
          $set: { emailSent: true },
        }
      );

      // Se não encontrou para atualizar, email já foi enviado
      if (!result.value) {
        return res.status(200).send("Email já enviado");
      }

      await sendTrackingEmail({
        to: tracking.customer.email,
        name: tracking.customer.first_name,
        code: tracking.trackingCode,
      });

      console.log("📧 Email de rastreio enviado com sucesso");

      return res.status(200).json({
        ok: true,
        trackingCode: tracking.trackingCode,
      });

    } catch (err) {
      console.error("Erro criando tracking:", err);
      return res.status(500).send("Erro ao criar tracking");
    }
  }

  return res.status(200).send("OK");
}
