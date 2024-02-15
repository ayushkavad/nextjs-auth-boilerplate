import { useRouter } from 'next/router';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import paths from './paths';
import Home from '@/pages';
import Login from '@/pages/login';
import Register from '@/pages/register';

function Router() {
  const router = useRouter();
  const { LOGIN_PATH, REGISTER_PATH, ROOT_PATH } = paths;

  return (
    <>
      {router.pathname === ROOT_PATH && (
        <PrivateRoute redirectTo={LOGIN_PATH}>
          <Home />
        </PrivateRoute>
      )}

      {router.pathname === LOGIN_PATH && (
        <PublicRoute>
          <Login />
        </PublicRoute>
      )}

      {router.pathname === REGISTER_PATH && <Register />}

      {/* {router.isFallback && <h1>Loading...</h1>}
      {!router.isFallback && router.pathname !== ROOT_PATH && (
        <h1>404 - Page Not Found</h1>
      )} */}
    </>
  );
}

export default Router;
