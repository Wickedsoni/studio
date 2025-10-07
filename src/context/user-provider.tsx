
'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type User = {
  name: string;
  email: string;
  organization?: string;
};

interface UserContextType {
  user: User;
  setUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const defaultUser: User = {
  name: 'User Name',
  email: 'user@email.com',
  organization: 'Acme Inc.',
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<User>(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem('cognimeet-user');
        return item ? JSON.parse(item) : defaultUser;
      } catch (error) {
        console.warn('Error reading user from localStorage', error);
        return defaultUser;
      }
    }
    return defaultUser;
  });

  const setUser = (newUser: User) => {
    try {
      setUserState(newUser);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('cognimeet-user', JSON.stringify(newUser));
      }
    } catch (error) {
      console.warn('Error saving user to localStorage', error);
    }
  };

  useEffect(() => {
    // This effect can be used to handle changes from other tabs, but for now we'll just initialize.
    // The main logic is handled in the useState initializer and the setUser function.
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
