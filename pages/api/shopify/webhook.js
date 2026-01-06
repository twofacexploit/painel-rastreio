// pages/api/shopify/webhook.js
import crypto from "crypto";
import getRawBody from "raw-body";
import { createOrGetTrackingForOrder } from "../../../lib/trackings";

export const config = {
  api: {
    bodyParser: false, // importante: vamos ler o raw body
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
    console.log("Recebido: ", hmacHeader);
    console.log("Gerado:   ", generatedHmac);
    return res.status(401).send("HMAC inválido");
  }

  // Agora sim, o body é confiável
  let payload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (err) {
    console.error("Erro parse JSON", err);
    return res.status(400).send("JSON inválido");
  }

  console.log("✅ Webhook verificado:", topic, "loja:", shopDomain);

  // Vamos lidar só com orders/create e orders/updated por enquanto
  if (topic === "orders/create" || topic === "orders/updated") {
    try {
      const tracking = await createOrGetTrackingForOrder(payload);

      console.log("Tracking gerado/encontrado:", tracking.trackingCode);

      // Aqui é onde, futuramente, você envia email ou WhatsApp
      // Por enquanto, só retorna OK

      return res.status(200).json({ ok: true, trackingCode: tracking.trackingCode });
    } catch (err) {
      console.error("Erro criando tracking:", err);
      return res.status(500).send("Erro ao criar tracking");
    }
  }

  // Outros tópicos: só confirma
  return res.status(200).send("OK");
}
