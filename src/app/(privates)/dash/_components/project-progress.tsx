'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Projeto A', progresso: 75 },
  { name: 'Projeto B', progresso: 50 },
  { name: 'Projeto C', progresso: 90 },
  { name: 'Projeto D', progresso: 30 },
  { name: 'Projeto E', progresso: 60 },
];

export function ProjectProgress() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="progresso" fill="#3b82f6" label={{ position: 'top', fill: '#374151' }}>
          {data.map((entry, index) => (
            <text
              key={`label-${index}`}
              x={index * (300 / data.length) + 300 / data.length / 2}
              y={300 - entry.progresso * 3}
              fill="#374151"
              textAnchor="middle"
              dy={-10}
            >{`${entry.progresso}%`}</text>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
