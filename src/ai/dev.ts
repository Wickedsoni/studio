import { config } from 'dotenv';
config();

import '@/ai/flows/classify-summary-sections.ts';
import '@/ai/flows/generate-meeting-summary.ts';
import '@/ai/flows/transcribe-meeting.ts';