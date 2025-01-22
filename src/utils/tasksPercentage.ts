interface Task {
  completed: boolean;
}

interface Project {
  tasks: Task[];
}

export function calculateTasksPercentage(project: Project): number {
  if (project.tasks.length === 0) {
    return 0;
  }

  const completedTasks = project.tasks.filter((task) => task.completed).length;
  const totalTasks = project.tasks.length;

  return Math.round((completedTasks / totalTasks) * 100);
}
