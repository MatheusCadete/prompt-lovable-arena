
import { useState } from 'react';
import { User } from '../types';

export const useAuth = (users: User[]) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email);
    if (user && password === '123456') { // Simple auth for demo
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  return {
    currentUser,
    setCurrentUser,
    login,
    logout
  };
};
