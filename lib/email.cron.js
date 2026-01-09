const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  const response = await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: `Pedido enviado com sucesso • ${code}`,

    // TEXTO PLANO (ANTI-SPAM / BACKUP)
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

    // HTML BONITO, LEVE E NÃO CLIPADO
    html: `
<div style="background:#f4f6f8;padding:24px;font-family:Arial,Helvetica,sans-serif;">
  <div style="max-width:560px;margin:0 auto;background:#ffffff;
              padding:28px;border-radius:8px;color:#111;line-height:1.6;">

    <h2 style="margin-top:0;margin-bottom:16px;">
      Pedido enviado com sucesso
    </h2>

    <p style="margin-top:0;">
      Olá <strong>${name}</strong>,
    </p>

    <p>
      Seu pedido foi despachado com sucesso e já está em transporte.
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

    <p style="margin-bottom:6px;color:#374151;">
      <strong>Código de rastreamento</strong>
    </p>

    <div style="background:#f8fafc;border:1px solid #e5e7eb;
                padding:14px;border-radius:6px;
                font-size:16px;font-weight:bold;letter-spacing:1px;">
      ${code}
    </div>

    <p style="margin-top:20px;">
      <strong>Acompanhe sua entrega:</strong><br/>
      <a href="${trackingLink}" style="color:#2563eb;">
        ${trackingLink}
      </a>
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;" />

    <p style="font-size:13px;color:#555;">
      Brava Cargo • Logística Nacional<br/>
      © 2008 Brava Cargo
    </p>

  </div>
</div>
    `,
  });

  if (response.error) {
    console.error("❌ ERRO RESEND:", response.error);
    throw new Error(response.error.message);
  }

  console.log("✅ RESEND OK:", response.data?.id);
}

module.exports = { sendTrackingEmail };
