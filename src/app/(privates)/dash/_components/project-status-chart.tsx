'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Ativos', value: 5 },
  { name: 'Concluídos', value: 3 },
  { name: 'Atrasados', value: 2 },
];

const COLORS = ['#3b82f6', '#10b981', '#ef4444'];

export function ProjectStatusChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
