'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema } from '@/schemas/loginSchema';
import { z } from 'zod';
import { signIn } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { startTransition, useActionState } from 'react';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';
export type FormData = z.infer<typeof loginSchema>;

interface ILoginFormProps {
  loginAction: (formData: FormData) => Promise<void | { error: string }>;
}

export function LoginForm({ loginAction }: ILoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const [, dispatchAction, isPending] = useActionState(
    async (_previusDate: unknown, formData: FormData) => {
      const response = await loginAction(formData);

      if (response?.error) {
        toast.error(response.error);
      }
    },
    null,
  );

  const onSubmit = (data: FormData) => {
    startTransition(() => {
      dispatchAction(data);
    });
    reset();
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input id="password" {...register('password')} type="password" required />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending && <Loader2Icon className="mr-2 animate-spin" size={16} />}
              Login
            </Button>
            <Button
              onClick={() => signIn('google')}
              type="button"
              variant="outline"
              className="w-full"
              disabled={isPending}
            >
              Login with Google
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="/register" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
