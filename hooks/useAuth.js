import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be use within AuthProvider');
  }
  return context;
}

export default useAuth;
