'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UploadCloud, FileText, Link as LinkIcon, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function NewMeetingDialog({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  // Mock processing and redirect
  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    // Simulate AI processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const newMeetingId = `meet-${Date.now()}`;
    setIsProcessing(false);
    setOpen(false);
    // Redirect to a mock meeting results page
    router.push(`/meetings/${newMeetingId}`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle className="font-headline">New Meeting</DialogTitle>
          <DialogDescription>
            Upload a recording, paste text, or provide a link to generate
            minutes.
          </DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="upload" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">
              <UploadCloud className="mr-2 h-4 w-4" />
              File
            </TabsTrigger>
            <TabsTrigger value="text">
              <FileText className="mr-2 h-4 w-4" />
              Text
            </TabsTrigger>
            <TabsTrigger value="link" disabled>
              <LinkIcon className="mr-2 h-4 w-4" />
              Link
            </TabsTrigger>
          </TabsList>
          <TabsContent value="upload" className="pt-4">
            <form onSubmit={handleGenerate}>
              <div className="grid gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="meeting-file">Upload Audio/Video/Text</Label>
                  <Input id="meeting-file" type="file" />
                  <p className="text-xs text-muted-foreground">
                    Supports .mp3, .wav, .mp4, .txt
                  </p>
                </div>
                <Button type="submit" disabled={isProcessing}>
                  {isProcessing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isProcessing ? 'Processing...' : 'Generate Minutes'}
                </Button>
              </div>
            </form>
          </TabsContent>
          <TabsContent value="text" className="pt-4">
            <form onSubmit={handleGenerate} className="grid gap-4">
              <Label htmlFor="transcript-text">Paste Transcript</Label>
              <Textarea
                id="transcript-text"
                placeholder="Paste your meeting transcript here..."
                className="min-h-[150px]"
              />
              <Button type="submit" disabled={isProcessing}>
                {isProcessing && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isProcessing ? 'Processing...' : 'Generate Minutes'}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
