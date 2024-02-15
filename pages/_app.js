import AuthProvider from '@/providers/authProvider';
import Router from '@/router/Router';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Router>
        <Component {...pageProps} />
      </Router>
    </AuthProvider>
  );
}

export default App;
