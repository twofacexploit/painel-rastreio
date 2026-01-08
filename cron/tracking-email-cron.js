require("dotenv").config({ path: ".env.local" });

const cron = require("node-cron");
const { sendPendingTrackingEmails } = require("../lib/sendPendingTrackingEmails");

console.log("⏱️ Cron de rastreamento iniciado (a cada 10s)");

cron.schedule("*/10 * * * * *", async () => {
  try {
    const enviados = await sendPendingTrackingEmails();
    if (enviados > 0) {
      console.log(`✅ ${enviados} emails enviados`);
    }
  } catch (err) {
    console.error("Erro no cron:", err.message);
  }
});
