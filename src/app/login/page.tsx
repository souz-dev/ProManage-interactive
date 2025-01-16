import { LoginForm } from '@/components/login-form';
import { signIn } from '@/lib/auth';
import { loginSchema } from '@/schemas/loginSchema';
import { AuthError, CredentialsSignin } from 'next-auth';
import { toast } from 'sonner';
import { z } from 'zod';

export type FormData = z.infer<typeof loginSchema>;

export default function Page() {
  async function loginAction(formData: FormData) {
    'use server';
    const { success, data, error } = loginSchema.safeParse(
      Object.fromEntries(Object.entries(formData)),
    );
    if (!success) {
      console.error(error);
      return;
    }

    console.log(data);
    const { email, password } = data;
    try {
      await signIn('credentials', {
        email,
        password,
        redirectTo: '/dash',
      });

      toast.success('Logged in successfully');
    } catch (error) {
      if (error instanceof CredentialsSignin) {
        return { error: 'Invalid credentials' };
      }

      if (error instanceof AuthError) {
        return { error: 'Something went wrong. Try again.' };
      }

      throw error;
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm loginAction={loginAction} />
      </div>
    </div>
  );
}
