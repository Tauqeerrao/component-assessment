import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/login'); // Auto-redirect to login
  }, []);

  return null; // Shows nothing while redirecting
}