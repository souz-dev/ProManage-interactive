'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Home, FolderKanban, Settings } from 'lucide-react';

const routes = [
  {
    label: 'Overview',
    icon: Home,
    href: '/',
  },
  {
    label: 'Projects',
    icon: FolderKanban,
    href: '/projects',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-[calc(100vh-4rem)] w-64 flex-col space-y-4 border-r py-4">
      <div className="px-3 py-2">
        <div className="space-y-1">
          {routes.map((route) => (
            <Link key={route.href} href={route.href}>
              <Button
                variant={pathname === route.href ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <route.icon className="mr-2 h-4 w-4" />
                {route.label}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
