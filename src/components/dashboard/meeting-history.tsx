import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MOCK_MEETINGS } from '@/lib/mock-data';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

export function MeetingHistory() {
  const meetings = MOCK_MEETINGS;

  const isLive = (date: string) => {
    const meetingDate = new Date(date);
    const now = new Date();
    // Assuming a meeting is "live" if it started in the last hour
    return now.getTime() - meetingDate.getTime() < 60 * 60 * 1000 && now > meetingDate;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Meeting History</CardTitle>
        <CardDescription>
          Review your past meetings and generated minutes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead className="hidden sm:table-cell">Date</TableHead>
              <TableHead className="hidden md:table-cell text-center">Participants</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {meetings.map((meeting) => (
              <TableRow key={meeting.id}>
                <TableCell className="font-medium">{meeting.title}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  {new Date(meeting.date).toLocaleDateString()}
                </TableCell>
                <TableCell className="hidden md:table-cell text-center">
                  <Badge variant="secondary">{meeting.participants}</Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {isLive(meeting.date) ? (
                    <Badge variant='destructive' className="flex items-center w-fit">
                      <span className="relative flex h-2 w-2 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                      </span>
                      Live
                    </Badge>
                  ) : <Badge variant='outline'>Finished</Badge>}
                </TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/meetings/${meeting.id}`}>
                      View <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
