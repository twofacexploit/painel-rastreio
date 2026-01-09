// lib/email.js
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendTrackingEmail({ to, name, code }) {
  const trackingLink = `https://bravacargo.com/rastreio/${code}`;

  await resend.emails.send({
    from: "Brava Cargo <rastreamento@bravacargo.com.br>",
    to,

    subject: `Pedido enviado com sucesso • ${code}`,

    // TEXTO PLANO (ANTI-SPAM / BACKUP)
    text: `
Pedido Enviado com Sucesso

Olá ${name},

Seu pedido foi despachado e está a caminho.

Código de rastreamento:
${code}

Acompanhe o status da sua entrega:
${trackingLink}

Informações importantes:
- Prazo estimado de entrega: 3 a 7 dias úteis
- Você receberá atualizações automáticas sobre o status

Brava Cargo • Logística Nacional
© 2008 Brava Cargo
    `.trim(),

    // HTML ESTILO "ROTA SERENA" (SEM CLIPPING)
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

    <h2 style="margin-top:0;">
      Pedido Enviado com Sucesso
    </h2>

    <p>
      Olá <strong>${name}</strong>,
    </p>

    <p>
      Seu pedido foi despachado e está a caminho!
      Abaixo seguem as informações de rastreamento:
    </p>

    <p style="margin-top:24px;">
      <strong>Código de Rastreamento:</strong><br/>
      <span style="font-size:16px;letter-spacing:1px;">
        ${code}
      </span>
    </p>

    <p style="margin-top:16px;">
      Acompanhe o status da sua entrega em tempo real:
    </p>

    <p style="margin:20px 0;">
      <a href="${trackingLink}"
         style="background:#1f2937;
                color:#ffffff;
                padding:12px 24px;
                text-decoration:none;
                border-radius:6px;
                font-size:14px;
                display:inline-block;">
        Rastrear Pedido
      </a>
    </p>

    <p style="font-size:13px;color:#374151;">
      Ou acesse diretamente pelo link:<br/>
      <a href="${trackingLink}">
        ${trackingLink}
      </a>
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

    <p><strong>Informações importantes:</strong></p>
    <ul style="padding-left:20px;font-size:13px;color:#374151;">
      <li>Prazo estimado de entrega: 3 a 7 dias úteis</li>
      <li>Você receberá atualizações automáticas sobre o status</li>
      <li>Em caso de dúvidas, entre em contato conosco</li>
    </ul>

    <p style="margin-top:24px;">
      Obrigado por escolher a <strong>Brava Cargo</strong>!
    </p>

    <p>
      Atenciosamente,<br/>
      <strong>Equipe Brava Cargo</strong>
    </p>

    <hr style="border:none;border-top:1px solid #e5e7eb;margin:32px 0;" />

    <p style="font-size:11px;color:#6b7280;">
      Esta é uma mensagem automática. Em caso de dúvidas,
      entre em contato com nosso suporte.
    </p>

    <p style="font-size:11px;color:#6b7280;">
      © 2008 Brava Cargo • Todos os direitos reservados
    </p>

  </div>
</div>
    `,
  });
}
