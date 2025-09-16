import { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import { Noop } from '@/lib/utils';

interface AuthContextType {
  accessToken?: string;
  user?: User;
  setAuthContext: (user?: User, accessToken?: string) => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  loading: true,
  setAuthContext: Noop,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [accessToken, setAccessToken] = useState<string>();
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setAccessToken(session?.access_token);
      setUser(session?.user);
      setLoading(false);
    };

    initAuth();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAccessToken(session?.access_token);
        setUser(session?.user);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const setAuthContext = (user?: User, accessToken?: string) => {
    if (user) setUser(user);
    if (accessToken) setAccessToken(accessToken);
  };

  return (
    <AuthContext.Provider
      value={{ user, accessToken, loading, setAuthContext }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
