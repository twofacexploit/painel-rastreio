// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrackingEmail({
  to,
  name,
  code,
  destinationCity,
  destinationState,
}) {
  const trackingLink = `https://bravacargo.com.br/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,

    // ASSUNTO INFORMATIVO (SEM CARA DE MARKETING)
    subject: `Rastreamento do seu pedido • ${code}`,

    // TEXTO PLANO (GMAIL PRIORIZA)
    text: `
Olá ${name},

Seu pedido foi despachado e já está em transporte.

Código de rastreamento:
${code}

Destino:
${destinationCity} - ${destinationState}

Acompanhe sua entrega pelo link oficial:
${trackingLink}

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    // HTML BONITO + SEGURO
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;
            color:#111827;
            line-height:1.6;
            max-width:560px;
            margin:0 auto;">

  <h2 style="margin-bottom:12px;">
    Olá ${name},
  </h2>

  <p>
    Seu pedido foi despachado e já está em transporte.
  </p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

  <p style="margin-bottom:6px;">
    <strong>Código de rastreamento</strong>
  </p>

  <p style="font-size:18px;
            font-weight:bold;
            letter-spacing:1px;
            margin-top:0;">
    ${code}
  </p>

  <p style="margin-top:16px;">
    <strong>Destino:</strong><br/>
    ${destinationCity} - ${destinationState}
  </p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

  <p>
    <strong>Acompanhe sua entrega:</strong><br/>
    <a href="${trackingLink}">
      ${trackingLink}
    </a>
  </p>

  <p style="font-size:12px;color:#4b5563;margin-top:32px;">
    Brava Cargo • Logística Nacional<br/>
    © 2008 Brava Cargo
  </p>

</div>
    `,
  });
}
