'use client';

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Jan', completed: 30 },
  { name: 'Fev', completed: 45 },
  { name: 'Mar', completed: 60 },
  { name: 'Abr', completed: 75 },
  { name: 'Mai', completed: 90 },
  { name: 'Jun', completed: 100 },
];

export function TaskCompletionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="completed" stroke="#3b82f6" />
      </LineChart>
    </ResponsiveContainer>
  );
}
