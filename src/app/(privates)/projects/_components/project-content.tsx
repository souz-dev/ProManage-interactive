/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import { ProjectTable } from './project-table';
import { CreateProjectModal } from './create-project-modal';

interface IProjectContentProps {
  projects: any[];
  currentUserId: string;
}

export function ProjectContent({ projects, currentUserId }: IProjectContentProps) {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch
              id="view-mode"
              checked={viewMode === 'table'}
              onCheckedChange={(checked: boolean) => setViewMode(checked ? 'table' : 'card')}
            />
            <Label htmlFor="view-mode">Table View</Label>
          </div>
          <Button onClick={() => setIsModalOpen(true)}>Create New Project</Button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} onEdit={() => setIsModalOpen(true)} />
          ))}
        </div>
      ) : (
        <ProjectTable projects={projects} onEdit={() => setIsModalOpen(true)} />
      )}
      <CreateProjectModal
        currentUserId={currentUserId}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
