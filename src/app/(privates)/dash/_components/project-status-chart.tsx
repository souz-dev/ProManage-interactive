/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { calculateProjectStatusCounts } from '@/utils/projectStatusCounts';
import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface IProjectStatusChartProps {
  projects: any[];
}

const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

export function ProjectStatusChart({ projects }: IProjectStatusChartProps) {
  const projectStatusCounts = calculateProjectStatusCounts(projects);

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
