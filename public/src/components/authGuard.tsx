"use client"

import { decode } from 'jsonwebtoken';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AuthGuard: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      return;
    }

    try {
      const decodedToken = decode(token) as any;
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        localStorage.removeItem('token');
        router.push('/login');
        return;
      }

      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      router.push('/login');
    }
  }, [router]);

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return null;
};

export default AuthGuard;
