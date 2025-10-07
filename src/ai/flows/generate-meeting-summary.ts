'use server';

/**
 * @fileOverview A meeting summary AI agent.
 *
 * - generateMeetingSummary - A function that handles the meeting summary generation process.
 * - GenerateMeetingSummaryInput - The input type for the generateMeetingSummary function.
 * - GenerateMeetingSummaryOutput - The return type for the generateMeetingSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMeetingSummaryInputSchema = z.object({
  transcript: z.string().describe('The transcript of the meeting.'),
});
export type GenerateMeetingSummaryInput = z.infer<
  typeof GenerateMeetingSummaryInputSchema
>;

const GenerateMeetingSummaryOutputSchema = z.object({
  title: z.string().describe('The title of the meeting.'),
  summary: z.object({
    agenda: z.string().describe('The agenda of the meeting.'),
    discussionPoints: z
      .array(z.string())
      .describe('The discussion points of the meeting.'),
    decisions: z
      .array(z.string())
      .describe('The decisions made during the meeting.'),
    actionItems: z
      .array(z.string())
      .describe('The action items from the meeting.'),
  }),
});
export type GenerateMeetingSummaryOutput = z.infer<
  typeof GenerateMeetingSummaryOutputSchema
>;

const meetingSummaryPrompt = ai.definePrompt({
  name: 'meetingSummaryPrompt',
  input: {schema: GenerateMeetingSummaryInputSchema},
  output: {schema: GenerateMeetingSummaryOutputSchema},
  prompt: `You are an AI assistant that summarizes meeting transcripts into structured minutes of meeting (MoM) documents.

  Based on the following transcript, generate a concise title for the meeting and summarize the content into the following sections:
  - Agenda
  - Discussion Points
  - Decisions
  - Action Items

  Here is the meeting transcript:
  {{{transcript}}}

  Return the summary in the specified JSON format.
  `,
});

const generateMeetingSummaryFlow = ai.defineFlow(
  {
    name: 'generateMeetingSummaryFlow',
    inputSchema: GenerateMeetingSummaryInputSchema,
    outputSchema: GenerateMeetingSummaryOutputSchema,
  },
  async input => {
    const {output} = await meetingSummaryPrompt(input);
    return output!;
  }
);

export async function generateMeetingSummary(
  input: GenerateMeetingSummaryInput
): Promise<GenerateMeetingSummaryOutput> {
  return generateMeetingSummaryFlow(input);
}
