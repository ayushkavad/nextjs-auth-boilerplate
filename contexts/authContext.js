import { createContext } from 'react';

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  loadingUserData: false,
  signIn: async (_credentials) => {},
  signOut: () => {},
});
