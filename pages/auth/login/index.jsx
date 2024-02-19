import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { ROUTES } from '@/router/router';
import useAuth from '@/hooks/useAuth';

function initialFormValues() {
  return {
    email: '',
    password: '',
  };
}

function Login() {
  const [values, setValues] = useState(initialFormValues);
  const [loginRequestStatus, setLoginRequestStatus] = useState('success');
  const { isAuthenticated, signIn } = useAuth();
  const router = useRouter();

  function handleChange(event) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoginRequestStatus('loading');

    try {
      await signIn(values);
    } catch (error) {
      /**
       * an error handler can be added here
       */
    } finally {
      setLoginRequestStatus('success');
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      router.push(ROUTES.index());
    }

    return () => setLoginRequestStatus('success');
  }, [isAuthenticated, router]);

  return (
    <div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            style={{ border: '1px solid black' }}
            value={values.email}
            type="email"
            name="email"
            id="email"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            style={{ border: '1px solid black' }}
            value={values.password}
            type="password"
            name="password"
            id="password"
            disabled={loginRequestStatus === 'loading'}
            onChange={handleChange}
          />
        </div>

        <button type="submit" disabled={loginRequestStatus === 'loading'}>
          {loginRequestStatus === 'loading' ? 'Loading...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}

export default Login;
