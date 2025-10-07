import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h1 className="text-3xl font-bold font-headline">Settings</h1>
      </div>
      <main className="flex-1 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Settings</CardTitle>
            <CardDescription>
              Manage your account and app settings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Settings page content goes here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
