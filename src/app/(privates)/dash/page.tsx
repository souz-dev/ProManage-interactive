import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProjectProgress } from './_components/project-progress';
import { ProjectStatusChart } from './_components/project-status-chart';
import { TaskCompletionChart } from './_components/task-completion-chart';
import Link from 'next/link';
import ProjectStatusCard from './_components/projects-status-card';

const projectsData = {
  active: 5,
  completed: 3,
  delayed: 2,
};

export default async function Home() {
  const session = await auth();

  if (!session) {
    return redirect('/login');
  }

  return (
    <div className="w-full space-y-6">
      <h1 className="text-3xl font-bold">Bem-vindo ao Gerenciador de Projetos</h1>
      <div className="grid w-full gap-4 md:grid-cols-3">
        <ProjectStatusCard title="Projetos Ativos" count={projectsData.active} />
        <ProjectStatusCard title="Projetos Completos" count={projectsData.completed} />
        <ProjectStatusCard title="Projetos Atrasados" count={projectsData.delayed} />
      </div>
      <div className="grid w-full gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Progresso dos Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectProgress />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Status dos Projetos</CardTitle>
          </CardHeader>
          <CardContent>
            <ProjectStatusChart />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Conclusão de Tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <TaskCompletionChart />
        </CardContent>
      </Card>
      <div>
        <Link href="/projects" className="text-blue-500 hover:underline">
          Ver todos os projetos
        </Link>
      </div>
    </div>
  );
}
