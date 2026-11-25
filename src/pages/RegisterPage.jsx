import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Eye, 
  EyeOff, 
  Clock, 
  Star, 
  CheckCircle2, 
  AlertCircle
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
        navigate('/menu');
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-white">
      
      {/* ================= LEFT HALF: ORANGE BANNER WITH 3 TILTED POLAROID CARDS ================= */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#F36F21] relative overflow-hidden flex-col items-center justify-center p-12 text-white select-none">
        
        {/* Floating playful confetti / shapes */}
        <div className="absolute top-16 left-20 w-4 h-4 bg-yellow-300 rounded-sm rotate-45 opacity-90 animate-pulse" />
        <div className="absolute top-28 right-24 w-6 h-6 bg-blue-500 rounded-full opacity-80" />
        <div className="absolute top-44 left-1/4 text-2xl opacity-90">👍</div>
        <div className="absolute top-52 right-1/6 text-2xl opacity-90">👍</div>
        <div className="absolute bottom-40 left-16 text-3xl opacity-80">🎉</div>
        <div className="absolute bottom-36 right-20 w-5 h-5 bg-pink-400 rounded-md rotate-12 opacity-85" />

        {/* Center: 3 Stacked / Tilted Food Cards */}
        <div className="relative flex items-center justify-center w-full max-w-lg h-72 mb-8">
          
          {/* Card 1: Left tilted */}
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
              <span className="font-bold text-charcoal">69 000 so'm</span>
            </div>
          </motion.div>

          {/* Card 2: Center Highlighted */}
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

          {/* Card 3: Right tilted */}
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

        {/* Headline */}
        <div className="text-center max-w-md space-y-2.5 z-10">
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            Join the PIZZORA Family
          </h2>
          <p className="text-xs sm:text-sm text-white/90 leading-relaxed font-medium">
            Create your account in seconds to unlock secret discounts, free dough upgrades and express delivery.
          </p>
        </div>

      </div>

      {/* ================= RIGHT HALF: CLEAN REGISTER FORM ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16">
        <div className="w-full max-w-[420px] space-y-5">
          
          {/* Logo Card Icon */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-block">
              <div className="w-20 h-20 rounded-2xl mx-auto shadow-xl shadow-orange-500/30 group hover:scale-105 transition-transform overflow-hidden bg-black p-1 border-2 border-brand-500/40">
                <img src="/logo.png" alt="PIZZORA" className="w-full h-full object-cover rounded-xl" />
              </div>
            </Link>

            <h1 className="font-display font-bold text-2xl sm:text-[26px] text-[#222222] tracking-tight">
              Create an Account
            </h1>
            <p className="text-xs text-gray-500">
              Sign up and taste true Neapolitan happiness.
            </p>
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

          {/* Success Message */}
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your Full Name"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email Address"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-4 py-2.5 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full px-4 pr-11 py-2.5 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold text-[#444444] mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your Password"
                  className="w-full px-4 pr-11 py-2.5 bg-white rounded-xl border border-gray-300 focus:outline-none focus:border-[#F36F21] focus:ring-1 focus:ring-[#F36F21] text-xs sm:text-sm text-charcoal placeholder:text-gray-400 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal p-1"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 pt-1 text-xs text-gray-600">
              <input
                type="checkbox"
                id="terms"
                checked={agreedTerms}
                onChange={(e) => setAgreedTerms(e.target.checked)}
                className="w-3.5 h-3.5 mt-0.5 text-[#F36F21] rounded border-gray-300 focus:ring-[#F36F21] accent-[#F36F21] cursor-pointer"
              />
              <label htmlFor="terms" className="cursor-pointer select-none">
                I agree to the <span className="font-semibold text-charcoal">Terms of Service</span> and <span className="font-semibold text-charcoal">Privacy Policy</span>.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-[#222222] hover:bg-[#111111] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed mt-2 active:scale-[0.99]"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating Account...</span>
                </div>
              ) : (
                <span>Register</span>
              )}
            </button>

          </form>

          {/* Bottom link to Login */}
          <div className="text-center pt-1">
            <p className="text-xs text-gray-500 font-medium">
              Already have an Account ?{' '}
              <Link to="/login" className="font-bold text-[#222222] hover:text-[#F36F21] transition-colors underline underline-offset-2">
                Login.
              </Link>
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}
