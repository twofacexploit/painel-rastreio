const clientPromise = require("./mongodb.cron");
const { sendTrackingEmail } = require("./email.cron");

async function sendPendingTrackingEmails() {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB || "rastreio_db");

  const rastreio = await db.collection("trackings").findOneAndUpdate(
    {
      emailSent: { $ne: true },
      emailSending: { $ne: true },
      "customer.email": { $exists: true, $ne: "" },
    },
    {
      $set: {
        emailSending: true,
        emailSendingAt: new Date(),
      },
    }
  );

  if (!rastreio.value) return 0;

  try {
    await sendTrackingEmail({
  to: rastreio.value.customer.email,
  name: rastreio.value.customer.first_name,
  code: rastreio.value.trackingCode,
  destinationCity: rastreio.value.destinationCity,
  destinationState: rastreio.value.destinationState,
});

    await db.collection("trackings").updateOne(
      { _id: rastreio.value._id },
      {
        $set: {
          emailSent: true,
          emailSentAt: new Date(),
        },
        $unset: {
          emailSending: "",
        },
      }
    );

    console.log("📧 Email enviado:", rastreio.value.trackingCode);
    return 1;

  } catch (err) {
    await db.collection("trackings").updateOne(
      { _id: rastreio.value._id },
      {
        $unset: {
          emailSending: "",
        },
      }
    );

    console.error("Erro ao enviar email:", err.message);
    return 0;
  }
}

module.exports = { sendPendingTrackingEmails };
