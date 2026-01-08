import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://SEU_DOMINIO.com/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: "Seu código de rastreamento",
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6">
        <h2>Olá ${name},</h2>

        <p>Seu pedido foi despachado com sucesso.</p>

        <p>
          <strong>Código de rastreamento:</strong><br/>
          ${code}
        </p>

        <p>
          👉 <a href="${trackingLink}">Acompanhar entrega</a>
        </p>

        <p style="margin-top:40px;font-size:12px;color:#777">
          Brava Cargo • Logística Nacional
        </p>
      </div>
    `,
  });
}
