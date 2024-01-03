import { getServerAuthSession } from '@/server/auth';
import HomePage from '@/components/pages/home-page';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerAuthSession();

  if (session?.user) {
    redirect('/dashboard');
  }
  return <HomePage />;
}
