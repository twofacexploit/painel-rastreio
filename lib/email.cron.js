const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTrackingEmail({
  to,
  name,
  code,
  destinationCity = "—",
  destinationState = "",
}) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: `Rastreamento do seu pedido • ${code}`,

    text: `
Olá ${name},

Seu pedido foi despachado e já está em transporte.

Código de rastreamento:
${code}

Destino:
${destinationCity}${destinationState ? " - " + destinationState : ""}

Acompanhe sua entrega:
${trackingLink}

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    html: `
<div style="font-family:Arial,Helvetica,sans-serif;
            color:#111827;
            line-height:1.6;
            max-width:560px;
            margin:0 auto;">

  <h2>Olá ${name},</h2>

  <p>Seu pedido foi despachado e já está em transporte.</p>

  <p><strong>Código de rastreamento:</strong><br/>
    <span style="font-size:18px;letter-spacing:1px">${code}</span>
  </p>

  <p><strong>Destino:</strong><br/>
    ${destinationCity}${destinationState ? " - " + destinationState : ""}
  </p>

  <p><strong>Acompanhe sua entrega:</strong><br/>
    <a href="${trackingLink}">${trackingLink}</a>
  </p>

  <p style="font-size:12px;color:#4b5563">
    Brava Cargo • Logística Nacional<br/>
    © 2008 Brava Cargo
  </p>
</div>
    `,
  });
}

module.exports = { sendTrackingEmail };
