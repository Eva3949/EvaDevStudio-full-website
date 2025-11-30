'use server';

// This is a separate, dedicated server action for sending a Telegram message.
// It is designed to be called in a "fire-and-forget" manner.

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function sendTelegramMessage(data: ContactFormData) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not configured.');
    // We don't return an error to the client, just log it on the server.
    return;
  }

  const text = `
*New Contact Form Submission*

*Name:* ${data.name}
*Email:* ${data.email}
*Subject:* ${data.subject}
*Message:*
${data.message}
  `.trim();

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
      // This is crucial: prevent Next.js from caching this server-side fetch
      cache: 'no-store',
    });

    if (!response.ok) {
      // If the API returns an error, log it for debugging.
      const errorData = await response.json();
      console.error('Failed to send Telegram message:', errorData);
    }
  } catch (error) {
    // Handle network errors or other issues with the fetch call.
    console.error('Error in sendTelegramMessage fetch:', error);
  }
}
