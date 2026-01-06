// pages/api/trackings/[code].js
import { getTrackingByCode } from "../../../lib/trackings";

export default async function handler(req, res) {
  const { code } = req.query;

  if (req.method !== "GET") {
    return res.status(405).send("Method not allowed");
  }

  try {
    const tracking = await getTrackingByCode(code.toUpperCase());

    if (!tracking) {
      return res.status(404).json({ error: "Código não encontrado" });
    }

    return res.status(200).json(tracking);
  } catch (err) {
    console.error("Erro buscando tracking:", err);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
