'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMeetAddon} from '@/components/meet/meet-addon-provider';
import {NewMeetingDialog} from '@/components/dashboard/new-meeting-dialog';
import {Button} from '@/components/ui/button';
import {Plus, Loader2} from 'lucide-react';
import {transcribeMeeting} from '@/ai/flows/transcribe-meeting';
import { generateMeetingSummary } from '@/ai/flows/generate-meeting-summary';

export default function MeetPage() {
  const {meetingInfo, startCollaboration, isAddon, setAddonState} =
    useMeetAddon();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isAddon) {
      startCollaboration();
    }
  }, [isAddon, startCollaboration]);

  const handleNewMeeting = async () => {
    if (!isAddon) return;
    setIsProcessing(true);
    try {
      // For a real add-on, you'd get a recording. For this test, we'll use a mock transcript.
      const mockTranscript = `
        Meeting Title: Q4 Marketing Strategy
        Host: John Doe
        Attendees: Alice, Bob, Charlie
        Date: October 27, 2023
        Time: 2:00 PM

        John: Alright everyone, let's kick off the Q4 marketing strategy meeting. Alice, can you start with the campaign overview?
        Alice: Thanks, John. Our main goal for Q4 is to increase lead generation by 20%. We'll focus on three key channels: social media, content marketing, and a new partnership with a tech influencer. The main campaign will be called 'Future Forward'.
        Bob: I like the name. For content, I propose a series of blog posts and a downloadable ebook on 'AI in the Workplace'. This will support the 'Future Forward' theme and capture leads.
        Charlie: On the social media front, we'll run targeted ads on LinkedIn and Twitter. We should also do a live Q&A session with the tech influencer to maximize reach.
        John: Excellent points. Let's make some decisions. We're green-lighting the 'Future Forward' campaign. The blog series and ebook are approved. Charlie, please finalize the influencer agreement by next week.
        Alice: I'll get the master project plan updated with these details.
        John: Great. Action item for Bob: draft the first two blog posts by the end of the month. Action item for Alice: send the updated project plan to everyone. That's a wrap. Thanks, everyone.
      `;
      const mockMeetingDataUri = `data:text/plain;base64,${Buffer.from(mockTranscript).toString('base64')}`;

      // 1. Transcribe (in this case, just passing the text)
      const transcriptionResult = await transcribeMeeting({meetingDataUri: mockMeetingDataUri});
      
      // 2. Generate Summary from transcription
      const summaryResult = await generateMeetingSummary({transcript: transcriptionResult.transcription});
      
      const meetingId = meetingInfo?.meetingId || `meet-${Date.now()}`;
      
      // In a real app, you would save the transcription and summary to Firestore here.
      // For now, we'll pass the summary to the meeting page via query params for demonstration.
      const summaryQueryParam = encodeURIComponent(JSON.stringify(summaryResult));
      const finalUrl = `/meetings/${meetingId}?summary=${summaryQueryParam}`;

      // This updates the URL for all participants in the add-on
      setAddonState(JSON.stringify({page: finalUrl}));

      // And navigates the current user
      router.push(finalUrl);

    } catch (error) {
      console.error('Error processing new meeting:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isAddon) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-headline">Welcome to CogniMeet</h1>
          <p className="text-muted-foreground">
            This is the add-on view, but it seems you are not in Google Meet.
          </p>
          <NewMeetingDialog>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Meeting (Standalone)
            </Button>
          </NewMeetingDialog>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-headline">CogniMeet is Active</h1>
        <p className="text-muted-foreground">
          Ready to generate minutes for this meeting.
        </p>
        <Button onClick={handleNewMeeting} disabled={isProcessing}>
          {isProcessing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Plus className="mr-2 h-4 w-4" />
          )}
          {isProcessing ? 'Processing...' : 'Generate Minutes'}
        </Button>
      </div>
    </div>
  );
}
