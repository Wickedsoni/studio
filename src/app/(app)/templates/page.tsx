import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function TemplatesPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4">
        <h1 className="text-3xl font-bold font-headline">Templates</h1>
      </div>
      <main className="flex-1 p-4 md:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Manage Templates</CardTitle>
            <CardDescription>
              Create and manage your meeting minute templates.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Template management interface will go here.</p>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
