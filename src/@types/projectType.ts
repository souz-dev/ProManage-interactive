import { Task } from '@prisma/client';

export interface IProject {
  id: string;
  name: string;
  progress: number;
  startDate: string;
  endDate: string;
  responsible: string;
  description: string;
  tasks: Task[];
}
