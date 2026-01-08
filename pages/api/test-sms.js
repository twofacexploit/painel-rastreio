import { sendTrackingSMS } from "@/lib/sendTrackingSMS";

export default async function handler(req, res) {
  try {
    await sendTrackingSMS({
      telefone: "(62) 99113-0757",
      codigo: "MOV483807BR", // 👈 SIMULA código real
    });

    return res.status(200).json({
      ok: true,
      message: "SMS de teste enviado",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      error: err.message,
    });
  }
}
