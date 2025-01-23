'use server';

import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function deleteProjectAction(projectId: string) {
  console.log('projectId', projectId);
  await db.project.delete({
    where: {
      id: projectId,
    },
  });

  revalidatePath('/projects');
}
