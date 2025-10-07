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
