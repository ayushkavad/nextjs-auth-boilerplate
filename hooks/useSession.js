import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';

function useSession() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSession must be use within AuthProvider');
  }
  return context;
}

export default useSession;
