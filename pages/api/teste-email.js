import { sendTrackingEmail } from "@/lib/email";

export default async function handler(req, res) {
  try {
    await sendTrackingEmail({
      to: "twofacexploit@gmail.com",
      name: "Cliente Teste",
      code: "MOV123456BR",
      destinationCity: "São Paulo",
      destinationState: "SP",
    });

    return res.status(200).json({
      ok: true,
      message: "E-mail de teste enviado com sucesso",
    });

  } catch (error) {
    console.error("Erro ao enviar e-mail de teste:", error);

    return res.status(500).json({
      ok: false,
      error: "Falha ao enviar e-mail de teste",
    });
  }
}
