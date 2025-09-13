/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const fullName = (form.fullName as HTMLInputElement).value.trim();
    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value.trim();
    const confirmPassword = (
      form.confirmPassword as HTMLInputElement
    ).value.trim();

    const newErrors: Record<string, string> = {};

    if (!fullName) newErrors.fullName = 'Full name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email))
      newErrors.email = 'Enter a valid email';
    if (!password) newErrors.password = 'Password is required';
    if (confirmPassword !== password)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log({ fullName, email, password, confirmPassword });
    }
  };

  return (
    <main className="flex min-h-screen bg-white">
      <section className="flex flex-col justify-center w-full md:w-1/2 px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <header className="mb-10 space-y-1">
            <Image
              src="https://cdn.prod.website-files.com/68111b35f1cd5612fbfd95fe/68111b44369a366e3e3a2a11_Logo_Obvio%20(1).svg"
              width={111}
              height={34}
              alt="Obvio"
              className="h-12 w-32 object-contain"
            />
            <p className="text-sm text-gray-600">
              Sign in to continue to your dashboard
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                id="fullName"
                type="text"
                label="Full name"
                placeholder="Enter full name"
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Input
                id="email"
                type="email"
                label="Email"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <Input
                id="password"
                type="password"
                label="Password"
                placeholder="Enter password"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <Input
                id="confirmPassword"
                type="password"
                label="Confirm Password"
                placeholder="Enter confirm password"
              />
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <Button type="submit">Sign up</Button>
          </form>

          <footer className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
            >
              Login
            </Link>
          </footer>
        </div>
      </section>

      <aside className="hidden md:block w-1/2 relative">
        <img
          src="https://cdn.prod.website-files.com/680f9f3e62e98505910f487f/682b2df2a6c1ad631a5f2b05_Obvio%20-%20Product%20Page%20-%20Solar%20Powered.svg"
          className="h-full object-cover"
          alt=""
        />
      </aside>
    </main>
  );
}
