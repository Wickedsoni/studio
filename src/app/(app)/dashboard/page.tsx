import { DashboardHeader } from '@/components/dashboard/dashboard-header';
import { MeetingHistory } from '@/components/dashboard/meeting-history';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Upload, Clock, Users } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <DashboardHeader />
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Minutes Generated
                </CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">+5 this month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Hours Saved
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">~8h</div>
                <p className="text-xs text-muted-foreground">
                  Estimate based on usage
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  My Templates
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <Button size="sm" variant="outline" className="mt-2">
                  <Upload className="mr-2 h-4 w-4" />
                  Manage Templates
                </Button>
              </CardContent>
            </Card>
          </div>
          <MeetingHistory />
        </div>
      </main>
    </div>
  );
}
