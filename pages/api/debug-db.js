// pages/api/debug-db.js
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const dbName = process.env.MONGODB_DB || "rastreio_db";
    const db = client.db(dbName);

    const trackingsCount = await db.collection("trackings").countDocuments();
    const rastreiosCount = await db.collection("rastreios").countDocuments();

    const sampleTracking = await db
      .collection("trackings")
      .findOne({});

    const sampleRastreio = await db
      .collection("rastreios")
      .findOne({});

    return res.status(200).json({
      connectedDb: dbName,
      collections: {
        trackings: trackingsCount,
        rastreios: rastreiosCount,
      },
      sample: {
        trackings: sampleTracking || null,
        rastreios: sampleRastreio || null,
      },
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
}
