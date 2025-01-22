import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function deleteProjectAction(projectId: string) {
  await db.task.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath('/projects');
}
