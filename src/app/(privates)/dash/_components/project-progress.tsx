/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface ProjectProgressProps {
  projects: any[];
}

export function ProjectProgress({ projects }: ProjectProgressProps) {
  const projectProgress = projects.map((project) => {
    const tasksPercentage: number =
      project.tasks.length === 0
        ? 0
        : Math.round(
            (project.tasks.filter((task: { completed: boolean }) => task.completed).length /
              project.tasks.length) *
              100,
          );

    return {
      name: project.name,
      percentage: tasksPercentage,
    };
  });
  console.log(projectProgress);
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart key={Math.random()} data={projectProgress}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="percentage" fill="#3b82f6" label={{ position: 'top', fill: '#374151' }}>
          {projectProgress?.map((entry, index) => (
            <text
              key={`label-${index}`}
              x={index * (300 / projectProgress.length) + 300 / projectProgress.length / 2}
              y={300 - entry.percentage * 3}
              fill="#374151"
              textAnchor="middle"
              dy={-10}
            >{`${entry.percentage}%`}</text>
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
