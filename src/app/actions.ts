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

    await addDoc(collection(db, 'contacts'), {
      name,
      email,
      phone,
      message,
      createdAt: serverTimestamp(),
    });

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
