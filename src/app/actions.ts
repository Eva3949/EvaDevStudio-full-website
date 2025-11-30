'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { classifyContactForm } from '@/ai/flows/classify-contact-form';
import { sendTelegramMessage } from './actions/send-telegram-message';

const formSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});

export async function submitContactForm(values: z.infer<typeof formSchema>) {
  try {
    const validatedData = formSchema.parse(values);

    // This is the primary and most important task.
    const docRef = await addDoc(collection(db, 'contacts'), {
      ...validatedData,
      createdAt: serverTimestamp(),
      isServiceRelated: null, // Default value before classification
    });

    // --- Secondary, "fire-and-forget" tasks ---

    // 1. AI Classification (don't block for this)
    classifyContactForm({ message: validatedData.message })
      .then(classification => {
        // This is an update, not a new write.
        // We don't need to 'await' this either. It can happen in the background.
        db.collection('contacts').doc(docRef.id).update({
          isServiceRelated: classification.isServiceRelated,
        });
      })
      .catch(error => {
        // Log the classification error to the server console for debugging.
        // This does not affect the user.
        console.error('AI classification failed:', error);
      });

    // 2. Telegram Notification (don't block for this)
    // This will now correctly run in the background.
    Promise.resolve(sendTelegramMessage(validatedData));

    // If we get here, it means saving to Firestore was successful.
    // This is the most important success criteria.
    return { success: true };
    
  } catch (error) {
    console.error('Error submitting form:', error);
    // This will catch validation errors or Firestore write errors.
    return { success: false, error: 'An unexpected error occurred. Please try again.' };
  }
}
