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
    // Non-critical AI classification. Log error if it fails but don't block submission.
    classifyContactForm({ message }).then(classification => {
        if (!classification.isServiceRelated) {
            console.log("Contact form submission was not service-related.");
        }
    }).catch(aiError => {
        console.error("AI classification failed:", aiError);
    });

    // Save the data to Firestore. This is the primary and critical action.
    await addDoc(collection(db, 'contacts'), {
        name,
        email,
        phone,
        message,
        createdAt: serverTimestamp(),
    });

    // Return success message to the user.
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
