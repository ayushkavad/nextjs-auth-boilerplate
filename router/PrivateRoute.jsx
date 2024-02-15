import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useSession from '@/hooks/useSession';
import ErrorState from '@/components/ErrorState';
import Loader from '@/components/Loader';

function PrivetRoute(props) {
  const { redirectTo = '/login', children } = props;

  const { isAuthenticated, loadingUserData } = useSession();

  if (loadingUserData) {
    return null;
  }

  if (!isAuthenticated) {
    window.location.href = redirectTo;
    return null;
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default PrivetRoute;
