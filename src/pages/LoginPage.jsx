import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // Status
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const from = location.state?.from?.pathname || '/menu';

  const validateForm = () => {
    if (!email.trim()) {
      setErrorMessage('Please enter your Email Address.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid Email Address.');
      return false;
    }
    if (!password) {
      setErrorMessage('Please enter your Password.');
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

  // 1-Click Demo Login handler
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
      navigate(userType === 'admin' ? '/admin' : '/menu', { replace: true });
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Google Sign-In Simulation
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      setEmail('alex@pizzora.com');
      setPassword('pizza123');
      await login('alex@pizzora.com', 'pizza123');
      navigate(from, { replace: true });
    } catch (err) {
      setErrorMessage('Google sign-in demo connected.');
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
    <div className="min-h-screen flex items-stretch bg-white">
      
      {/* ================= LEFT HALF: ORANGE BANNER WITH 3 TILTED POLAROID CARDS ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F36F21] relative overflow-hidden flex-col items-center justify-center p-12 text-white select-none">
        
        {/* Floating playful confetti / shapes inspired by the design */}
        <div className="absolute top-16 left-20 w-4 h-4 bg-yellow-300 rounded-sm rotate-45 opacity-90 animate-pulse" />
        <div className="absolute top-28 right-24 w-6 h-6 bg-blue-500 rounded-full opacity-80" />
        <div className="absolute top-44 left-1/4 text-2xl opacity-90">👍</div>
        <div className="absolute top-52 right-1/6 text-2xl opacity-90">👍</div>
        <div className="absolute bottom-40 left-16 text-3xl opacity-80">🎉</div>
        <div className="absolute bottom-36 right-20 w-5 h-5 bg-pink-400 rounded-md rotate-12 opacity-85" />
        <div className="absolute top-1/2 left-10 w-3 h-3 bg-white rounded-full opacity-70" />

        {/* Center: 3 Staked / Tilted Food Cards */}
        <div className="relative flex items-center justify-center w-full max-w-lg h-72 mb-8">
          
          {/* Card 1: Left tilted (-10 deg) */}
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: -15 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="absolute left-4 sm:left-8 w-44 sm:w-48 bg-white p-3 rounded-2xl shadow-xl border border-orange-200/40 text-charcoal -translate-y-2 z-0 hover:z-20 hover:scale-105 transition-all"
          >
            <div className="w-full h-28 rounded-xl overflow-hidden bg-orange-50 mb-2.5">
              <img
                src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=500&q=80"
                alt="Garden Pesto Pizza"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xs text-charcoal truncate">Garden Pesto</h4>
            <p className="text-[10px] text-gray-500">Italian Artisan</p>
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100 text-[10px] text-gray-600">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3 text-orange-500" /> 20 Mins
              </span>
              <span className="text-gray-400">•</span>
              <span className="font-bold text-charcoal">$15.99</span>
            </div>
          </motion.div>

          {/* Card 2: Center Highlighted (straight / raised, high z-index) */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative z-10 w-48 sm:w-52 bg-white p-3.5 rounded-2xl shadow-2xl border-2 border-white text-charcoal hover:scale-110 transition-transform"
          >
            <div className="w-full h-32 rounded-xl overflow-hidden bg-orange-50 mb-2.5 relative">
              <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=500&q=80"
                alt="Truffle Burrata Bliss"
                className="w-full h-full object-cover"
              />
              <span className="absolute top-1.5 left-1.5 bg-brand-500 text-white text-[9px] font-extrabold px-2 py-0.5 rounded-full shadow-sm">
                Chef's Special
              </span>
            </div>
            <h4 className="font-bold text-sm text-charcoal truncate">Truffle Burrata</h4>
            <p className="text-[11px] text-brand-600 font-semibold">Stone-Baked Hearth</p>
            <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-gray-100 text-[11px]">
              <span className="flex items-center gap-1 font-bold text-charcoal">
                <Clock className="w-3.5 h-3.5 text-brand-500" /> 25 Mins
              </span>
              <span className="flex items-center gap-0.5 font-bold text-amber-500">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> 4.9
              </span>
            </div>
          </motion.div>

          {/* Card 3: Right tilted (+10 deg) */}
          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 15 }}
            animate={{ opacity: 1, x: 0, rotate: 8 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute right-4 sm:right-8 w-44 sm:w-48 bg-white p-3 rounded-2xl shadow-xl border border-orange-200/40 text-charcoal -translate-y-2 z-0 hover:z-20 hover:scale-105 transition-all"
          >
            <div className="w-full h-28 rounded-xl overflow-hidden bg-orange-50 mb-2.5">
              <img
                src="https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=500&q=80"
                alt="Fiery Pepperoni"
                className="w-full h-full object-cover"
              />
            </div>
            <h4 className="font-bold text-xs text-charcoal truncate">Fiery Pepperoni</h4>
            <p className="text-[10px] text-gray-500">Hot Honey Drizzle</p>
            <div className="flex items-center justify-between mt-2 pt-1 border-t border-gray-100 text-[10px] text-gray-600">
              <span className="flex items-center gap-1 font-semibold">
                <Clock className="w-3 h-3 text-orange-500" /> 18 Mins
              </span>
              <span className="flex items-center gap-0.5 font-bold text-amber-500">
                <Star className="w-2.5 h-2.5 fill-amber-400 text-amber-400" /> 4.8
              </span>
            </div>
          </motion.div>

        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-7 h-2 rounded-full bg-white shadow-sm" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
          <div className="w-2 h-2 rounded-full bg-white/50" />
        </div>

        {/* Bottom Headline & Subtitle */}
        <div className="text-center max-w-md space-y-2.5 z-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Discover Delectable Delights
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            Embark on a delightful adventure and explore a diverse range of artisanal, stone-baked pizzas.
          </p>
        </div>

      </div>

      {/* ================= RIGHT HALF: CLEAN WHITE LOGIN FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-[420px] space-y-6">
          
          {/* Logo Card Icon */}
          <div className="text-center space-y-3">
            <Link to="/" className="inline-block">
              <div className="w-20 h-20 rounded-2xl mx-auto shadow-xl shadow-orange-500/30 group hover:scale-105 transition-transform overflow-hidden bg-black p-1 border-2 border-brand-500/40">
                <img src="/logo.png" alt="PIZZORA" className="w-full h-full object-cover rounded-xl" />
              </div>
            </Link>

            {/* Greeting */}
            <h1 className="font-display font-bold text-2xl sm:text-[26px] text-[#222222] tracking-tight">
              Hey! Welcome to PIZZORA
            </h1>
          </div>

          {/* Quick Demo Access Bar */}
          <div className="bg-orange-50/70 border border-orange-200/80 rounded-2xl p-3 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#F36F21]">
              <span className="flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> 1-Click Demo Login:
              </span>
              <span className="text-[10px] text-gray-500 font-semibold">Instant Test</span>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('customer')}
                className="py-1.5 px-2.5 bg-white hover:bg-orange-100/50 border border-orange-200 rounded-xl text-[11px] font-bold text-charcoal text-left shadow-2xs transition-colors"
              >
                <span className="block text-[#F36F21]">Customer Demo</span>
                <span className="text-[10px] text-gray-500 font-normal">alex@pizzora.com</span>
              </button>
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('admin')}
                className="py-1.5 px-2.5 bg-white hover:bg-orange-100/50 border border-orange-200 rounded-xl text-[11px] font-bold text-charcoal text-left shadow-2xs transition-colors"
              >
                <span className="block text-[#F36F21]">Kitchen Admin</span>
                <span className="text-[10px] text-gray-500 font-normal">admin@pizzora.com</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-semibold flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Address"
                autoComplete="email"
                className="w-full px-4 py-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                  autoComplete="current-password"
                  className="w-full px-4 pr-11 py-3 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal transition-colors p-1"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password Row */}
            <div className="flex items-center justify-between text-xs pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer select-none text-gray-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 text-[#F36F21] rounded border-gray-300 focus:ring-[#F36F21] accent-[#F36F21] cursor-pointer"
                />
                <span>Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => setForgotPasswordOpen(true)}
                className="text-gray-500 hover:text-[#F36F21] font-medium transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {/* Dark Charcoal / Black Login Button matching the design */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#222222] hover:bg-[#111111] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Signing in...</span>
                </div>
              ) : (
                <span>Login</span>
              )}
            </button>

          </form>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-bold text-gray-400 uppercase tracking-wider shrink-0">
              OR
            </span>
            <div className="border-t border-gray-200 w-full" />
          </div>

          {/* Sign In with Google Button matching the light blue pill design */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-[#EEF2F6] hover:bg-[#E2E8F0] text-[#334155] font-semibold text-xs sm:text-sm rounded-xl transition-all flex items-center justify-center gap-2.5 border border-transparent shadow-2xs"
          >
            {/* Google G icon */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Bottom link to Register */}
          <div className="text-center pt-1">
            <p className="text-xs text-gray-500 font-medium">
              Don't have an Account ?{' '}
              <Link to="/register" className="font-bold text-[#222222] hover:text-[#F36F21] transition-colors underline underline-offset-2">
                Register.
              </Link>
            </p>
          </div>

        </div>
      </div>

      {/* Forgot Password Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
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
                Enter your registered email address and we will dispatch an instant password reset link.
              </p>

              {forgotSuccess ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Password reset email sent! Check your inbox.</span>
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
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 text-xs focus:outline-none focus:border-[#F36F21]"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setForgotPasswordOpen(false)}
                      className="px-4 py-2 text-xs font-bold text-gray-500 hover:text-charcoal"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#222222] text-white rounded-xl text-xs font-bold shadow hover:bg-black"
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
