import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { api } from '@/services/api';
import { ROUTES } from '@/router/router';
import { AuthContext } from '@/contexts/authContext';
import { setAuthorizationHeader } from '@/services/interceptors';
import {
  createSessionCookies,
  getToken,
  removeSessionCookies,
} from '@/utils/tokenCookies';

function AuthProvider(props) {
  const { children } = props;

  const [user, setUser] = useState();
  const [loadingUserData, setLoadingUserData] = useState(true);
  const router = useRouter();

  const token = getToken();
  const isAuthenticated = Boolean(token);

  async function signIn(params) {
    const { email, password } = params;

    try {
      const response = await api.post('/login', { email, password });
      const { token, refreshToken, user } = response.data.data;

      createSessionCookies({ token, refreshToken });
      setUser({ email: user.email });
      setAuthorizationHeader({ request: api.defaults, token });
    } catch (error) {
      const err = error;
      return err;
    }
  }

  function signOut() {
    removeSessionCookies();
    setUser(undefined);
    setLoadingUserData(false);
    router.push(ROUTES.login.index());
  }

  useEffect(() => {
    if (!token) {
      removeSessionCookies();
      setUser(undefined);
      setLoadingUserData(false);
    }
  }, [token]);

  useEffect(() => {
    const token = getToken();

    async function getUserData() {
      setLoadingUserData(true);

      try {
        const response = await api.get('/me');

        if (response?.data?.data) {
          const { user } = response.data.data;
          setUser({ email: user.email });
        }
      } catch (error) {
        /**
         * an error handler can be added here
         */
      } finally {
        setLoadingUserData(false);
      }
    }

    if (token) {
      setAuthorizationHeader({ request: api.defaults, token });
      getUserData();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loadingUserData,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
