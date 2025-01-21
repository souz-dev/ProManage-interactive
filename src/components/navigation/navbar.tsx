'use client';

import { Button } from '@/components/ui/button';
import { LayoutDashboard } from 'lucide-react';
import { ModeToggle } from '@/components/mode-toggle';
import { signOutAction } from '@/actions/singOutAction';

export function Navbar() {
  return (
    <header className="border-b">
      <div className="flex h-16 items-center gap-4 px-4">
        <LayoutDashboard className="h-6 w-6" />
        <h1 className="text-xl font-bold">Project Management</h1>
        <div className="ml-auto flex items-center gap-4">
          <ModeToggle />
          <Button onClick={signOutAction}>Logout</Button>
        </div>
      </div>
    </header>
  );
}
