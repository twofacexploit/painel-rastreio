// lib/trackings.js
import clientPromise from "./mongodb";

// Conecta ao MongoDB
export async function getDb() {
  const client = await clientPromise;
  return client.db(process.env.MONGODB_DB || "rastreio_db");
}

// Gera código tipo MOV123456BR
export function generateTrackingCode() {
  const random = Math.floor(100000 + Math.random() * 900000);
  return `MOV${random}BR`;
}

// Função para adicionar horas
function addHours(date, hours) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

// 🔥 GERA TODOS OS EVENTOS COM HORAS CORRIGIDAS EM UTC
function generateTrackingEvents(city, state) {
  const base = new Date();

  return [
    {
      title: "Objeto postado",
      description: "Seu pedido foi postado e está em processamento.",
      location: "Unidade de Coleta – São Paulo/SP",
      date: addHours(base, 0).toISOString(),
    },
    {
      title: "Objeto coletado",
      description: "O pedido foi coletado pela transportadora.",
      location: "Unidade Operacional – São Paulo/SP",
      date: addHours(base, 2).toISOString(),
    },
    {
      title: "Objeto em processo de triagem",
      description: "O pedido está sendo separado.",
      location: "Unidade de Tratamento – São Paulo/SP",
      date: addHours(base, 14).toISOString(),
    },
    {
      title: "Objeto encaminhado",
      description: "O pedido foi encaminhado para o centro de distribuição.",
      location: "Unidade de Tratamento – São Paulo/SP",
      date: addHours(base, 22).toISOString(),
    },
    {
      title: "Objeto recebido na unidade de transbordo",
      description: "O pacote chegou ao centro de transbordo.",
      location: `Unidade de Transbordo – ${city}/${state}`,
      date: addHours(base, 28).toISOString(),
    },
    {
      title: `Objeto em trânsito para ${city}/${state}`,
      description: "Seu pacote está a caminho da cidade de destino.",
      location: `Centro Logístico – ${city}/${state}`,
      date: addHours(base, 32).toISOString(),
    },
    {
      title: "Objeto chegou à unidade de destino",
      description: "O pedido chegou à unidade de sua região.",
      location: `Unidade de Distribuição – ${city}/${state}`,
      date: addHours(base, 50).toISOString(),
    },
    {
      title: "Objeto conferido e separado para entrega",
      description: "O pacote está sendo preparado para entrega.",
      location: `Centro de Distribuição – ${city}/${state}`,
      date: addHours(base, 53).toISOString(),
    },
    {
      title: "Saiu para entrega",
      description: "O pedido está em rota de entrega.",
      location: `Centro de Distribuição – ${city}/${state}`,
      date: addHours(base, 54).toISOString(),
    },
  ];
}

// Criar ou retornar tracking existente
export async function createOrGetTrackingForOrder(order) {
  const db = await getDb();
  const trackings = db.collection("trackings");

  // já existe?
  const existing = await trackings.findOne({ shopifyOrderId: order.id });
  if (existing) return existing;

  const trackingCode = generateTrackingCode();

  const city = order.shipping_address?.city || "Cidade";
  const state = order.shipping_address?.province || "XX";

  const events = generateTrackingEvents(city, state);
  const now = new Date();

  const doc = {
    shopifyOrderId: order.id,
    shopifyOrderNumber: order.order_number,
    trackingCode,
    status: "Objeto postado",
    customerName: `${order.customer?.first_name || ""} ${order.customer?.last_name || ""}`,
    customerEmail: order.email,
    destinationCity: city,
    destinationState: state,
    destinationFull: order.shipping_address || null,
    events,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  await trackings.insertOne(doc);

  return doc;
}

// Buscar rastreio por código
export async function getTrackingByCode(code) {
  const db = await getDb();
  const trackings = db.collection("trackings");
  return trackings.findOne({ trackingCode: code });
}
