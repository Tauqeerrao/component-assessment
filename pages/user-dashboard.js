import { useEffect } from 'react';
import { useRouter } from 'next/router';
import UserDashboard from '../src/components/UserDashboard';


export default function ProtectedDashboard() {
  const router = useRouter();

  useEffect(() => {
    // 1. Check authentication
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    
    // 2. Redirect if not logged in
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, []);

  // 3. Only show dashboard if authenticated
  return <UserDashboard />;
}