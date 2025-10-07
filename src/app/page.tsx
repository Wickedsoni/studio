import { redirect } from 'next/navigation';

export default function Home() {
  // For now, we'll assume the user is logged in and redirect to the dashboard.
  // In a real app, you'd have logic here to check for an auth token
  // and redirect to /login if they are not authenticated.
  redirect('/dashboard');
}
