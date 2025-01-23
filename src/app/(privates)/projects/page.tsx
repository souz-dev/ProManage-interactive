import { getCurrentUserAction } from '@/actions/getCurrentUserAction';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { ProjectContent } from './_components/project-content';
import { db } from '@/lib/prisma.client';
import { IProject } from '@/@types/projectType';

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

  const projectsWithProgress: IProject[] = projects.map((project) => {
    return {
      ...project,
    };
  });

  return (
    <ProjectContent
      projects={projectsWithProgress}
      currentUserId={currentUser.id}
      currentUserName={currentUser.name}
    />
  );
}
