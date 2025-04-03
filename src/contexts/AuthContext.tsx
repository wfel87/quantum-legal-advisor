
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuthStatus = () => {
      const storedUser = localStorage.getItem('docuscan_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setLoading(false);
    };
    
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    try {
      // In a real app, this would be an API call to verify credentials
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('docuscan_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const signup = async (email: string, password: string) => {
    // Simulate API call
    try {
      // In a real app, this would be an API call to create a new user
      const mockUser = {
        id: '1',
        email,
        name: email.split('@')[0]
      };
      
      // Store user in localStorage for persistence
      localStorage.setItem('docuscan_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('docuscan_user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
