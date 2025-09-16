import supabase from '@/lib/supabase';

const signUp = async (fullName: string, email: string, password: string) => {
  return supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
};

const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

const signOut = async () => {
  return supabase.auth.signOut();
};

export { signUp, signIn, signOut };
