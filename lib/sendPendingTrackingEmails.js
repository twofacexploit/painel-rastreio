const clientPromise = require("./mongodb.cron");
const { sendTrackingEmail } = require("./email.cron");

async function sendPendingTrackingEmails() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "rastreio_db");

  const pendentes = await db.collection("trackings").find({
    trackingCode: { $exists: true },
    emailSent: false,
    "customer.email": { $exists: true, $ne: "" },
  }).toArray();

  if (!pendentes.length) return 0;

  let enviados = 0;

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

      enviados++;
      console.log("📧 Email enviado:", rastreio.trackingCode);
    } catch (err) {
      console.error("Erro ao enviar email:", err.message);
    }
  }

  return enviados;
}

module.exports = {
  sendPendingTrackingEmails,
};
