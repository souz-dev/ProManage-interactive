/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/prisma.client';
import { revalidatePath } from 'next/cache';

export async function addCommentAction(params: any, currentProjectId: string) {
  await db.comment.create({
    data: {
      ...params,
      projectId: currentProjectId,
    },
  });

  revalidatePath('/projects');
}
