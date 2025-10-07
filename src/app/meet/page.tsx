// This page will be rendered in the Google Meet side panel.
// We will add logic here to interact with the Meet Add-on SDK.

import { NewMeetingDialog } from '@/components/dashboard/new-meeting-dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export default function MeetPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-background p-4">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-headline">Welcome to MinuteMind</h1>
        <p className="text-muted-foreground">
          Your AI assistant for Google Meet.
        </p>
        <NewMeetingDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </NewMeetingDialog>
      </div>
    </div>
  );
}
