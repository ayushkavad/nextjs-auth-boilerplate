import AuthProvider from '@/providers/authProvider';
import '@/styles/globals.css';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
