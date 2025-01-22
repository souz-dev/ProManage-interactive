'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { addProjectAction } from '@/actions/addProjectAction';
import { toast } from 'sonner';
import { useEffect } from 'react';
import { updateProjectAction } from '@/actions/updateProjectAction';
import { format } from 'date-fns';

const formSchema = z.object({
  name: z.string().min(1, 'Project name is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  description: z.string().min(1, 'Description is required'),
  responsible: z.string().min(1, 'Responsible person is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface CurrentProject extends FormValues {
  id: string;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUserId: string;
  currentUserName: string;
  currentProject?: CurrentProject;
}

export function CreateProjectModal({
  isOpen,
  onClose,
  currentUserId,
  currentProject,
  currentUserName,
}: CreateProjectModalProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      startDate: '',
      endDate: '',
      description: '',
      responsible: '',
    },
  });
  const handleOnClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (data: FormValues) => {
    const formatedData = {
      ...data,
      startDate: new Date(data.startDate),
      endDate: new Date(data.endDate),
    };
    if (currentProject) {
      try {
        await updateProjectAction(formatedData, currentProject.id);
        toast.success('Project updated successfully');
        handleOnClose();
      } catch (error) {
        toast.error('Failed to update project. Please try again.');

        console.error(error);
      }

      return;
    }

    try {
      await addProjectAction(formatedData, currentUserId);
      toast.success('Project created successfully');
      handleOnClose();
    } catch (error) {
      toast.error('Failed to add project. Please try again.');

      console.error(error);
    }
  };

  useEffect(() => {
    if (currentProject) {
      form.setValue('name', currentProject.name);
      form.setValue('startDate', format(new Date(currentProject.startDate), 'yyyy-MM-dd'));
      form.setValue('endDate', format(new Date(currentProject.endDate), 'yyyy-MM-dd'));
      form.setValue('description', currentProject.description);
      form.setValue('responsible', currentProject.responsible);
    }
  }, [currentProject, form]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>End Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="responsible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Responsible</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select responsible person" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={currentUserName}>{currentUserName}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {!currentProject ? 'Create Project' : 'Update Project'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
