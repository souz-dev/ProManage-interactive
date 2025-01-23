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
import { updateProjectAction } from '@/actions/updateProjectAction';
import { format } from 'date-fns';
import { formSchema } from '@/schemas/projectSchema';

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
    values: {
      name: currentProject ? currentProject.name : '',
      startDate: currentProject ? format(new Date(currentProject.startDate), 'yyyy-MM-dd') : '',
      endDate: currentProject ? format(new Date(currentProject.endDate), 'yyyy-MM-dd') : '',
      description: currentProject ? currentProject.description : '',
      responsible: currentProject ? currentProject.responsible : currentUserName,
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

  return (
    <Dialog open={isOpen} onOpenChange={handleOnClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Projeto</DialogTitle>
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
