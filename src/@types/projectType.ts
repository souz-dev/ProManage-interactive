import { Task } from '@prisma/client';

export interface IProject {
  id: string;
  name: string;
  progress?: number;
  startDate: Date | string;
  userId: string | null;
  description: string | null;
  endDate: Date | string;
  responsible: string;
  tasks: Task[];
}
