import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

const DEMO_USERS = [
  {
    id: 'usr-1',
    name: 'Alex Johnson',
    email: 'alex@pizzora.com',
    role: 'customer',
    phone: '+1 (555) 234-5678',
    address: '742 Evergreen Terrace, Springfield, IL',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
    favorites: ['truffle-burrata-bliss', 'fiery-diavola-pepperoni']
  },
  {
    id: 'usr-admin',
    name: 'Pizzora Master Chef & Admin',
    email: 'admin@pizzora.com',
    role: 'admin',
    phone: '+1 (555) 888-9999',
    address: 'PIZZORA Flagship Kitchen, 100 Artisan Way, New York, NY',
    avatar: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=200&q=80',
    favorites: []
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('pizzora_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('pizzora_registered_users');
      return saved ? JSON.parse(saved) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('pizzora_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('pizzora_current_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('pizzora_registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Listen to Supabase auth state change if available
  useEffect(() => {
    try {
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        if (session?.user && !user) {
          const supaUser = {
            id: session.user.id,
            name: session.user.user_metadata?.full_name || session.user.email.split('@')[0],
            email: session.user.email,
            role: session.user.user_metadata?.role || 'customer',
            phone: session.user.phone || '+998 (90) 123-45-67',
            address: '',
            avatar: session.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(session.user.email)}`,
            favorites: []
          };
          setUser(supaUser);
        }
      });

      return () => {
        subscription?.unsubscribe();
      };
    } catch (err) {
      console.warn('Supabase auth state listener notice:', err);
    }
  }, []);

  // Login handler
  const login = async (email, password) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase Auth
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password
      });

      if (!error && data?.user) {
        const authenticatedSession = {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || cleanEmail.split('@')[0],
          email: data.user.email,
          role: data.user.user_metadata?.role || (cleanEmail === 'admin@pizzora.com' ? 'admin' : 'customer'),
          phone: data.user.phone || '+998 (90) 123-45-67',
          address: '',
          token: data.session?.access_token || `pizzora_tok_${Date.now()}`,
          avatar: data.user.user_metadata?.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(cleanEmail)}`,
          favorites: []
        };
        setUser(authenticatedSession);
        return authenticatedSession;
      }
    } catch (supaErr) {
      console.warn('Supabase auth attempt:', supaErr);
    }

    // 2. Demo or local registered fallback
    await new Promise((resolve) => setTimeout(resolve, 300));
    
    let found = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      if (cleanEmail === 'alex@pizzora.com') {
        found = DEMO_USERS[0];
      } else if (cleanEmail === 'admin@pizzora.com') {
        found = DEMO_USERS[1];
      }
    }

    if (!found) {
      throw new Error('No account found with this email. Please check or register.');
    }

    const authenticatedSession = {
      ...found,
      token: `pizzora_tok_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      lastLogin: new Date().toISOString()
    };

    setUser(authenticatedSession);
    return authenticatedSession;
  };

  // Register handler
  const register = async ({ name, email, phone, password }) => {
    const cleanEmail = email.trim().toLowerCase();

    // 1. Try Supabase SignUp
    try {
      const { data, error } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            full_name: name.trim(),
            role: 'customer'
          }
        }
      });
      if (error) {
        console.warn('Supabase signup notice:', error.message);
      }
    } catch (supaErr) {
      console.warn('Supabase signup error:', supaErr);
    }

    // 2. Local register update
    const exists = registeredUsers.some((u) => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: cleanEmail,
      phone: phone ? phone.trim() : '+1 (555) 000-0000',
      role: 'customer',
      address: '',
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}&backgroundColor=f36f21&textColor=ffffff`,
      favorites: []
    };

    const updated = [...registeredUsers, newUser];
    setRegisteredUsers(updated);

    const authenticatedSession = {
      ...newUser,
      token: `pizzora_tok_${Date.now()}`,
      lastLogin: new Date().toISOString()
    };

    setUser(authenticatedSession);
    return authenticatedSession;
  };

  // Logout handler
  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (e) {
      console.warn('Supabase signout:', e);
    }
    setUser(null);
  };

  // Update profile
  const updateProfile = (updates) => {
    if (!user) return;
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);

    setRegisteredUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, ...updates } : u))
    );
  };

  // Toggle favorite pizza
  const toggleFavorite = (productId) => {
    if (!user) return false;
    const favorites = user.favorites || [];
    const isFav = favorites.includes(productId);
    const newFavs = isFav
      ? favorites.filter((id) => id !== productId)
      : [...favorites, productId];

    updateProfile({ favorites: newFavs });
    return !isFav;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isAdmin: user?.role === 'admin',
        login,
        register,
        logout,
        updateProfile,
        toggleFavorite,
        demoUsers: DEMO_USERS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
