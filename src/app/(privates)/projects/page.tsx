'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ProjectCard } from './_components/project-card';
import { ProjectTable } from './_components/project-table';
import { Button } from '@/components/ui/button';
import { CreateProjectModal } from './_components/create-project-modal';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    status: 'active' as const,
    progress: 75,
    startDate: '2023-01-01',
    endDate: '2023-06-30',
    responsible: 'John Doe',
  },
  {
    id: 2,
    name: 'Mobile App Development',
    status: 'delayed' as const,
    progress: 40,
    startDate: '2023-02-15',
    endDate: '2023-08-31',
    responsible: 'Jane Smith',
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    status: 'completed' as const,
    progress: 100,
    startDate: '2023-03-01',
    endDate: '2023-05-31',
    responsible: 'Bob Johnson',
  },
];

export default function ProjectsPage() {
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
      <CreateProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
