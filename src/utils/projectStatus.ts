interface Task {
  completed: boolean;
}

interface Project {
  tasks: Task[];
  endDate: string | Date;
}

export function getProjectStatus(project: Project): 'active' | 'delayed' | 'completed' {
  const allTasksCompleted = project.tasks.every((task) => task.completed);
  const isDelayed = new Date(project.endDate) < new Date();

  if (allTasksCompleted) {
    return 'completed';
  } else if (isDelayed) {
    return 'delayed';
  } else {
    return 'active';
  }
}
