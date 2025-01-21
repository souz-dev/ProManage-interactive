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

interface Project {
  id: number;
  name: string;
  status: 'active' | 'delayed' | 'completed';
  progress: number;
  startDate: string;
  endDate: string;
  responsible: string;
}

interface ProjectTableProps {
  projects: Project[];
  onEdit: (id: number) => void;
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
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.name}</TableCell>
            <TableCell>
              <span className={`font-semibold ${statusColors[project.status]}`}>
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{project.progress}%</TableCell>
            <TableCell>{project.startDate}</TableCell>
            <TableCell>{project.endDate}</TableCell>
            <TableCell>{project.responsible}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEdit(project.id)}>
                <Edit className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
