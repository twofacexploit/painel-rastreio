const { formatPhoneBR } = require("../utils/formatPhoneBR");

async function sendTrackingSMS({ telefone, codigo }) {
  const phone = formatPhoneBR(telefone);
  if (!phone) throw new Error("Telefone inválido");

  const msg = `Brava Cargo 📦
Seu pedido foi enviado!

Código: ${codigo}
Acompanhe:
https://SEUSITE.com/rastreio/${codigo}`;

  const url =
    "https://api.smsdev.com.br/v1/send" +
    `?key=${process.env.SMSDEV_API_KEY}` +
    `&type=9` +
    `&number=${phone}` +
    `&msg=${encodeURIComponent(msg)}`;

  console.log("📤 URL FINAL:", url);

  const response = await fetch(url);
  const text = await response.text();

  console.log("📩 STATUS HTTP:", response.status);
  console.log("📩 RESPOSTA RAW:", text);

  if (!response.ok) {
    throw new Error("Falha no envio do SMS");
  }
}

module.exports = { sendTrackingSMS };
