'use client';

import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Comment, Project, Task } from '@prisma/client';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { addTaskAction } from '@/actions/addTaskAction';
import { toast } from 'sonner';
import { updateTaskAction } from '@/actions/updateTaskAction';
import { auth } from '@/lib/auth';
import { addCommentAction } from '@/actions/addCommentAction';
import { calculateTasksPercentage } from '@/utils/tasksPercentage';
import { getProjectStatus } from '@/utils/projectStatus';
import { formatDate } from '@/utils/formatDate';

interface IContentProps {
  projectData: Project & {
    comments: Comment[];
    tasks: Task[];
  };
}

export function Content({ projectData }: IContentProps) {
  const [newComment, setNewComment] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleTaskToggle = async (taskId: string, completed: boolean) => {
    console.log(`Toggling task ${taskId} to ${completed}`);
    try {
      await updateTaskAction(completed, taskId);
      console.log(`Task ${taskId} updated successfully`);
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };

  const handleAddComment = async (event: React.FormEvent) => {
    event.preventDefault();
    const newCommentData = {
      text: newComment,
      author: auth.name,
      date: new Date(),
    };

    try {
      await addCommentAction(newCommentData, projectData.id);
      toast.success('Comment added successfully');
      setNewComment('');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the comment');
    }
  };

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();
    const newTaskData = {
      title: newTask,
      completed: false,
    };
    try {
      await addTaskAction(newTaskData, projectData.id);
      toast.success('Task added successfully');
      setNewTask('');
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while adding the task');
    }
  };

  const tasksPercentage = calculateTasksPercentage(projectData);
  const projectStatus = getProjectStatus(projectData);

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
              <strong>Status:</strong> {projectStatus}
            </p>
            <p>
              <strong>Responsible:</strong> {projectData.responsible}
            </p>
            <p>
              <strong>Start Date:</strong> {formatDate(projectData.startDate)}
            </p>
            <p>
              <strong>End Date:</strong> {formatDate(projectData.endDate)}
            </p>
            <p>
              <strong>Description:</strong> {projectData.description}
            </p>
            <div className="mt-4">
              <p>
                <strong>Progress:</strong> {tasksPercentage}%
              </p>
              <Progress value={tasksPercentage} className="mt-2 w-full" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-32 flex-grow flex-col">
            <ul className="flex-grow space-y-2">
              {projectData.tasks.map((task) => (
                <li key={task.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`task-${task.id}`}
                    checked={task.completed}
                    onCheckedChange={() => handleTaskToggle(task.id, !task.completed)}
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
          <CardFooter>
            <div className="flex w-full space-x-2">
              <Input
                placeholder="Add a task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="flex-grow"
              />
              <Button onClick={(event) => handleAddTask(event)}>Add</Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Comments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-4">
            {projectData?.comments?.map((comment) => (
              <div key={comment.id} className="rounded-lg bg-gray-100 p-3">
                <p className="font-semibold">{comment.author}</p>
                <p>{comment.text}</p>
                <p className="mt-1 text-sm text-gray-500">
                  {format(new Date(comment.date), 'dd/MM/yyyy')}
                </p>
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
