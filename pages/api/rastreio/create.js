import { connectDB } from "@/lib/mongodb";
import { sendTrackingEmail } from "@/lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { cliente, destino, statusPagamento } = req.body;

    // 🔒 GARANTE QUE SÓ CRIA SE PAGO
    if (statusPagamento !== "paid") {
      return res.status(400).json({ error: "Pedido não está pago" });
    }

    if (!cliente?.email) {
      return res.status(400).json({ error: "Email do cliente obrigatório" });
    }

    const db = await connectDB();

    const codigo = "BRV" + Date.now();

    const rastreio = {
      codigo,
      destinationCity: destino.cidade,
      destinationState: destino.estado,
      destinationFull: cliente,
      statusPagamento: "paid",
      emailSent: false,
      createdAt: new Date(),
    };

    // 1️⃣ SALVA NO BANCO
    await db.collection("rastreios").insertOne(rastreio);

    // 2️⃣ ENVIA E-MAIL UMA ÚNICA VEZ
    await sendTrackingEmail({
      to: cliente.email,
      name: cliente.first_name,
      code: codigo,
    });

    // 3️⃣ MARCA COMO ENVIADO
    await db.collection("rastreios").updateOne(
      { codigo },
      { $set: { emailSent: true } }
    );

    return res.status(201).json({ ok: true, codigo });

  } catch (error) {
    console.error("Erro ao criar rastreio:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
