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
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';

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
            Paste a transcript to generate minutes. For live meetings, use the
            Google Meet add-on.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleGenerate} className="grid gap-4 pt-4">
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
      </DialogContent>
    </Dialog>
  );
}
