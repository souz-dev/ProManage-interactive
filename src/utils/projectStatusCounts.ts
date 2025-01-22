interface Task {
  completed: boolean;
}

interface Project {
  tasks: Task[];
  endDate: string | Date;
}

interface ProjectStatusCounts {
  ativos: number;
  concluidos: number;
  atrasados: number;
}

export function calculateProjectStatusCounts(projects: Project[]): ProjectStatusCounts {
  return projects.reduce(
    (acc, project) => {
      const allTasksCompleted = project.tasks.every((task) => task.completed);
      const isDelayed = new Date(project.endDate) < new Date();

      if (allTasksCompleted) {
        acc.concluidos += 1;
      } else if (isDelayed) {
        acc.atrasados += 1;
      } else {
        acc.ativos += 1;
      }

      return acc;
    },
    { ativos: 0, concluidos: 0, atrasados: 0 },
  );
}
