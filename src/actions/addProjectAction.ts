/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function addProjectAction(params: any, currentUserId: string) {
  await db.project.create({
    data: {
      ...params,
      userId: currentUserId,
    },
  });

  revalidatePath('/projects');
}
