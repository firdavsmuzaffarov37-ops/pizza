import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(false);

  // UI state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validations
  const validateForm = () => {
    if (!fullName.trim() || fullName.trim().length < 2) {
      setErrorMessage('Please enter your full name (at least 2 characters).');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return false;
    }
    if (!agreedTerms) {
      setErrorMessage('You must accept the Terms and Conditions to proceed.');
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
      await register({
        name: fullName,
        email,
        phone,
        password
      });

      setSuccessMessage('Account created successfully! Welcome to PIZZORA.');
      setTimeout(() => {
        navigate('/account');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex bg-warmWhite">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-full">
        
        {/* Left Column: Visual Showcase Matching Login */}
        <div className="hidden lg:flex lg:col-span-6 relative p-12 flex-col justify-between overflow-hidden rounded-r-3xl m-4 my-6 bg-charcoal text-white shadow-2xl">
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1400&q=85"
              alt="Handcrafting Pizza dough"
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

          {/* Center Brand Text */}
          <div className="relative z-10 space-y-4 max-w-md">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-bold border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              Welcome Gift Included
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
              Join the PIZZORA Family & Save 20% Today.
            </h2>
            <p className="text-sm text-gray-300 leading-relaxed">
              Create your account in seconds to unlock seamless checkout, personalized pizza recipes, live oven tracking and exclusive secret crust offers.
            </p>
          </div>

          {/* Bottom badge */}
          <div className="relative z-10 pt-6 border-t border-white/15 flex items-center justify-between text-xs text-gray-400">
            <span>Fast 30-min Hot Delivery Guarantee</span>
            <span className="font-semibold text-white">100% Secure Checkout</span>
          </div>
        </div>

        {/* Right Column: Clean Registration Form */}
        <div className="lg:col-span-6 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-7">
            
            {/* Header */}
            <div>
              {/* Mobile logo only */}
              <div className="lg:hidden flex items-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-xl text-white">
                  🍕
                </div>
                <span className="font-display font-extrabold text-xl text-charcoal">PIZZORA</span>
              </div>

              <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal tracking-tight">
                Create Account
              </h1>
              <p className="text-sm text-charcoal-muted mt-2">
                Sign up and start tasting true Neapolitan happiness.
              </p>
            </div>

            {/* Error Message */}
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

            {/* Success Message */}
            {successMessage && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-semibold flex items-center gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMessage}</span>
              </motion.div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="E.g. Marco Rossi"
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="marco@example.com"
                    autoComplete="email"
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full pl-11 pr-4 py-3 bg-white rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full pl-11 pr-11 py-3 bg-white rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-1.5">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-11 pr-11 py-3 bg-white rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all shadow-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start pt-1">
                <input
                  id="agree-terms"
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                  className="h-4 w-4 mt-0.5 text-brand-500 focus:ring-brand-400 border-gray-300 rounded cursor-pointer accent-brand-500"
                />
                <label htmlFor="agree-terms" className="ml-2 block text-xs text-charcoal-muted leading-relaxed cursor-pointer">
                  I agree to the PIZZORA <a href="#" className="underline text-charcoal font-semibold">Terms of Service</a> and <a href="#" className="underline text-charcoal font-semibold">Privacy Policy</a>.
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/30 hover:shadow-brand-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-4"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Creating your account...</span>
                  </div>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>

            {/* Bottom link to Login */}
            <div className="text-center pt-2">
              <p className="text-xs text-charcoal-muted">
                Already have an account?{' '}
                <Link to="/login" className="font-extrabold text-brand-600 hover:text-brand-700 underline underline-offset-2">
                  Sign in
                </Link>
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

