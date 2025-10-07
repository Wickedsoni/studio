'use server';
/**
 * @fileOverview A development server for the AI flows.
 *
 * This file is used to start the Genkit development server, which provides a UI for testing and debugging the AI flows.
 */

import {config} from 'dotenv';
config();

import '@/ai/flows/classify-summary-sections.ts';
import '@/ai/flows/generate-meeting-summary.ts';
import '@/ai/flows/transcribe-meeting.ts';
