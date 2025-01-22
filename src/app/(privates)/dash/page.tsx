import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectProgress } from './_components/project-progress';
import { ProjectStatusChart } from './_components/project-status-chart';
import Link from 'next/link';
import ProjectStatusCard from './_components/projects-status-card';
import { db } from '@/lib/prisma.client';
import { getCurrentUserAction } from '@/actions/getCurrentUserAction';

export default async function Home() {
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

  const projectsStatus = projects.reduce(
    (acc, project) => {
      const tasks = project.tasks;
      const completedTasks = tasks.filter((task) => task.completed);
      const isCompleted = tasks.length === completedTasks.length;
      const isDelayed = new Date(project.endDate) < new Date();

      if (isCompleted) {
        acc.completed += 1;
      } else if (isDelayed) {
        acc.delayed += 1;
      } else {
        acc.active += 1;
      }

      return acc;
    },
    { completed: 0, delayed: 0, active: 0 },
  );

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao Gerenciador de Projetos</h1>
      <div className="grid w-full gap-4 md:grid-cols-3">
        <ProjectStatusCard title="Projetos Ativos" count={projectsStatus.active} />
        <ProjectStatusCard title="Projetos Completos" count={projectsStatus.completed} />
        <ProjectStatusCard title="Projetos Atrasados" count={projectsStatus.delayed} />
      </div>
      <div className="grid w-full gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progresso dos Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectProgress projects={projects} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status dos Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectStatusChart projects={projects} />
          </CardContent>
        </Card>
      </div>

      <div>
        <Link href="/projects" className="text-blue-500 hover:underline">
          Ver todos os projetos
        </Link>
      </div>
    </div>
  );
}
