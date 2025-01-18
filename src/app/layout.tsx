import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
export const metadata: Metadata = {
  title: 'Promanage Interactive',
  description: 'Gerencie seus projetos de forma eficiente',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessioon = await auth();
  return (
    <html lang="en">
      <body className={'antialiased'}>
        <SessionProvider session={sessioon}>{children}</SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
