import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewMeetingDialog } from './new-meeting-dialog';

export function DashboardHeader() {
  return (
    <div className="flex items-center justify-between border-b bg-card p-4">
      <h1 className="text-2xl font-bold font-headline">Dashboard</h1>
      <NewMeetingDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </NewMeetingDialog>
    </div>
  );
}
