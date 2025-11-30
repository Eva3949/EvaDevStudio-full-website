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
    console.error('Telegram Bot Token or Chat ID is not configured.');
    // Silently fail if not configured, as this is a notification and not critical path.
    return;
  }

  const text = `
New Contact Form Submission:

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}
`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  // Use fetch and handle errors in .catch to avoid blocking the main thread.
  // This is a "fire-and-forget" operation.
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
    }),
  }).then(response => {
    if (!response.ok) {
      response.json().then(err => {
        console.error('Failed to send message to Telegram:', response.status, err);
      }).catch(() => {
        console.error('Failed to send message to Telegram and could not parse error response.');
      });
    }
  }).catch(error => {
    console.error('Error sending message to Telegram:', error);
  });
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
    // Perform AI classification but don't let it block submission if it fails.
    try {
      const classification = await classifyContactForm({ message });
      if (!classification.isServiceRelated) {
        // Return a soft-fail message if not service related, but still save it.
        console.log("Contact form submission was not service-related.");
      }
    } catch (aiError) {
      console.error("AI classification failed:", aiError);
      // Don't block the user, just log the error and proceed.
    }

    // This is the most critical part: save the data.
    await addDoc(collection(db, 'contacts'), {
        name,
        email,
        phone,
        message,
        createdAt: serverTimestamp(),
    });

    // Send Telegram notification in the background (fire-and-forget).
    sendToTelegram(name, email, phone, message);

    // If we've reached here, the core task (saving to DB) was successful.
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you shortly.',
    };

  } catch (error) {
    console.error('Error saving contact form to Firestore:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while saving your message. Please try again later.',
    };
  }
}
