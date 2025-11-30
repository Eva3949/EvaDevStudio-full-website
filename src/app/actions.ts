'use server';

import { z } from 'zod';
import { classifyContactForm } from '@/ai/flows/classify-contact-form';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters.'),
});

type FormState = {
  success: boolean;
  message: string;
};

async function sendToTelegram(
  name: string,
  email: string,
  phone: string | undefined,
  message: string
) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram bot token or chat ID is not configured.');
    return; // Don't block form submission if Telegram is not configured
  }

  const text = `
New Contact Form Submission:
---------------------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
---------------------------
Message:
${message}
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
        text: text,
        parse_mode: 'Markdown',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send message to Telegram:', errorData);
    }
  } catch (error) {
    console.error('Error sending message to Telegram:', error);
  }
}

export async function submitContactForm(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = contactFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: validatedFields.error.errors.map((e) => e.message).join(', '),
    };
  }

  const { name, email, phone, message } = validatedFields.data;

  try {
    const classification = await classifyContactForm({ message });

    if (!classification.isServiceRelated) {
      return {
        success: false,
        message: "Thank you for your message. It seems your inquiry is not related to our services. For general questions, please check our FAQ or contact us through other channels.",
      };
    }

    // Save to Firestore and send to Telegram concurrently
    await Promise.all([
        addDoc(collection(db, 'contacts'), {
            name,
            email,
            phone,
            message,
            createdAt: serverTimestamp(),
        }),
        sendToTelegram(name, email, phone, message)
    ]);


    return {
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
    };
  } catch (error) {
    console.error('Error submitting form:', error);
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.',
    };
  }
}
