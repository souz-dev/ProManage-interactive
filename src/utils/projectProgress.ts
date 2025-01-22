interface Task {
  completed: boolean;
}

interface Project {
  name: string;
  tasks: Task[];
}

export function calculateProjectProgress(project: Project): { name: string; percentage: number } {
  const tasksPercentage: number =
    project.tasks.length === 0
      ? 0
      : Math.round(
          (project.tasks.filter((task) => task.completed).length / project.tasks.length) * 100,
        );

  return {
    name: project.name,
    percentage: tasksPercentage,
  };
}
