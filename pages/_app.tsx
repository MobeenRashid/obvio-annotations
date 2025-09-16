import AuthGuard from '@/components/auth-guard';
import Header from '@/components/layout/header';
import { AuthProvider } from '@/context/auth';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <AuthGuard>
        <>
          <Header />
          <Component {...pageProps} />{' '}
        </>
      </AuthGuard>
    </AuthProvider>
  );
}
