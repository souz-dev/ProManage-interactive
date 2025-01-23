import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Delete, Edit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { calculateTasksPercentage } from '@/utils/tasksPercentage';
import { formatDate } from '@/utils/formatDate';
import { getProjectStatus } from '@/utils/projectStatus';
import { deleteProjectAction } from '@/actions/deleteProjectAction';
import { toast } from 'sonner';
import { IProject } from '@/@types/projectType';

interface ProjectCardProps {
  project: IProject;
  onEdit: (id: number) => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const statusColors = {
    active: 'text-green-600',
    delayed: 'text-yellow-600',
    completed: 'text-blue-600',
  };

  const tasksPercentage = calculateTasksPercentage(project);
  const projectStatus = getProjectStatus(project);

  const handleDelete = async (id: string) => {
    console.log(`Deleting project ${id}`);
    try {
      await deleteProjectAction(id);
      toast.success('Project deleted successfully');
    } catch (error) {
      toast.error('Failed to delete project. Please try again.');
      console.error(error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.name}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(Number(project.id))}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => handleDelete(String(project.id))}>
              <Delete className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-2 flex items-center justify-between">
          <span className={`font-semibold ${statusColors[projectStatus]}`}>
            {projectStatus.charAt(0).toUpperCase() + projectStatus.slice(1)}
          </span>
          <span>{tasksPercentage}%</span>
        </div>
        <Progress value={project.progress} className="mb-4" />
        <div className="mb-2 text-sm text-gray-600">
          <p>Start: {formatDate(project.startDate)}</p>
          <p>End: {formatDate(project.endDate)}</p>
          <p>Responsible: {project.responsible}</p>
        </div>
        <Link href={`/projects/${project.id}`}>
          <Button variant="outline" className="w-full">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
