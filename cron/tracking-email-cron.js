require("dotenv").config({ path: ".env.local" });

const cron = require("node-cron");
const { sendPendingTrackingEmails } = require("../lib/sendPendingTrackingEmails");

console.log("⏱️ Cron de rastreamento iniciado (a cada 10s)");

cron.schedule("*/10 * * * * *", async () => {
  try {
    const sent = await sendPendingTrackingEmails();
    if (sent) {
      console.log("📨 Email processado");
    }
  } catch (err) {
    console.error("❌ Erro no cron:", err.message);
  }
});
