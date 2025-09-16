import { useAuthContext } from '@/context/auth';
import * as auth from '@/lib/auth';
import { useRouter } from 'next/router';
import { PUBLIC_ROUTES } from '../auth-guard';
import Button from '../ui/button';
import { useState } from 'react';
import { ObvioLogo } from '@/icons';
import ObvioAnnotationsLogo from '@/icons/obvio-annotations-logo';

export default function Header() {
  const [waitingForSignout, setIsWaitingForSignout] = useState<boolean>(false);
  const { user } = useAuthContext();
  const router = useRouter();

  if (PUBLIC_ROUTES.includes(router.pathname)) {
    return null;
  }

  const handleLogout = async () => {
    if (!user) {
      return;
    }

    try {
      setIsWaitingForSignout(true);
      await auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header className="w-full bg-white text-gray-900 px-6 py-4 flex items-center justify-between border-b border-gray-200">
      <ObvioAnnotationsLogo onClick={() => router.push('/')} />

      {user && (
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600">
            {user.email ?? 'Anonymous'}
          </span>
          <Button onClick={handleLogout} variant="secondary">
            {waitingForSignout ? 'Signing out...' : 'Sign out'}
          </Button>
        </div>
      )}
    </header>
  );
}
