import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Heart,
  Clock,
  Sparkles,
  ShieldCheck,
  Share2
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white pt-16 pb-12 border-t border-orange-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">30-Minute Guarantee</h4>
              <p className="text-xs text-gray-400">Piping hot stone-baked pizza at your door or it's on us.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">72-Hour Fermented Dough</h4>
              <p className="text-xs text-gray-400">Pure Italian unbleached flour, digestible and airy crust.</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-white text-base">100% Pure & Fresh</h4>
              <p className="text-xs text-gray-400">DOP San Marzano tomatoes, imported buffalo mozzarella.</p>
            </div>
          </div>
        </div>

        {/* Main Footer links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl overflow-hidden shadow-md shadow-brand-500/20 bg-black p-0.5 border border-brand-500/30 flex items-center justify-center">
                <img src="/logo.png" alt="PIZZORA" className="w-full h-full object-cover rounded-lg" />
              </div>
              <span className="font-display font-black text-2xl tracking-tight text-white">
                PIZZORA
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed max-w-sm">
              Artisanal stone-baked pizzas crafted with heart, pure heritage sourdough, and the finest sun-ripened ingredients. Taste the Happiness in every single slice.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.6 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" aria-label="Twitter / X" className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-500 flex items-center justify-center text-gray-300 hover:text-white transition-colors">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm uppercase tracking-wider">Explore Menu</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/menu?category=signature" className="hover:text-brand-400 transition-colors">Signature Pizzas</Link></li>
              <li><Link to="/menu?category=classic" className="hover:text-brand-400 transition-colors">Classic Italian</Link></li>
              <li><Link to="/menu?category=spicy" className="hover:text-brand-400 transition-colors">Hot & Fiery</Link></li>
              <li><Link to="/menu?category=combos" className="hover:text-brand-400 transition-colors">Party Combos</Link></li>
              <li><Link to="/menu?category=desserts" className="hover:text-brand-400 transition-colors">Artisan Desserts</Link></li>
            </ul>
          </div>

          {/* Quick Company */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm uppercase tracking-wider">Company</h5>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">Our Story & Craft</Link></li>
              <li><Link to="/contact" className="hover:text-brand-400 transition-colors">Contact & Locations</Link></li>
              <li><Link to="/orders" className="hover:text-brand-400 transition-colors">Track Order</Link></li>
              <li><Link to="/account" className="hover:text-brand-400 transition-colors">My Profile</Link></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition-colors">Kitchen Admin</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h5 className="font-display font-bold text-white text-sm uppercase tracking-wider">Kitchen & Delivery</h5>
            <div className="space-y-2.5 text-xs text-gray-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-0.5" />
                <span>100 Artisan Way, Pizzora Square, NY 10012</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-400 shrink-0" />
                <span>+1 (800) 749-9672 (PIZZORA)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>hello@pizzora.com</span>
              </p>
              <div className="pt-2 text-amber-300 font-medium">
                Open Daily: 11:00 AM – 11:30 PM
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} PIZZORA Inc. All rights reserved. Taste the Happiness.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-gray-400">
              Handcrafted with <Heart className="w-3.5 h-3.5 text-brand-500 fill-brand-500" /> for pizza lovers
            </span>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
