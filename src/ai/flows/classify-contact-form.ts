'use server';

/**
 * @fileOverview A contact form classification AI agent.
 *
 * - classifyContactForm - A function that classifies contact form messages and determines if they are service-related.
 * - ClassifyContactFormInput - The input type for the classifyContactForm function.
 * - ClassifyContactFormOutput - The return type for the classifyContactForm function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifyContactFormInputSchema = z.object({
  message: z
    .string()
    .describe('The message submitted through the contact form.'),
});
export type ClassifyContactFormInput = z.infer<typeof ClassifyContactFormInputSchema>;

const ClassifyContactFormOutputSchema = z.object({
  isServiceRelated: z
    .boolean()
    .describe(
      'Whether the contact form message is related to mobile app development, web development, or graphics design services.'
    ),
});
export type ClassifyContactFormOutput = z.infer<typeof ClassifyContactFormOutputSchema>;

export async function classifyContactForm(input: ClassifyContactFormInput): Promise<ClassifyContactFormOutput> {
  return classifyContactFormFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifyContactFormPrompt',
  input: {schema: ClassifyContactFormInputSchema},
  output: {schema: ClassifyContactFormOutputSchema},
  prompt: `You are an AI assistant specializing in classifying contact form messages for EvaDevStudio, a company specializing in Mobile Application Development, Web Development, and Graphics Design.

  Determine whether the following message is related to the company\'s services. If the message relates to any of the services provided by EvaDevStudio, respond with \"true\"; otherwise, respond with \"false\".

  Message: {{{message}}}`,
});

const classifyContactFormFlow = ai.defineFlow(
  {
    name: 'classifyContactFormFlow',
    inputSchema: ClassifyContactFormInputSchema,
    outputSchema: ClassifyContactFormOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
