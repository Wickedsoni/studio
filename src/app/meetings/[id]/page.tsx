'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { GenerateMeetingSummaryOutput } from '@/ai/flows/generate-meeting-summary';

export default function MeetingDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const searchParams = useSearchParams();
  const summaryParam = searchParams.get('summary');

  const parsedSummary: GenerateMeetingSummaryOutput | null = React.useMemo(() => {
    if (!summaryParam) return null;
    try {
      return JSON.parse(decodeURIComponent(summaryParam));
    } catch (e) {
      console.error("Failed to parse summary from URL", e);
      return null;
    }
  }, [summaryParam]);

  const attendeeAvatars = PlaceHolderImages.filter(p => p.id.startsWith('attendee-avatar-'));

  // In a real app, you would fetch meeting data based on params.id
  // For now, we'll use a mix of static data and the summary from the URL.
  const meeting = {
    id: params.id,
    title: parsedSummary?.title || 'Meeting Details',
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    host: {
      name: 'John Doe',
      email: 'john.doe@example.com'
    },
    attendees: [
      { name: 'Alice', email: 'alice@example.com', avatar: attendeeAvatars[0]?.imageUrl, hint: attendeeAvatars[0]?.imageHint },
      { name: 'Bob', email: 'bob@example.com', avatar: attendeeAvatars[1]?.imageUrl, hint: attendeeAvatars[1]?.imageHint },
      { name: 'Charlie', email: 'charlie@example.com', avatar: attendeeAvatars[2]?.imageUrl, hint: attendeeAvatars[2]?.imageHint },
    ],
    agenda: parsedSummary?.summary.agenda || 'No agenda provided.',
    discussionPoints: parsedSummary?.summary.discussionPoints || [],
    decisions: parsedSummary?.summary.decisions || [],
    actionItems: parsedSummary?.summary.actionItems || [],
  };

  const generateMinutesText = () => {
    return `
Meeting: ${meeting.title}
Date: ${meeting.date}
Time: ${meeting.time}

Host: ${meeting.host.name} (${meeting.host.email})

Attendees:
${meeting.attendees.map(a => `${a.name} <${a.email}>`).join('\n')}

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
                <TooltipProvider>
                  <div className="flex flex-wrap items-center gap-2">
                    {meeting.attendees.slice(0, maxDisplayedAttendees).map((attendee) => (
                      <Tooltip key={attendee.email}>
                        <TooltipTrigger>
                          <Badge variant="secondary" className="cursor-default">
                            {attendee.name}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={attendee.avatar || ''} data-ai-hint={attendee.hint} />
                              <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{attendee.name}</p>
                              <p className="text-sm text-muted-foreground">{attendee.email}</p>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                    {remainingAttendeesCount > 0 && (
                       <Popover>
                          <PopoverTrigger asChild>
                            <Badge variant="outline" className="cursor-pointer">
                              +{remainingAttendeesCount} more
                            </Badge>
                          </PopoverTrigger>
                          <PopoverContent className="w-80 p-0">
                             <ScrollArea className="h-64">
                              <div className="p-2">
                                 <h4 className="mb-2 px-2 py-1.5 text-base font-semibold leading-none">All Attendees</h4>
                                 <ul className="space-y-1">
                                  {meeting.attendees.map((attendee) => (
                                    <li key={attendee.email} className="flex items-center gap-3 rounded-md px-2 py-1.5 text-base hover:bg-muted">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={attendee.avatar || ''} data-ai-hint={attendee.hint} />
                                        <AvatarFallback>{attendee.name[0]}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="font-medium">{attendee.name}</p>
                                        <p className="text-sm text-muted-foreground">{attendee.email}</p>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </ScrollArea>
                          </PopoverContent>
                        </Popover>
                    )}
                  </div>
                </TooltipProvider>
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
