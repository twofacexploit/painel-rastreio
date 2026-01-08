import { sendTrackingEmail } from "@/lib/email";

export default async function handler(req, res) {
  try {
    await sendTrackingEmail({
      to: "twofacexploit@gmail.com",
      name: "Cliente Teste",
      code: "BRAVA123456",
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Falha ao enviar e-mail" });
  }
}
