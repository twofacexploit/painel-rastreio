const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  const response = await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com>",
    to,
    subject: `Pedido em trânsito • ${code}`,

    // ✅ TEXTO PLANO (GMAIL PRIORIZA)
    text: `
Pedido enviado!

Olá ${name},

Seu pedido foi despachado e está a caminho.

Código de rastreamento:
${code}

Acompanhe sua entrega:
${trackingLink}

Informações importantes:
• Prazo estimado: 3 a 7 dias úteis
• Você receberá atualizações automáticas
• Em caso de dúvidas, entre em contato

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    // ✅ HTML BONITO (MAS NÃO DEPENDENTE)
    html: `
<div style="font-family:Arial,Helvetica,sans-serif;
            background-color:#f4f6f8;
            padding:24px;">
  <div style="max-width:600px;
              margin:0 auto;
              background:#ffffff;
              padding:32px;
              border-radius:8px;
              color:#111827;
              line-height:1.6;">

    <h2>Pedido enviado com sucesso</h2>

    <p>Olá <strong>${name}</strong>,</p>

    <p>
      Seu pedido foi despachado e está a caminho.
      Confira abaixo as informações de rastreamento:
    </p>

    <p style="margin-top:24px;">
      <strong>Código de rastreamento:</strong><br/>
      <span style="font-size:16px;letter-spacing:1px;">
        ${code}
      </span>
    </p>

    <p style="margin-top:20px;">
      <a href="${trackingLink}"
         style="background:#1f2937;
                color:#ffffff;
                padding:12px 24px;
                text-decoration:none;
                border-radius:6px;
                display:inline-block;">
        Rastrear Pedido
      </a>
    </p>

    <p style="font-size:13px;color:#374151;">
      Ou acesse diretamente:<br/>
      <a href="${trackingLink}">
        ${trackingLink}
      </a>
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

    <p style="font-size:12px;color:#6b7280;">
      • Prazo estimado: 3 a 7 dias úteis<br/>
      • Atualizações automáticas de status
    </p>

    <p style="font-size:11px;color:#6b7280;margin-top:24px;">
      © 2008 Brava Cargo • Todos os direitos reservados
    </p>

  </div>
</div>
    `,
  });

  if (response.error) {
    console.error("❌ ERRO RESEND:", response.error);
    throw new Error(response.error.message);
  }

  console.log("📧 Email enviado:", code);
}

module.exports = { sendTrackingEmail };
