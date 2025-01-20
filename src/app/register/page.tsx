import { RegisterForm } from '@/components/register-form';
import { db } from '@/lib/prisma.client';
import { hash } from 'bcryptjs';
import { registerUserSchema } from '@/schemas/registerUserSchema';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';

export interface FormData {
  name: string;
  email: string;
  password: string;
}

export default function Page() {
  async function registerAction(formData: FormData) {
    'use server';

    const { success, data, error } = registerUserSchema.safeParse(
      Object.fromEntries(Object.entries(formData)),
    );

    if (!success) {
      return { success: false, error };
    }
    const { name, email, password } = data;
    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true };
  }

  async function handleRegister(formData: FormData) {
    'use server';

    const result = await registerAction(formData);
    if (result.success) {
      return redirect('/login');
    } else {
      toast.error(result.error?.message || 'An unknown error occurred');
    }
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <RegisterForm registerAction={handleRegister} />
      </div>
    </div>
  );
}
