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
  summary: z.object({
    agenda: z.string().describe('The agenda of the meeting.'),
    discussionPoints: z
      .array(z.string())
      .describe('The discussion points of the meeting.'),
    decisions: z.array(z.string()).describe('The decisions made during the meeting.'),
    actionItems: z.array(z.string()).describe('The action items from the meeting.'),
  }),
});
export type GenerateMeetingSummaryOutput = z.infer<
  typeof GenerateMeetingSummaryOutputSchema
>;

const summarizeMeetingContent = ai.defineTool({
  name: 'summarizeMeetingContent',
  description: 'Summarizes the content of a meeting transcript into key sections such as agenda, discussion points, decisions, and action items.',
  inputSchema: z.object({
    transcript: z.string().describe('The transcript of the meeting to summarize.'),
    section: z.enum([
      'agenda',
      'discussionPoints',
      'decisions',
      'actionItems',
    ]),
  }),
  outputSchema: z.string(),
  async (input) => {
    // Placeholder implementation, replace with actual summarization logic
    return `Summary of ${input.section} from transcript: ${input.transcript.substring(0, 50)}...`;
  },
});

const meetingSummaryPrompt = ai.definePrompt({
  name: 'meetingSummaryPrompt',
  input: {schema: GenerateMeetingSummaryInputSchema},
  output: {schema: GenerateMeetingSummaryOutputSchema},
  tools: [summarizeMeetingContent],
  prompt: `You are an AI assistant that summarizes meeting transcripts into structured minutes of meeting (MoM) documents.

  Here is the meeting transcript:
  {{transcript}}

  Use the summarizeMeetingContent tool to extract and summarize the following components from the transcript:

  - Agenda: Briefly describe the meeting's agenda.
  - Discussion Points: List the key discussion points.
  - Decisions: List the decisions made.
  - Action Items: List the action items assigned.

  Return the summary in a structured JSON format:
  {
    "summary": {
      "agenda": "...",
      "discussionPoints": ["...", "..."],
      "decisions": ["...", "..."],
      "actionItems": ["...", "..."]
    }
  }`,
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

export type {GenerateMeetingSummaryFlow} from './generate-meeting-summary';
