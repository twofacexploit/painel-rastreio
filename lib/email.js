// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://SEU_DOMINIO.com/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: "Seu pedido foi enviado — acompanhe a entrega",

    // 🔒 TEXTO PLANO (ANTI-SPAM)
    text: `
Olá ${name},

Seu pedido foi despachado com sucesso.

Código de rastreamento:
${code}

Acompanhe a entrega no link oficial:
${trackingLink}

Brava Cargo — Logística Nacional
    `.trim(),

    // 🔒 HTML SIMPLES (SEM GATILHOS DE SPAM)
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color:#111">
        <h2>Olá ${name},</h2>

        <p>Seu pedido foi despachado com sucesso.</p>

        <p>
          <strong>Código de rastreamento:</strong><br/>
          ${code}
        </p>

        <p>
          Você pode acompanhar a entrega pelo link oficial abaixo:
        </p>

        <p>
          👉 <a href="${trackingLink}" target="_blank" rel="noopener noreferrer">
            Acompanhar entrega
          </a>
        </p>

        <p style="margin-top:40px;font-size:12px;color:#555">
          Brava Cargo • Logística Nacional
        </p>
      </div>
    `,
  });
}
