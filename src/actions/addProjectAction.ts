/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/lib/prisma.client';

export async function addProjectAction(params: any, currentUserId: string) {
  await db.project.create({
    data: {
      ...params,
      userId: currentUserId,
    },
  });
}
