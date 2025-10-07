import { MeetingHistory } from '@/components/dashboard/meeting-history';

export default function MeetingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h1 className="text-3xl font-bold font-headline">All Meetings</h1>
      </div>
      <main className="flex-1 p-4 md:p-8">
        <MeetingHistory />
      </main>
    </div>
  );
}
