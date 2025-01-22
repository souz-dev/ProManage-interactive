'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { registerUserSchema } from '@/schemas/registerUserSchema';
import { signIn } from 'next-auth/react';

export type FormData = z.infer<typeof registerUserSchema>;

interface IRegisterFormProps {
  registerAction: (formData: FormData) => void;
}

export function RegisterForm({ registerAction }: IRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit = (data: FormData) => {
    registerAction(data);
    reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>Create your account to access the platform.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" {...register('name')} type="text" placeholder="Your name" required />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                {...register('email')}
                type="email"
                placeholder="m@example.com"
                required
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                {...register('password')}
                type="password"
                placeholder="********"
                required
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full">
              Create account
            </Button>
            <Button
              onClick={() => signIn('google')}
              type="button"
              variant="outline"
              className="w-full"
            >
              Login with Google
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
