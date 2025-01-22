/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function updateProjectAction(params: any, projectId: string) {
  await db.project.update({
    where: {
      id: projectId,
    },
    data: {
      ...params,
    },
  });

  revalidatePath('/projects');
}
