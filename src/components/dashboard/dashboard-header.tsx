import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewMeetingDialog } from './new-meeting-dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function DashboardHeader() {
  return (
    <div className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex md:hidden" />
        <h1 className="text-xl font-bold font-headline">Dashboard</h1>
      </div>
      <NewMeetingDialog>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Meeting
        </Button>
      </NewMeetingDialog>
    </div>
  );
}
