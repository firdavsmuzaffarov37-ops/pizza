import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  User, 
  Menu as MenuIcon, 
  X, 
  LogOut, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  ChevronDown,
  Flame,
  Heart,
  ChefHat,
  UtensilsCrossed
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { totalItemsCount, setIsDrawerOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Deals', path: '/menu?category=combos' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse" />
        <span>Hot Offer: Get <strong>20% OFF</strong> your first order with code <span className="bg-white/25 px-1.5 py-0.5 rounded font-mono font-bold">PIZZORA20</span> • Free delivery on orders $30+</span>
      </div>

      <header className="sticky top-0 z-40 bg-warmWhite/90 backdrop-blur-md border-b border-orange-100 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-amber-500 flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:scale-105 transition-transform duration-200">
                <span className="text-2xl select-none">🍕</span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-charcoal flex items-center gap-1">
                  PIZZORA
                  <span className="w-2 h-2 rounded-full bg-brand-500 inline-block animate-ping"></span>
                </span>
                <span className="text-[10px] uppercase tracking-widest font-semibold text-brand-600 -mt-1">
                  Taste the Happiness.
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 bg-orange-50/70 p-1.5 rounded-full border border-orange-100/80">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      isActive
                        ? 'bg-white text-brand-600 shadow-sm'
                        : 'text-charcoal-muted hover:text-charcoal hover:bg-white/50'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {isAdmin && (
                <NavLink
                  to="/admin"
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all ${
                      isActive
                        ? 'bg-brand-500 text-white'
                        : 'text-brand-700 bg-brand-100 hover:bg-brand-200'
                    }`
                  }
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Admin
                </NavLink>
              )}
            </nav>

            {/* Right Action Icons & Auth */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Cart Drawer Trigger Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsDrawerOpen(true)}
                className="relative p-2.5 rounded-full bg-white border border-orange-100 text-charcoal shadow-sm hover:border-brand-300 hover:text-brand-600 transition-colors"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 bg-brand-500 text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-brand-500/40"
                  >
                    {totalItemsCount}
                  </motion.span>
                )}
              </motion.button>

              {/* User authentication states */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white border border-orange-100 hover:border-brand-200 shadow-sm transition-all"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-8 h-8 rounded-full object-cover border border-brand-200"
                    />
                    <span className="text-sm font-semibold text-charcoal max-w-[100px] truncate hidden sm:inline">
                      {user.name.split(' ')[0]}
                    </span>
                    <ChevronDown className="w-4 h-4 text-charcoal-muted" />
                  </button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {userDropdownOpen && (
                      <>
                        <div
                          className="fixed inset-0 z-10"
                          onClick={() => setUserDropdownOpen(false)}
                        />
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 mt-2 w-60 bg-white rounded-2xl shadow-soft-lg border border-orange-100 py-2 z-20"
                        >
                          <div className="px-4 py-3 border-b border-gray-100">
                            <p className="text-xs text-charcoal-muted font-medium">Signed in as</p>
                            <p className="text-sm font-bold text-charcoal truncate">{user.name}</p>
                            <p className="text-xs text-brand-600 font-semibold uppercase">{user.role}</p>
                          </div>

                          <div className="py-1">
                            <Link
                              to="/account"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-orange-50 font-medium transition-colors"
                            >
                              <User className="w-4 h-4 text-brand-500" />
                              My Profile
                            </Link>
                            <Link
                              to="/orders"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-charcoal hover:bg-orange-50 font-medium transition-colors"
                            >
                              <Clock className="w-4 h-4 text-brand-500" />
                              Order History
                            </Link>
                            {isAdmin && (
                              <Link
                                to="/admin"
                                onClick={() => setUserDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-brand-700 bg-brand-50 hover:bg-brand-100 font-semibold transition-colors"
                              >
                                <ShieldCheck className="w-4 h-4 text-brand-600" />
                                Admin Dashboard
                              </Link>
                            )}
                            <Link
                              to="/chef-kiosk"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-orange-700 bg-orange-50 hover:bg-orange-100 font-semibold transition-colors"
                            >
                              <ChefHat className="w-4 h-4 text-orange-600" />
                              🍳 Povarlar Kiosgi
                            </Link>
                            <Link
                              to="/waiter"
                              onClick={() => setUserDropdownOpen(false)}
                              className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 font-semibold transition-colors"
                            >
                              <UtensilsCrossed className="w-4 h-4 text-blue-600" />
                              🧑‍💼 Ofisant Paneli
                            </Link>
                          </div>

                          <div className="border-t border-gray-100 pt-1">
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50 font-medium transition-colors"
                            >
                              <LogOut className="w-4 h-4" />
                              Sign Out
                            </button>
                          </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-bold text-charcoal hover:text-brand-600 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 rounded-full shadow-md shadow-brand-500/25 hover:shadow-brand-500/40 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl bg-orange-50 text-charcoal hover:text-brand-600"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-orange-100 px-4 pt-3 pb-6 space-y-3"
            >
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-brand-50 text-brand-600'
                          : 'text-charcoal hover:bg-orange-50/50'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                ))}

                {isAdmin && (
                  <NavLink
                    to="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="px-4 py-3 rounded-xl text-base font-bold text-brand-600 bg-brand-50 flex items-center gap-2"
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Admin Dashboard
                  </NavLink>
                )}
              </div>

              {!isAuthenticated && (
                <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-sm font-bold text-charcoal border border-orange-200 rounded-xl hover:bg-orange-50"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-sm font-bold text-white bg-brand-500 rounded-xl shadow-md shadow-brand-500/20"
                  >
                    Create Account
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}

