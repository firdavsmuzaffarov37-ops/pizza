import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Login handler
  const login = async (email, password) => {
    // Simulate network delay for realistic feel
    await new Promise((resolve) => setTimeout(resolve, 600));

    const cleanEmail = email.trim().toLowerCase();
    
    // Quick demo bypass or match registered
    let found = registeredUsers.find((u) => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      // Allow demo testing if entered default demo credentials
      if (cleanEmail === 'alex@pizzora.com') {
        found = DEMO_USERS[0];
      } else if (cleanEmail === 'admin@pizzora.com') {
        found = DEMO_USERS[1];
      }
    }

    if (!found) {
      throw new Error('No account found with this email. Please check or register.');
    }

    // Never store plain text passwords. Session stores sanitized user token
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
    await new Promise((resolve) => setTimeout(resolve, 650));

    const cleanEmail = email.trim().toLowerCase();
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
  const logout = () => {
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

