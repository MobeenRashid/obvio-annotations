import Input from '@/components/ui/input';
import Button from '@/components/ui/button';
import Link from 'next/link';
import { useState } from 'react';
import { AuthError } from '@supabase/supabase-js';
import * as auth from '@/lib/auth';
import { useAuthContext } from '@/context/auth';
import { useRouter } from 'next/router';
import Alert from '@/components/ui/alert';
import Head from 'next/head';
import ObvioAnnotationsLogo from '@/icons/obvio-annotations-logo';

export default function LoginPage() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<AuthError | null>();

  const { setAuthContext } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const form = e.target as HTMLFormElement;

    const email = (form.email as HTMLInputElement).value.trim();
    const password = (form.password as HTMLInputElement).value.trim();

    const formErrors: Record<string, string> = {};

    if (!email) formErrors.email = 'Email is required';
    if (!password) formErrors.password = 'Password is required';

    setErrors(formErrors);

    if (Object.keys(formErrors).length === 0) {
      try {
        setIsLoading(true);
        const response = await auth.signIn(email, password);

        if (response.error) {
          setAuthError(response.error);
        } else {
          const user = response.data?.user || undefined;
          const token = response.data?.session?.access_token;
          setAuthContext(user, token);
          router.push('/');
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login - Obvio Annotations</title>
      </Head>
      <div className="flex min-h-screen bg-white">
        <section className="flex flex-col justify-center w-full md:w-1/2 px-8 lg:px-16">
          <div className="max-w-md w-full mx-auto space-y-6">
            <header className="mb-10 space-y-1">
              <ObvioAnnotationsLogo />
              <p className="text-sm text-gray-600">
                Sign in to continue to your dashboard
              </p>
            </header>
            {authError ? (
              <Alert variant="error">{authError.message}</Alert>
            ) : null}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Input
                  id="email"
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                ) : null}
              </div>
              <div>
                <Input
                  id="password"
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                />
                {errors.password ? (
                  <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                ) : null}
              </div>
              <Button type="submit" className="w-full">
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>

            <footer className="mt-8 text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link
                href="/signup"
                className="ext-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Sign up
              </Link>
            </footer>
          </div>
        </section>

        <aside className="hidden md:block w-1/2 relative">
          <video
            autoPlay
            loop
            id="9309c072-36f0-dde7-6cf9-3a00277177f9-video"
            style={{
              backgroundImage:
                'url(https://cdn.prod.website-files.com/680f9f3e62e98505910f487f%2F6840a2b68117758eda2f9ab1_Home_Page_Hero-poster-00001.jpg)',
            }}
            muted={true}
            playsInline
            data-wf-ignore="true"
            data-object-fit="cover"
            className="h-full object-cover"
          >
            <source
              src="https://cdn.prod.website-files.com/680f9f3e62e98505910f487f%2F6840a2b68117758eda2f9ab1_Home_Page_Hero-transcode.mp4"
              data-wf-ignore="true"
            />
            <source
              src="https://cdn.prod.website-files.com/680f9f3e62e98505910f487f%2F6840a2b68117758eda2f9ab1_Home_Page_Hero-transcode.webm"
              data-wf-ignore="true"
            />
          </video>
        </aside>
      </div>
    </>
  );
}
