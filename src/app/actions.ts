'use server';

import {z} from 'zod';

const schema = z.object({
  name: z.string().min(2, {message: 'Name must be at least 2 characters.'}),
  email: z.string().email({message: 'Please enter a valid email.'}),
  phone: z.string().min(10, {message: 'Please enter a valid phone number.'}),
  message: z.string().min(10, {message: 'Message must be at least 10 characters.'}),
});

export async function sendMessage(data: {name: string, email: string, phone: string, message: string}) {
  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid data provided.'
    };
  }
  
  const { name, email, phone, message } = validatedFields.data;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not configured.');
    return { success: false, message: 'Server configuration error. Could not send message.' };
  }

  const telegramMessage = `
New message from your portfolio:
-------------------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Message: ${message}
-------------------------------
  `;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: telegramMessage,
        parse_mode: 'Markdown',
      }),
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send Telegram message:', errorData);
      return { success: false, message: 'Failed to send message via Telegram.' };
    }

    return { success: true, message: 'Message sent successfully!' };
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
    return { success: false, message: 'Failed to send message. Please try again later.' };
  }
}
