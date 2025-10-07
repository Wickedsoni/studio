import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, Lightbulb, Upload } from 'lucide-react';
import { MOCK_TEMPLATES } from '@/lib/mock-data';

export default function TemplatesPage() {
  const templates = MOCK_TEMPLATES;

  return (
    <div className="flex flex-1 flex-col">
      <div className="border-b p-4 flex items-center justify-between">
        <h1 className="text-3xl font-bold font-headline">Templates</h1>
        <Button variant="outline">
          <Upload className="mr-2 h-4 w-4" />
          Import Template
        </Button>
      </div>
      <main className="flex-1 p-4 md:p-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.id} className="flex flex-col">
              <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                  {template.icon === 'Brain' && <Brain className="h-6 w-6" />}
                  {template.icon === 'Lightbulb' && (
                    <Lightbulb className="h-6 w-6" />
                  )}
                  {template.title}
                </CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-muted-foreground space-y-2">
                  <p className="font-semibold">Sections Included:</p>
                  <ul className="list-disc list-inside">
                    {template.sections.map((section, i) => (
                      <li key={i}>{section}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex-col items-stretch gap-2 md:flex-row">
                <Button size="sm" className="w-full">
                  Use Template
                </Button>
                <Button size="sm" variant="secondary" className="w-full">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Suggest New
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
