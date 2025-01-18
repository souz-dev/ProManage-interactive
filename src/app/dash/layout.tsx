import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/app/providers/providers';
import { Header } from '@/app/dash/_components/header';
import { Toaster } from '@/components/ui/toaster';
import { Sidebar } from './_components/sidebar';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Management Dashboard',
  description: 'Interactive dashboard for managing projects',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-background">
            <Header />
            <div className="flex">
              <Sidebar />
              <main className="flex-1 p-8">{children}</main>
            </div>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
