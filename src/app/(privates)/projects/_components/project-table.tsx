import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { format } from 'date-fns';
import { Task } from '@prisma/client';

interface Project {
  id: number;
  name: string;
  status: 'active' | 'delayed' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  responsible: string;
  tasks: Task[];
}

interface ProjectTableProps {
  projects: Project[];
  onEdit: (project: Project) => void;
}

export function ProjectTable({ projects, onEdit }: ProjectTableProps) {
  const statusColors = {
    active: 'text-green-600',
    delayed: 'text-yellow-600',
    completed: 'text-blue-600',
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Progresso</TableHead>
          <TableHead>Data de Início</TableHead>
          <TableHead>Data de Fim</TableHead>
          <TableHead>Responsável</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects.map((project) => {
          const tasksPercentage =
            project.tasks.length === 0
              ? 0
              : Math.round(
                  (project.tasks.filter((task) => task.completed).length / project.tasks.length) *
                    100,
                );

          const allTasksCompleted = project.tasks.every((task) => task.completed);
          const isDelayed = new Date(project.endDate) < new Date();

          let projectStatus: 'active' | 'delayed' | 'completed' = 'active';
          if (allTasksCompleted) {
            projectStatus = 'completed';
          } else if (isDelayed) {
            projectStatus = 'delayed';
          }

          return (
            <TableRow key={project.id}>
              <TableCell>{project.name}</TableCell>
              <TableCell>
                <span className={`font-semibold ${statusColors[projectStatus]}`}>
                  {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1)}
                </span>
              </TableCell>
              <TableCell>{tasksPercentage}%</TableCell>
              <TableCell>{format(new Date(project.startDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{format(new Date(project.startDate), 'dd/MM/yyyy')}</TableCell>
              <TableCell>{project.responsible}</TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" onClick={() => onEdit(project)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
