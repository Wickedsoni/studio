'use client';

import { Plus, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NewMeetingDialog } from './new-meeting-dialog';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '../ui/separator';

const notifications = [
  {
    title: 'New Meeting Generated',
    description: 'Q4 All-Hands minutes are ready.',
    time: '5 minutes ago',
  },
  {
    title: 'Template Updated',
    description: 'Your "Formal Meeting" template was modified.',
    time: '1 hour ago',
  },
  {
    title: 'Collaboration Invite',
    description: 'Jane Doe invited you to a meeting.',
    time: '3 hours ago',
  },
];

export function DashboardHeader() {
  return (
    <div className="flex h-14 items-center justify-between gap-4 border-b bg-background px-4 lg:h-[60px] lg:px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="flex md:hidden" />
        <h1 className="text-xl font-bold font-headline">Dashboard</h1>
      </div>
      <div className="flex items-center gap-2">
        <NewMeetingDialog>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </NewMeetingDialog>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Sparkles className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
              </span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium font-headline">Notifications</h3>
                <Button variant="link" size="sm" className="-mr-2">
                  Mark all as read
                </Button>
              </div>
              <Separator />
              <div className="space-y-4 pt-2">
                {notifications.map((notification, index) => (
                  <div key={index} className="grid grid-cols-[25px_1fr] items-start">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-primary" />
                    <div className="grid gap-1">
                      <p className="font-medium">{notification.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {notification.description}
                      </p>
                       <p className="text-xs text-muted-foreground">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
