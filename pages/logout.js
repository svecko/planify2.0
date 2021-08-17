import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../lib/firebase';

export default function Logout() {
  const router = useRouter();
  auth.signOut();

  useEffect(() => {
    setTimeout(() => {
      router.push('/enter');
    }, 3000);
  }, []);

  return <h1>You have been Logged Out.</h1>;
}
