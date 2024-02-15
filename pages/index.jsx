import Link from 'next/link';
import useRoutePaths from '@/hooks/useRoutePaths';
import useSession from '@/hooks/useSession';

function Home() {
  const { isAuthenticated, user, signOut } = useSession();
  const { LOGIN_PATH, REGISTER_PATH } = useRoutePaths();

  return (
    <div>
      <ul>
        <li>
          <Link href={LOGIN_PATH}>Login</Link>
        </li>
        <li>
          <Link href={REGISTER_PATH}>Register</Link>
        </li>
      </ul>

      {isAuthenticated && (
        <>
          <span style={{ marginRight: 4 }}>{user?.user?.email}</span>
          <button onClick={signOut}>Logout</button>
        </>
      )}
    </div>
  );
}

export default Home;
