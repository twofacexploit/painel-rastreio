// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: "Seu código de rastreamento",

    text: `
Olá ${name},

Seu pedido foi despachado com sucesso.

Código de rastreamento:
${code}

Acompanhe sua entrega:
${trackingLink}

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    html: `
<div style="font-family:Arial,Helvetica,sans-serif;line-height:1.6;color:#111">
  <p>Olá ${name},</p>

  <p>Seu pedido foi despachado com sucesso.</p>

  <p><strong>Código de rastreamento:</strong><br/>${code}</p>

  <p>
    <a href="${trackingLink}">
      ${trackingLink}
    </a>
  </p>

  <p style="font-size:12px;color:#555">
    Brava Cargo • Logística Nacional<br/>
    © 2008 Brava Cargo
  </p>
</div>
    `,
  });
}
