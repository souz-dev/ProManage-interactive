/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from '@/lib/prisma.client';
import { Content } from './_components/content';

export default async function ProjectDetailsPage({ params: { id } }: any) {
  const projectData = await db.project.findUnique({
    where: {
      id,
    },
    include: {
      tasks: true,
      comments: true,
    },
  });

  console.log(projectData);

  if (!projectData) {
    return <div>Project not found</div>;
  }

  return <Content projectData={projectData} />;
}
