import { z } from 'zod';

export const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  responsible: z.string().min(1, 'Responsible person is required'),
});
