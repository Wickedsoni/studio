'use client';

import * as React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  signInWithPopup,
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth';
import { doc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import { Chrome } from 'lucide-react';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function LoginPage() {
  const { auth, firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [confirmationResult, setConfirmationResult] =
    React.useState<ConfirmationResult | null>(null);
  const [loading, setLoading] = React.useState(false);
  
  // Ref for the reCAPTCHA container
  const recaptchaContainerRef = React.useRef<HTMLDivElement>(null);
  // Ref for the RecaptchaVerifier instance
  const recaptchaVerifierRef = React.useRef<RecaptchaVerifier | null>(null);

  React.useEffect(() => {
    // Initialize reCAPTCHA verifier only once
    if (auth && !recaptchaVerifierRef.current && recaptchaContainerRef.current) {
      recaptchaVerifierRef.current = new RecaptchaVerifier(
        auth,
        recaptchaContainerRef.current,
        {
          size: 'invisible',
        }
      );
    }
  }, [auth]);

  const handleGoogleSignIn = async () => {
    if (!auth || !firestore) return;
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(
        userRef,
        {
          name: user.displayName,
          email: user.email,
        },
        { merge: true }
      );

      toast({
        title: 'Signed in with Google',
        description: `Welcome, ${user.displayName}!`,
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('Google sign-in error:', error);
      toast({
        variant: 'destructive',
        title: 'Google Sign-in Failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSignIn = async () => {
    if (!auth || !phoneNumber || !recaptchaVerifierRef.current) return;
    setLoading(true);
    try {
      const result = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        recaptchaVerifierRef.current
      );
      setConfirmationResult(result);
      toast({
        title: 'OTP Sent',
        description: 'Please check your phone for the verification code.',
      });
    } catch (error: any) {
      console.error('Phone sign-in error:', error);
       // Reset reCAPTCHA on error
      if (recaptchaVerifierRef.current) {
        recaptchaVerifierRef.current.render().then((widgetId) => {
          if(auth && (window as any).grecaptcha) {
            // @ts-ignore
            (window as any).grecaptcha.reset(widgetId);
          }
        });
      }
      toast({
        variant: 'destructive',
        title: 'Phone Sign-in Failed',
        description: error.message || 'Could not send OTP. Please check the phone number and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOtpConfirm = async () => {
    if (!confirmationResult || !otp || !firestore) return;
    setLoading(true);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      const userRef = doc(firestore, 'users', user.uid);
      setDocumentNonBlocking(
        userRef,
        {
          phoneNumber: user.phoneNumber,
        },
        { merge: true }
      );

      toast({
        title: 'Signed In Successfully',
        description: 'Welcome!',
      });
      router.push('/dashboard');
    } catch (error: any) {
      console.error('OTP confirmation error:', error);
      toast({
        variant: 'destructive',
        title: 'OTP Confirmation Failed',
        description: 'The code you entered is incorrect.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Login</CardTitle>
        <CardDescription>
          Sign in using your Google account or phone number.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div id="recaptcha-container" ref={recaptchaContainerRef}></div>
        <Button
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <Chrome className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        {!confirmationResult ? (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 555-555-5555"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button onClick={handlePhoneSignIn} disabled={loading || !phoneNumber}>
              {loading ? 'Sending...' : 'Send OTP'}
            </Button>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                disabled={loading}
              />
            </div>
            <Button onClick={handleOtpConfirm} disabled={loading || !otp}>
              {loading ? 'Verifying...' : 'Confirm OTP'}
            </Button>
          </div>
        )}
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
