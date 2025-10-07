import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignupPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Sign Up</CardTitle>
        <CardDescription>
          To create an account, please return to the login page and use Google
          or Phone authentication. New users will be automatically registered.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center text-sm">
          <Link href="/login" className="underline">
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
