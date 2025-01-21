import { getCurrentUserAction } from '@/actions/getCurrentUserAction';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProjectContent } from './_components/project-content';
import { db } from '@/lib/prisma.client';

export default async function ProjectsPage() {
  const session = await auth();
  if (!session) {
    return redirect('/login');
  }

  const currentUser = await getCurrentUserAction(session?.user?.email as string);
  if (!currentUser) {
    return redirect('/login');
  }

  const projects = await db.project.findMany({
    where: { userId: currentUser.id },
    include: {
      tasks: true,
    },
  });

  console.log(projects);

  return <ProjectContent projects={projects} currentUserId={currentUser.id} />;
}
