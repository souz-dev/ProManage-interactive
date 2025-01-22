/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function updateTaskAction(completed: boolean, taskId: string) {
  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      completed: completed,
    },
  });

  revalidatePath('/projects');
}
