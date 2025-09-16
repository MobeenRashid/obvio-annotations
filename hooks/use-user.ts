import { useAuthContext } from '@/context/auth';
import { User } from '@supabase/supabase-js';

const useUser = () => {
  const { loading, user, setAuth } = useAuthContext();

  const setUser = (user?: User) => {
    if (user) setAuth(user);
  };

  return {
    user,
    setUser,
    isAuthenticated: Boolean(user),
    isLoading: loading,
  };
};

export default useUser;
