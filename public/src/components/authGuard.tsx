"use client"

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const AuthGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  if (localStorage.getItem('token')) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
