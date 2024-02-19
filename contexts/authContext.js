import { createContext } from 'react';

export const AuthContext = createContext({
  user: undefined,
  isAuthenticated: false,
  loadingUserData: false,
  signIn: async (_credentials) => {},
  signOut: () => {},
});
