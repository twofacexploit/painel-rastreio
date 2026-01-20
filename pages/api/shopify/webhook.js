import crypto from "crypto";
import getRawBody from "raw-body";
import clientPromise from "@/lib/mongodb";
import { createOrGetTrackingForOrder } from "@/lib/trackings";

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

  // ✅ AQUI ESTÁ A CORREÇÃO PRINCIPAL
  // 🔒 ACEITA SOMENTE PEDIDOS COM PAGAMENTO CONFIRMADO
  const financialStatus = payload?.financial_status;

  if (financialStatus !== "paid") {
    console.log(
      "⏭ Pedido ignorado — pagamento não confirmado:",
      financialStatus,
      "Pedido:",
      payload?.order_number
    );
    return res.status(200).send("Pedido não pago — ignorado");
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "rastreio_db");

    // 1️⃣ CRIA OU BUSCA O TRACKING (APENAS PARA PEDIDOS PAGOS)
    const tracking = await createOrGetTrackingForOrder(payload);

    // 🔎 SE NÃO TEM EMAIL, NÃO FAZ NADA
    const email = tracking.customer?.email;
    if (!email) {
      console.warn("Pedido sem email, ignorado");
      return res.status(200).send("Pedido sem email");
    }

    // ⚠️ IMPORTANTE:
    // ❌ NÃO ENVIA EMAIL AQUI
    // ❌ NÃO MARCA emailSent
    // ✅ O CRON VAI CUIDAR DISSO

    console.log(
      "📦 Tracking criado para pedido pago:",
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
