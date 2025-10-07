
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
} from 'lucide-react';
import Link from 'next/link';

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
    attendees: ['Alice', 'Bob', 'Charlie', 'David', 'Eve'],
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

  const generateMailtoLink = () => {
    const subject = `Minutes of Meeting: ${meeting.title}`;
    const body = `
Meeting: ${meeting.title}
Date: ${meeting.date}
Time: ${meeting.time}

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
    `;

    return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div className="flex-1 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold font-headline">{meeting.title}</h1>
            <p className="text-muted-foreground">Minutes of Meeting</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Printer className="mr-2 h-4 w-4" /> Print
            </Button>
            <Button variant="outline">
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

            <div className="mb-6">
              <h3 className="mb-2 text-lg font-semibold font-headline">
                Attendees
              </h3>
              <div className="flex flex-wrap gap-2">
                {meeting.attendees.map((name) => (
                  <Badge key={name} variant="secondary">
                    {name}
                  </Badge>
                ))}
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
