import { db } from '@/lib/prisma.client';

export async function getCurrentUserAction(email: string) {
  const user = await db.user.findUnique({
    where: { email },
  });

  return user;
}
