import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { format } from 'date-fns';
import { Task } from '@prisma/client';

interface ProjectCardProps {
  project: {
    id: string | number;
    name: string;
    progress: number;
    startDate: string;
    endDate: string;
    responsible: string;
    tasks: Task[];
  };
  onEdit: (id: number) => void;
}

export function ProjectCard({ project, onEdit }: ProjectCardProps) {
  const statusColors = {
    active: 'text-green-600',
    delayed: 'text-yellow-600',
    completed: 'text-blue-600',
  };

  const formattedStartDate = format(new Date(project.startDate), 'dd/MM/yyyy');
  const formattedEndDate = format(new Date(project.endDate), 'dd/MM/yyyy');

  const tasksPercentage =
    project.tasks.length === 0
      ? 0
      : Math.round(
          (project.tasks.filter((task) => task.completed).length / project.tasks.length) * 100,
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {project.name}
          <Button variant="ghost" size="icon" onClick={() => onEdit(Number(project.id))}>
            <Edit className="h-4 w-4" />
          </Button>
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
          <p>Start: {formattedStartDate}</p>
          <p>End: {formattedEndDate}</p>
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
