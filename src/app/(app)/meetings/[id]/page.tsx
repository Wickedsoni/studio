
'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
  Calendar,
  Clock,
  Users,
  Send,
  Download,
  Printer,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function MeetingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const resolvedParams = React.use(params);
  // In a real app, you would fetch meeting data based on params.id
  // For now, we'll use static data.
  const meeting = {
    id: resolvedParams.id,
    title: 'Q3 Project Kick-off',
    date: 'October 26, 2023',
    time: '10:00 AM - 10:45 AM',
    host: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    attendees: ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace', 'Heidi', 'Ivan', 'Judy'],
    agenda: 'To align on the goals, scope, and timeline for the Q3 project.',
    discussionPoints: [
      'Review of Q2 performance and key learnings.',
      "Presentation of the new project's goals and objectives.",
      'Discussion on proposed timeline and milestones.',
      'Resource allocation and team roles.',
      'Q&A session.',
    ],
    decisions: [
      'The proposed timeline is approved.',
      'Alice will be the project lead.',
      'The team will use the new project management tool.',
    ],
    actionItems: [
      'Bob to create the project board by EOD Friday.',
      'Charlie to schedule a follow-up meeting with the design team.',
      'Eve to finalize the resource allocation sheet by Monday.',
    ],
  };

  const generateMinutesText = () => {
    return `
Meeting: ${meeting.title}
Date: ${meeting.date}
Time: ${meeting.time}

Host: ${meeting.host.name} (${meeting.host.email})

Attendees:
${meeting.attendees.join('\n')}

Agenda:
${meeting.agenda}

Discussion Points:
${meeting.discussionPoints.map((point) => `- ${point}`).join('\n')}

Decisions:
${meeting.decisions.map((decision) => `- ${decision}`).join('\n')}

Action Items:
${meeting.actionItems.map((item) => `- ${item}`).join('\n')}
    `.trim();
  };

  const generateMailtoLink = () => {
    const subject = `Minutes of Meeting: ${meeting.title}`;
    const body = generateMinutesText();
    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleDownload = () => {
    const text = generateMinutesText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `minutes-${meeting.title.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  
  const maxDisplayedAttendees = 4;
  const remainingAttendeesCount = meeting.attendees.length - maxDisplayedAttendees;

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold font-headline">{meeting.title}</h1>
            <p className="text-muted-foreground">Minutes of Meeting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline" onClick={handleDownload}>
              <Download className="mr-2 h-4 w-4" /> Download
            </Button>
            <Button asChild>
              <Link href={generateMailtoLink()}>
                <Send className="mr-2 h-4 w-4" /> Send Email
              </Link>
            </Button>
          </div>
        </div>

        <Card className="shadow-lg">
          <CardContent className="p-8">
            <div className="mb-8 grid grid-cols-2 gap-2 text-sm text-muted-foreground md:grid-cols-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{meeting.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{meeting.time}</span>
              </div>
              <div className="col-span-2 flex items-center gap-2 md:col-span-1">
                <Users className="h-4 w-4" />
                <span>{meeting.attendees.length} Participants</span>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
               <div>
                  <h3 className="mb-2 text-lg font-semibold font-headline">
                    Host
                  </h3>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <User className="h-4 w-4" />
                    <span>{meeting.host.name} ({meeting.host.email})</span>
                  </div>
                </div>
              <div>
                <h3 className="mb-2 text-lg font-semibold font-headline">
                  Attendees
                </h3>
                <div className="flex flex-wrap items-center gap-2">
                  {meeting.attendees.slice(0, maxDisplayedAttendees).map((name) => (
                    <Badge key={name} variant="secondary">
                      {name}
                    </Badge>
                  ))}
                  {remainingAttendeesCount > 0 && (
                     <Popover>
                        <PopoverTrigger asChild>
                          <Badge variant="outline" className="cursor-pointer">
                            +{remainingAttendeesCount} more
                          </Badge>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                           <ScrollArea className="h-48">
                            <div className="p-4">
                               <h4 className="mb-2 font-medium leading-none">All Attendees</h4>
                               <ul className="list-disc list-inside text-sm text-muted-foreground">
                                {meeting.attendees.map((name) => (
                                  <li key={name}>{name}</li>
                                ))}
                              </ul>
                            </div>
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                  )}
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="space-y-6">
              <section>
                <h3 className="mb-2 text-lg font-semibold font-headline">
                  Agenda
                </h3>
                <p className="text-muted-foreground">{meeting.agenda}</p>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold font-headline">
                  Discussion Points
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {meeting.discussionPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold font-headline">
                  Decisions
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {meeting.decisions.map((decision, i) => (
                    <li key={i}>{decision}</li>
                  ))}
                </ul>
              </section>

              <section>
                <h3 className="mb-2 text-lg font-semibold font-headline">
                  Action Items
                </h3>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {meeting.actionItems.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
