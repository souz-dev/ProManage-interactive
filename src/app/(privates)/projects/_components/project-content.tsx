/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { ProjectCard } from './project-card';
import { ProjectTable } from './project-table';
import { CreateProjectModal } from './create-project-modal';
import { PackageOpen } from 'lucide-react';

interface IProjectContentProps {
  projects: any[];
  currentUserId: string;
  currentUserName: string;
}

export function ProjectContent({ projects, currentUserId, currentUserName }: IProjectContentProps) {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const handleEdit = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <div className="flex items-center space-x-4">
          {projects.length > 0 && (
            <div className="flex items-center space-x-2">
              <Switch
                id="view-mode"
                checked={viewMode === 'table'}
                onCheckedChange={(checked: boolean) => setViewMode(checked ? 'table' : 'card')}
              />
              <Label htmlFor="view-mode">Table View</Label>
            </div>
          )}
          <Button onClick={() => setIsModalOpen(true)}>Create New Project</Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="mt-56 flex flex-col items-center justify-center">
          <PackageOpen size={140} strokeWidth={1} className="text-gray-600" />
          <p className="mt-8 text-xl text-gray-500">Nenhum projeto encontrado</p>
          <p className="mt-2 max-w-[400px] text-center text-xl text-gray-500">
            Clique em <strong>criar novo projeto</strong> para começar a adicionar projetos à sua
            lista
          </p>
        </div>
      ) : (
        <>
          {viewMode === 'card' ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onEdit={() => handleEdit(project)}
                />
              ))}
            </div>
          ) : (
            <ProjectTable projects={projects} onEdit={(project) => handleEdit(project)} />
          )}
        </>
      )}

      <CreateProjectModal
        currentUserId={currentUserId}
        currentUserName={currentUserName}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        currentProject={selectedProject}
      />
    </div>
  );
}
