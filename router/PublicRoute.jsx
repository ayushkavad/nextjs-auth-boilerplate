import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import useSession from '@/hooks/useSession';
import ErrorState from '@/components/ErrorState';
import Loader from '@/components/Loader';

function PublicRoute(props) {
  const { children } = props;

  const { isAuthenticated } = useSession();

  if (isAuthenticated) {
    window.location.href = '/';
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

export default PublicRoute;
