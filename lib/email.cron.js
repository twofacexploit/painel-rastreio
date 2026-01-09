const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  const response = await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: `Pedido enviado • ${code}`,

    // ✅ TEXTO PLANO (GMAIL PRIORIZA ISSO)
    text: `
Pedido a caminho.

Olá ${name},

Seu pedido foi despachado e já está em transporte.

Código de rastreamento:
${code}

Acompanhe sua entrega pelo link oficial:
${trackingLink}

Informações importantes:
• Prazo médio de entrega: 3 a 7 dias úteis
• Você receberá atualizações do status
• Em caso de dúvidas, entre em contato conosco

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    // ✅ HTML SIMPLES (UPGRADE VISUAL)
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;
            color:#111827;
            line-height:1.6;
            max-width:600px;
            margin:0 auto;">

  <h2>Pedido enviado com sucesso</h2>

  <p>Olá <strong>${name}</strong>,</p>

  <p>
    Seu pedido foi despachado e já está em transporte.
  </p>

  <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

  <p><strong>Código de rastreamento:</strong></p>

  <div style="background:#f8fafc;
              border:1px solid #e5e7eb;
              padding:12px;
              border-radius:6px;
              font-size:16px;
              font-weight:bold;
              letter-spacing:1px;">
    ${code}
  </div>

  <p style="margin-top:20px;">
    <strong>Acompanhe sua entrega:</strong><br/>
    <a href="${trackingLink}">${trackingLink}</a>
  </p>

  <p style="margin-top:20px;">
    <strong>Informações importantes:</strong><br/>
    • Prazo médio de entrega: 3 a 7 dias úteis<br/>
    • Você receberá atualizações do status<br/>
    • Em caso de dúvidas, entre em contato conosco
  </p>

  <p style="font-size:12px;color:#555;margin-top:30px;">
    Brava Cargo • Logística Nacional<br/>
    © 2008 Brava Cargo
  </p>

</div>
    `,
  });

  if (response.error) {
    console.error("❌ ERRO RESEND:", response.error);
    throw new Error(response.error.message);
  }

  console.log("✅ Email enviado:", code);
}

module.exports = { sendTrackingEmail };
