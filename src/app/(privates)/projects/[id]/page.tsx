'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';

// Mock data for a single project
const projectData = {
  id: 1,
  name: 'Website Redesign',
  status: 'active',
  progress: 75,
  startDate: '2023-01-01',
  endDate: '2023-06-30',
  responsible: 'John Doe',
  description: 'Redesigning the company website to improve user experience and conversion rates.',
  tasks: [
    { id: 1, title: 'Design mockups', completed: true },
    { id: 2, title: 'Develop frontend', completed: false },
    { id: 3, title: 'Integrate backend', completed: false },
    { id: 4, title: 'User testing', completed: false },
  ],
  comments: [
    {
      id: 1,
      author: 'Jane Smith',
      text: 'Great progress on the design mockups!',
      date: '2023-03-15',
    },
    {
      id: 2,
      author: 'Bob Johnson',
      text: 'We need to speed up the frontend development.',
      date: '2023-04-02',
    },
  ],
};

export default function ProjectDetailsPage() {
  const { id } = useParams();
  const [tasks, setTasks] = useState(projectData.tasks);
  const [comments, setComments] = useState(projectData.comments);
  const [newComment, setNewComment] = useState('');
  console.log(id);
  const handleTaskToggle = (taskId: number) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)),
    );
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          id: comments.length + 1,
          author: 'Current User', // In a real app, this would be the logged-in user
          text: newComment,
          date: new Date().toISOString().split('T')[0],
        },
      ]);
      setNewComment('');
    }
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">{projectData.name}</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              <strong>Status:</strong> {projectData.status}
            </p>
            <p>
              <strong>Responsible:</strong> {projectData.responsible}
            </p>
            <p>
              <strong>Start Date:</strong> {projectData.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {projectData.endDate}
            </p>
            <p>
              <strong>Description:</strong> {projectData.description}
            </p>
            <div className="mt-4">
              <p>
                <strong>Progress:</strong> {projectData.progress}%
              </p>
              <Progress value={projectData.progress} className="mt-2 w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id)}
                  />
                  <label
                    htmlFor={`task-${task.id}`}
                    className={`flex-grow ${task.completed ? 'text-gray-500 line-through' : ''}`}
                  >
                    {task.title}
                  </label>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-gray-100 p-3">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.text}</p>
                <p className="mt-1 text-sm text-gray-500">{comment.date}</p>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <Textarea
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-grow"
            />
            <Button onClick={handleAddComment}>Add</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
