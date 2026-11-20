import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  ArrowRight, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login, demoUsers } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/account';

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your email address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter your password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  // Quick 1-click Demo Login
  const handleQuickDemoLogin = async (userType) => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      if (userType === 'customer') {
        setEmail('alex@pizzora.com');
        setPassword('pizza123');
        await login('alex@pizzora.com', 'pizza123');
      } else {
        setEmail('admin@pizzora.com');
        setPassword('admin123');
        await login('admin@pizzora.com', 'admin123');
      }
      navigate(userType === 'admin' ? '/admin' : from, { replace: true });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail || !forgotEmail.includes('@')) {
      alert('Please enter a valid recovery email address.');
      return;
    }
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotPasswordOpen(false);
      setForgotSuccess(false);
      setForgotEmail('');
    }, 2500);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex bg-warmWhite">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-full">
        
        {/* Left Column: Visual & Brand showcase */}
        <div className="hidden lg:flex lg:col-span-6 relative p-12 flex-col justify-between overflow-hidden rounded-r-3xl m-4 my-6 bg-charcoal text-white shadow-2xl">
          {/* Background image with dark warm overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1400&q=85"
              alt="Artisanal Pizza Oven"
              className="w-full h-full object-cover object-center opacity-45 scale-105 filter brightness-90 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
          </div>

          {/* Top Logo */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 to-amber-500 flex items-center justify-center text-2xl shadow-lg shadow-brand-500/30">
                🍕
              </div>
              <div>
                <span className="font-display font-black text-2xl tracking-tight text-white block">
                  PIZZORA
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-brand-400">
                  Taste the Happiness.
                </span>
              </div>
            </Link>
          </div>

          {/* Center Brand Quote */}
          <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              Member Exclusive Benefits
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
              Stone-baked mastery delivered warm to your table.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Sign in to track real-time kitchen status, access secret menu drops, save favorite custom toppings, and earn PIZZORA reward slices.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-gray-400">
            <span>Freshly baked every single order</span>
            <span className="font-semibold text-white">72h Sourdough Ferment</span>
          </div>
        </div>

        {/* Right Column: Clean Login Form */}
        <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            
            {/* Form Header */}
            <div>
              {/* Mobile logo only */}
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-xl text-white">
                  🍕
                </div>
                <span className="font-display font-extrabold text-xl text-charcoal">PIZZORA</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal tracking-tight">
                Welcome Back!
              </h1>
              <p className="text-sm text-charcoal-muted mt-2">
                Sign in to continue your delicious journey.
              </p>
            </div>

            {/* Demo Quick Logins Alert */}
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-800 flex items-center gap-1.5">
                  <UserCheck className="w-4 h-4 text-brand-600" />
                  Quick 1-Click Demo Logins:
                </span>
                <span className="text-[10px] bg-brand-200/60 text-brand-800 px-2 py-0.5 rounded-full font-bold">
                  Instant Test
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('customer')}
                  className="px-3 py-2 bg-white hover:bg-orange-100/60 border border-orange-200 rounded-xl text-xs font-bold text-charcoal transition-all text-left shadow-sm"
                >
                  <span className="block text-brand-600 font-extrabold">Alex (Customer)</span>
                  <span className="text-[10px] text-gray-500">alex@pizzora.com</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('admin')}
                  className="px-3 py-2 bg-white hover:bg-orange-100/60 border border-orange-200 rounded-xl text-xs font-bold text-charcoal transition-all text-left shadow-sm"
                >
                  <span className="block text-brand-600 font-extrabold">Chef Admin</span>
                  <span className="text-[10px] text-gray-500">admin@pizzora.com</span>
                </button>
              </div>
            </div>

            {/* Error Message banner */}
            {errorMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-semibold flex items-center gap-2.5"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMessage}</span>
              </motion.div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email field */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="w-full pl-12 pr-4 py-3.5 bg-white rounded-2xl border border-orange-100/90 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password field with toggle */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-charcoal uppercase tracking-wider">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="w-full pl-12 pr-12 py-3.5 bg-white rounded-2xl border border-orange-100/90 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-brand-500 focus:ring-brand-400 border-gray-300 rounded cursor-pointer accent-brand-500"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs font-semibold text-charcoal-muted cursor-pointer">
                  Remember me for 30 days
                </label>
              </div>

              {/* Orange Sign In Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom link to register */}
            <div className="text-center pt-2">
              <p className="text-xs text-charcoal-muted">
                Don't have an account?{' '}
                <Link to="/register" className="font-extrabold text-brand-600 hover:text-brand-700 underline underline-offset-2">
                  Create one now
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-100 space-y-4"
            >
              <h3 className="font-display font-bold text-xl text-charcoal">
                Reset Your Password
              </h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Enter your registered email address and we'll send you an instant reset link to choose a new password.
              </p>

              {forgotSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Password reset email dispatched! Please check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-charcoal mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="alex@pizzora.com"
                      className="w-full px-4 py-3 rounded-xl border border-orange-100 text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-charcoal-muted hover:text-charcoal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-brand-500 text-white rounded-xl text-xs font-bold shadow hover:bg-brand-600"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

