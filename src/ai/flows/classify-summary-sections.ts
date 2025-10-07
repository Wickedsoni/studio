'use server';

/**
 * @fileOverview A flow to classify portions of the meeting transcript based on pre-defined sections.
 *
 * - classifySummarySections - A function that handles the classification process.
 * - ClassifySummarySectionsInput - The input type for the classifySummarySections function.
 * - ClassifySummarySectionsOutput - The return type for the classifySummarySections function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ClassifySummarySectionsInputSchema = z.object({
  transcript: z.string().describe('The meeting transcript to classify.'),
});
export type ClassifySummarySectionsInput = z.infer<
  typeof ClassifySummarySectionsInputSchema
>;

const ClassifySummarySectionsOutputSchema = z.object({
  sections: z.array(
    z.object({
      sectionName: z
        .string()
        .describe(
          'The name of the section the text belongs to (e.g., Date, Time, Attendees, Agenda, Discussion Points, Decisions, Action Items).'
        ),
      text: z.string().describe('The classified text from the transcript.'),
    })
  ),
});
export type ClassifySummarySectionsOutput = z.infer<
  typeof ClassifySummarySectionsOutputSchema
>;

export async function classifySummarySections(
  input: ClassifySummarySectionsInput
): Promise<ClassifySummarySectionsOutput> {
  return classifySummarySectionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'classifySummarySectionsPrompt',
  input: {schema: ClassifySummarySectionsInputSchema},
  output: {schema: ClassifySummarySectionsOutputSchema},
  prompt: `You are an AI expert in parsing meeting transcripts and classifying text into predefined sections.

  Your task is to analyze the given meeting transcript and classify each part of the text into the appropriate section.

  The possible sections are:
  - Date
  - Time
  - Attendees
  - Agenda
  - Discussion Points
  - Decisions
  - Action Items

  Analyze the following transcript and classify each segment into the appropriate section. Return the sections as a JSON array.

  Transcript: {{{transcript}}}

  Ensure that the output is a valid JSON.
  `,
});

const classifySummarySectionsFlow = ai.defineFlow(
  {
    name: 'classifySummarySectionsFlow',
    inputSchema: ClassifySummarySectionsInputSchema,
    outputSchema: ClassifySummarySectionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
