import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ProjectStatusCardProps {
  title: string;
  count: number;
}

const ProjectStatusCard: React.FC<ProjectStatusCardProps> = ({ title, count }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{count}</p>
      </CardContent>
    </Card>
  );
};

export default ProjectStatusCard;
