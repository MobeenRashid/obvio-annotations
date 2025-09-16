import { useAuthContext } from '@/context/auth';
import { ObvioLogo } from '@/icons';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const PUBLIC_ROUTES = ['/login', '/signup'];

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { user, loading } = useAuthContext();

  const isPublicRoute = useMemo(
    () => PUBLIC_ROUTES.includes(router.pathname),
    [router.pathname]
  );
  const isProtectedRoute = !isPublicRoute;

  useEffect(() => {
    if (!loading && !user && isProtectedRoute) {
      router.push('/login');
    }
  }, [user, router, loading, isProtectedRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ObvioLogo className="animate-pulse" />
      </div>
    );
  }

  if (!user && isProtectedRoute) return null;

  return children;
};

export default AuthGuard;
