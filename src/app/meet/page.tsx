'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {useMeetAddon} from '@/components/meet/meet-addon-provider';
import {NewMeetingDialog} from '@/components/dashboard/new-meeting-dialog';
import {Button} from '@/components/ui/button';
import {Plus, Loader2} from 'lucide-react';
import {transcribeMeeting} from '@/ai/flows/transcribe-meeting';

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
      // In a real scenario, you'd get the meeting recording URI.
      // For this example, we'll use a placeholder.
      // This would ideally come from the Meet Add-on SDK after a recording is saved.
      const mockMeetingDataUri = 'data:text/plain;base64,';
      const result = await transcribeMeeting({meetingDataUri: mockMeetingDataUri});
      
      // The meeting ID should come from the meetingInfo or a newly created one.
      const meetingId = meetingInfo?.meetingId || `meet-${Date.now()}`;
      
      // Store result and navigate. This part is still conceptual.
      // In a real app, you would save the transcription and summary before navigating.
      console.log('Transcription result:', result);

      // We're updating the addon state, which would be visible to all participants
      setAddonState(JSON.stringify({page: `/meetings/${meetingId}`}));

      // For now, let's just simulate the end of processing.
      router.push(`/meetings/${meetingId}`);

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
          <h1 className="text-2xl font-headline">Welcome to MinuteMind</h1>
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
        <h1 className="text-2xl font-headline">MinuteMind is Active</h1>
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
