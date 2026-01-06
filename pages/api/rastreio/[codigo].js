import { getTrackingByCode } from "../../../lib/trackings";

export default async function handler(req, res) {
  const { codigo } = req.query;

  const tracking = await getTrackingByCode(codigo);

  if (!tracking) {
    return res.status(404).json({ error: "Código não encontrado" });
  }

  return res.status(200).json(tracking);
}
