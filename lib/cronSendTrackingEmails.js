// lib/cronSendTrackingEmails.js
import cron from "node-cron";
import clientPromise from "@/lib/mongodb";
import { sendTrackingEmail } from "@/lib/email";

export function startTrackingEmailCron() {
  // ⏱️ A CADA 10 SEGUNDOS
  cron.schedule("*/10 * * * * *", async () => {
    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB || "rastreio_db");

      const pendentes = await db.collection("trackings").find({
        trackingCode: { $exists: true },
        emailSent: false,
        "customer.email": { $exists: true, $ne: "" },
      }).toArray();

      if (!pendentes.length) return;

      for (const rastreio of pendentes) {
        try {
          await sendTrackingEmail({
            to: rastreio.customer.email,
            name: rastreio.customer.first_name || "Cliente",
            code: rastreio.trackingCode,
          });

          await db.collection("trackings").updateOne(
            { _id: rastreio._id },
            {
              $set: {
                emailSent: true,
                emailSentAt: new Date(),
              },
            }
          );

          console.log(
            "📧 [CRON] Email enviado:",
            rastreio.customer.email,
            rastreio.trackingCode
          );

        } catch (err) {
          console.error("Erro ao enviar email:", err.message);
        }
      }
    } catch (err) {
      console.error("Erro no CRON:", err.message);
    }
  });

  console.log("⏱️ CRON de emails iniciado (a cada 10s)");
}
