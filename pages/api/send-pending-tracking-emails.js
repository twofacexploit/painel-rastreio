import clientPromise from "@/lib/mongodb";
import { sendTrackingEmail } from "@/lib/email";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || "rastreio_db");

    const pendentes = await db.collection("trackings").find({
      trackingCode: { $exists: true },
      emailSent: false,
      "customer.email": { $exists: true, $ne: "" },
    }).toArray();

    // 🔎 DEBUG REAL (AGORA NO LUGAR CERTO)
    console.log("DEBUG pendentes encontrados:", pendentes.length);
    if (pendentes.length > 0) {
      console.log("DEBUG primeiro pendente:", pendentes[0]);
    }

    if (!pendentes.length) {
      return res.status(200).json({
        ok: true,
        message: "Nenhum email pendente",
      });
    }

    let enviados = 0;
    let erros = [];

    for (const rastreio of pendentes) {
      try {
        // 1️⃣ ENVIA EMAIL
        await sendTrackingEmail({
          to: rastreio.customer.email,
          name: rastreio.customer.first_name || "Cliente",
          code: rastreio.trackingCode,
        });

        // 2️⃣ MARCA COMO ENVIADO (SÓ DEPOIS)
        await db.collection("trackings").updateOne(
          { _id: rastreio._id },
          {
            $set: {
              emailSent: true,
              emailSentAt: new Date(),
            },
          }
        );

        enviados++;

        console.log(
          "📧 Email enviado:",
          rastreio.customer.email,
          rastreio.trackingCode
        );

      } catch (err) {
        console.error("Erro enviando email:", err);
        erros.push({
          trackingCode: rastreio.trackingCode,
          error: err.message,
        });
      }
    }

    return res.status(200).json({
      ok: true,
      enviados,
      erros,
    });

  } catch (error) {
    console.error("Erro geral:", error);
    return res.status(500).json({ error: "Erro interno" });
  }
}
