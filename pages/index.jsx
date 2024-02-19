import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/router/router';
import useAuth from '@/hooks/useAuth';

function Home() {
  const { user, signOut, isAuthenticated, loadingUserData } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loadingUserData && !isAuthenticated) {
      router.replace(ROUTES.login.index());
    }
  }, [isAuthenticated, loadingUserData, router]);

  if (loadingUserData) {
    return <p className="bg-blue-500 p-4">Loading...</p>;
  }

  if (!isAuthenticated) return null;

  return (
    <div className="bg-red-500 p-8 text-white">
      <h1 className="text-4xl mb-4">Hello, {user?.email}</h1>
      <p className="text-lg mb-4">Welcome to your personalized home page.</p>
      <button
        className="bg-white text-red-500 py-2 px-4 rounded"
        onClick={signOut}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
