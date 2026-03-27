import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  isAnonymous: boolean;
  avatar?: string;
  bio?: string;
  joinedDate: string;
  pronouns?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (name: string, email: string, password: string) => Promise<boolean>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => void;
  toggleAnonymousMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user storage - in production this would be a backend
const USERS_KEY = 'mindspace_users';
const CURRENT_USER_KEY = 'mindspace_current_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Save user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [user]);

  const signIn = async (email: string, password: string): Promise<boolean> => {
    // Get stored users
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    // Find user
    const foundUser = users.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const signUp = async (name: string, email: string, password: string): Promise<boolean> => {
    // Get stored users
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    
    // Check if email already exists
    if (users.find(u => u.email === email)) {
      return false;
    }
    
    // Create new user
    const newUser: User & { password: string } = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isAnonymous: false,
      joinedDate: new Date().toLocaleDateString(),
    };
    
    // Save to storage
    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    
    // Set as current user
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    
    return true;
  };

  const signOut = () => {
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Update in storage
    const usersJson = localStorage.getItem(USERS_KEY);
    const users: Array<User & { password: string }> = usersJson ? JSON.parse(usersJson) : [];
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    }
  };

  const toggleAnonymousMode = () => {
    if (!user) return;
    updateProfile({ isAnonymous: !user.isAnonymous });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        updateProfile,
        toggleAnonymousMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
