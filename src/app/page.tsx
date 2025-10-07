'use client';

import { useFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import React from 'react';
import { Loader2 } from 'lucide-react';

export default function Home() {
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();

  React.useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
}
