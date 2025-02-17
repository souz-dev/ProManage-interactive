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
import { calculateTasksPercentage } from '@/utils/tasksPercentage';
import { getProjectStatus } from '@/utils/projectStatus';
import { IProject } from '@/@types/projectType';

interface ProjectTableProps {
  projects: IProject[];
  onEdit: (project: IProject) => void;
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
          const tasksPercentage = calculateTasksPercentage(project);
          const projectStatus = getProjectStatus(project);

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
