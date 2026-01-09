const clientPromise = require("./mongodb.cron");
const { sendTrackingEmail } = require("./email.cron");

async function sendPendingTrackingEmails() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "rastreio_db");

  const rastreio = await db.collection("trackings").findOne({
    emailSent: { $ne: true },
    "customer.email": { $exists: true, $ne: "" },
  });

  if (!rastreio) {
    return 0;
  }

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

  console.log("📧 Email enviado:", rastreio.trackingCode);
  return 1;
}

module.exports = { sendPendingTrackingEmails };
