/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface IProjectStatusChartProps {
  projects: any[];
}

const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

export function ProjectStatusChart({ projects }: IProjectStatusChartProps) {
  const projectStatusCounts = projects?.reduce(
    (acc, project) => {
      const allTasksCompleted = project.tasks.every((task: any) => task.completed);
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

  const projectStatusData = [
    { name: 'Ativos', value: projectStatusCounts?.ativos },
    { name: 'Concluídos', value: projectStatusCounts?.concluidos },
    { name: 'Atrasados', value: projectStatusCounts?.atrasados },
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={projectStatusData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {projectStatusData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
