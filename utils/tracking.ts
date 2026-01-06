// utils/tracking.ts
export type TrackingEvent = {
  status: string;
  location: string;
  timestamp: string; // ISO
};

function addHours(date: Date, hours: number) {
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}

export function generateTrackingEvents(baseDate: Date, city: string, state: string): TrackingEvent[] {
  const events = [
    {
      status: "Objeto postado",
      location: "Unidade de Coleta – São Paulo/SP",
      timestamp: addHours(baseDate, 0).toISOString(),
    },
    {
      status: "Objeto coletado",
      location: "Unidade Operacional – São Paulo/SP",
      timestamp: addHours(baseDate, 2).toISOString(),
    },
    {
      status: "Objeto em processo de triagem",
      location: "Unidade de Tratamento – São Paulo/SP",
      timestamp: addHours(baseDate, 14).toISOString(), // 2 + 12
    },
    {
      status: "Objeto encaminhado",
      location: "Unidade de Tratamento – São Paulo/SP",
      timestamp: addHours(baseDate, 22).toISOString(), // +8
    },
    {
      status: "Objeto recebido na unidade de transbordo",
      location: `Unidade de Transbordo – ${city}/${state}`,
      timestamp: addHours(baseDate, 28).toISOString(), // +6
    },
    {
      status: `Objeto em trânsito para ${city}/${state}`,
      location: `Unidade de Transbordo – ${city}/${state}`,
      timestamp: addHours(baseDate, 32).toISOString(), // +4
    },
    {
      status: "Objeto chegou à unidade de destino",
      location: `Unidade de Distribuição – ${city}/${state}`,
      timestamp: addHours(baseDate, 50).toISOString(), // +18
    },
    {
      status: "Objeto conferido e separado para entrega",
      location: `Centro de Distribuição – ${city}/${state}`,
      timestamp: addHours(baseDate, 53).toISOString(), // +3
    },
    {
      status: "Saiu para entrega",
      location: `Centro de Distribuição – ${city}/${state}`,
      timestamp: addHours(baseDate, 54).toISOString(), // +1
    },
  ];

  return events;
}
