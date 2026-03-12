import { redirect } from 'next/navigation';

export default function Home() {
  // In a real app, we would check for a session here
  redirect('/login');
}
