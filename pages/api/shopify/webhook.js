import crypto from "crypto";
import getRawBody from "raw-body";
import clientPromise from "@/lib/mongodb";
import { createOrGetTrackingForOrder } from "@/lib/trackings";
import { sendTrackingEmail } from "@/lib/email";

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

  // 🔐 HEADERS SHOPIFY
  const hmacHeader = req.headers["x-shopify-hmac-sha256"];
  const topic = req.headers["x-shopify-topic"];

  const generatedHmac = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");

  if (generatedHmac !== hmacHeader) {
    console.error("❌ HMAC inválido");
    return res.status(401).send("HMAC inválido");
  }

  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (err) {
    return res.status(400).send("JSON inválido");
  }

  // 🔒 PROCESSA SOMENTE PEDIDOS
  if (topic !== "orders/create" && topic !== "orders/updated") {
    return res.status(200).send("Evento ignorado");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "rastreio_db");

    // 1️⃣ CRIA OU BUSCA O TRACKING
    const tracking = await createOrGetTrackingForOrder(payload);

    // 🔎 VALIDA EMAIL
    const email = tracking.customer?.email;
    const name = tracking.customer?.first_name || "Cliente";

    if (!email) {
      console.warn("Pedido sem email, ignorado");
      return res.status(200).send("Pedido sem email");
    }

    // 2️⃣ VERIFICA SE JÁ FOI ENVIADO
    if (tracking.emailSent === true) {
      return res.status(200).send("Email já enviado");
    }

    // 3️⃣ ENVIA EMAIL (PRIMEIRO)
    await sendTrackingEmail({
      to: email,
      name,
      code: tracking.trackingCode,
    });

    // 4️⃣ MARCA COMO ENVIADO (SÓ APÓS SUCESSO)
    await db.collection("trackings").updateOne(
      { _id: tracking._id },
      {
        $set: {
          emailSent: true,
          emailSentAt: new Date(),
        },
      }
    );

    console.log(
      "📧 Email enviado via webhook:",
      email,
      tracking.trackingCode
    );

    return res.status(200).json({
      ok: true,
      trackingCode: tracking.trackingCode,
    });

  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).send("Erro interno");
  }
}
