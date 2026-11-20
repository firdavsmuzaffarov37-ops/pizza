import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, ShieldAlert, Award } from 'lucide-react';
import Hero from '../components/home/Hero';
import SpecialOffers from '../components/home/SpecialOffers';
import WhyPizzora from '../components/home/WhyPizzora';
import Testimonials from '../components/home/Testimonials';
import ProductCard from '../components/menu/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/pizzas';

export default function HomePage() {
  // Popular pizzas slice
  const popularPizzas = PRODUCTS.filter((p) => p.subCategory === 'pizza').slice(0, 4);

  return (
    <div className="space-y-4">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Category Exploration Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="p-4 sm:p-6 bg-white rounded-3xl border border-orange-100 shadow-soft">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-bold text-lg text-charcoal">
              Browse by Category
            </h3>
            <Link
              to="/menu"
              className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              See all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/menu?category=${cat.id}`}
                className="flex flex-col items-center justify-center p-3 rounded-2xl bg-orange-50/50 hover:bg-orange-100/70 border border-orange-100 transition-all text-center group"
              >
                <span className="text-2xl mb-1 group-hover:scale-115 transition-transform">
                  {cat.id === 'all' && '✨'}
                  {cat.id === 'signature' && '🔥'}
                  {cat.id === 'classic' && '🍕'}
                  {cat.id === 'spicy' && '🌶️'}
                  {cat.id === 'combos' && '🎁'}
                  {cat.id === 'drinks' && '🥤'}
                  {cat.id === 'desserts' && '🍰'}
                </span>
                <span className="text-xs font-bold text-charcoal group-hover:text-brand-600 transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Popular Artisanal Pizzas */}
      <section className="py-14 bg-warmWhite">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10">
            <div>
              <div className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
                <Flame className="w-4 h-4 fill-brand-500" />
                Crowd Favorites
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                Most Loved Stone-Baked Pizzas
              </h2>
            </div>
            <Link
              to="/menu"
              className="mt-3 sm:mt-0 px-5 py-2.5 rounded-full bg-orange-50 text-brand-600 hover:bg-orange-100 text-sm font-bold flex items-center gap-1.5 transition-colors self-start sm:self-auto"
            >
              <span>Explore Complete Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularPizzas.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. Special Offers Section */}
      <SpecialOffers />

      {/* 5. Why PIZZORA Craftsmanship */}
      <WhyPizzora />

      {/* 6. Mobile Experience / Story Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white p-8 sm:p-12 shadow-soft-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl z-10">
            <span className="bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Download the Happiness
            </span>
            <h3 className="font-display font-extrabold text-3xl sm:text-4xl leading-tight">
              Craving fresh pizza delivered in 30 minutes?
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Order directly online or join our PIZZORA Club for secret weekend secret recipes, free dough upgrades, and express priority delivery.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                to="/menu"
                className="px-7 py-3.5 bg-white text-charcoal hover:bg-orange-50 font-extrabold text-sm rounded-full shadow-md transition-all"
              >
                Order Online Now
              </Link>
              <Link
                to="/register"
                className="px-7 py-3.5 bg-black/25 hover:bg-black/35 text-white font-bold text-sm rounded-full backdrop-blur-sm transition-all"
              >
                Create Account (Get 20% Off)
              </Link>
            </div>
          </div>

          <div className="relative z-10 shrink-0 w-52 sm:w-64">
            <div className="w-full aspect-[9/16] bg-charcoal/90 rounded-[36px] p-2.5 shadow-2xl border-4 border-white/20">
              <div className="w-full h-full bg-warmWhite rounded-[28px] overflow-hidden flex flex-col p-3 text-charcoal">
                <div className="w-16 h-4 bg-gray-200 rounded-full mx-auto mb-2" />
                <div className="text-center">
                  <span className="text-[10px] font-bold text-brand-600 uppercase">PIZZORA APP</span>
                  <p className="font-black text-xs">Cravings at Your Door</p>
                </div>
                <div className="my-auto w-full aspect-square rounded-2xl overflow-hidden shadow-inner">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80"
                    alt="Pizza in app mockup"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-auto bg-brand-500 text-white text-[10px] font-bold py-2 rounded-xl text-center">
                  Track Delivery Live
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials />
    </div>
  );
}

