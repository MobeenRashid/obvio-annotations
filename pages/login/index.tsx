import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="flex min-h-screen bg-white">
      <section className="flex flex-col justify-center w-full md:w-1/2 px-8 lg:px-16">
        <div className="max-w-md w-full mx-auto">
          <header className="mb-10 space-y-1">
            <Image
              src={
                'https://cdn.prod.website-files.com/68111b35f1cd5612fbfd95fe/68111b44369a366e3e3a2a11_Logo_Obvio%20(1).svg'
              }
              width={111}
              height={34}
              alt="Obvio"
              className="h-12 w-32 object-contain"
            />
            <p className="text-sm text-gray-600">
              Sign in to continue to your dashboard
            </p>
          </header>

          <form className="space-y-6">
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              required
            />
            <Input
              id="password"
              type="password"
              label="Password"
              placeholder="••••••••"
              required
            />

            <Button type="submit">Login</Button>
          </form>

          <footer className="mt-8 text-center text-sm text-gray-600">
            Don’t have an account?{' '}
            <Link
              href="/signup"
              className="text-accent hover:underline focus:outline-none focus:ring-2 focus:ring-accent"
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
    </main>
  );
}
