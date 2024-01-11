import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return <SessionProvider session={session}>{children}</SessionProvider>;
}
