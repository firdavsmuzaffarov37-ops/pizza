import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Flame, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 hero-mesh">
      {/* Background soft ambient glowing circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-300/20 via-amber-200/20 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 sm:space-y-8"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100/80 border border-orange-200/60 shadow-sm text-brand-700 text-xs sm:text-sm font-bold">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              <span>Stone-Baked Artisanal Neapolitan Pizzas</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-500" />
            </div>

            {/* Headline */}
            <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-charcoal leading-[1.08]">
              Fresh Pizza, <br />
              <span className="bg-gradient-to-r from-brand-500 via-brand-600 to-amber-500 bg-clip-text text-transparent">
                Happy Moments.
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-charcoal-muted max-w-xl leading-relaxed">
              Crafted from 72-hour naturally fermented sourdough, sweet Campania San Marzano tomatoes, and authentic melting Fior di Latte. Hot and bubbly straight from our stone hearth to your doorstep.
            </p>

            {/* CTAs & Guarantee */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                to="/menu"
                className="px-8 py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-base rounded-full shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Order Now</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/menu?category=combos"
                className="px-8 py-4 bg-white hover:bg-orange-50/60 text-charcoal font-bold text-base rounded-full border border-orange-200/80 shadow-sm flex items-center justify-center gap-2 transition-colors"
              >
                <span>Explore Deals</span>
                <span className="text-xs bg-brand-100 text-brand-700 font-bold px-2 py-0.5 rounded-full">Save 20%</span>
              </Link>
            </div>

            {/* Highlights Bar */}
            <div className="pt-6 border-t border-orange-100/80 grid grid-cols-3 gap-4 sm:gap-6">
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-charcoal">
                  25+
                </span>
                <span className="text-xs text-charcoal-muted font-medium">Artisanal Pizzas</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-brand-500">
                  25 min
                </span>
                <span className="text-xs text-charcoal-muted font-medium">Avg Delivery Time</span>
              </div>
              <div>
                <span className="block font-display font-black text-2xl sm:text-3xl text-charcoal">
                  4.9 ★
                </span>
                <span className="text-xs text-charcoal-muted font-medium">15k+ Reviews</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column App-Style Hero Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5 relative flex justify-center"
          >
            {/* Center Main Circular Plate Showcase */}
            <div className="relative w-full max-w-[440px] aspect-square rounded-full p-4 bg-gradient-to-tr from-orange-200/50 via-white to-amber-100/50 shadow-2xl flex items-center justify-center">
              
              {/* Outer decorative ring */}
              <div className="absolute inset-2 border-2 border-dashed border-brand-300/50 rounded-full animate-[spin_60s_linear_infinite]" />

              {/* Pizza Photo Container */}
              <motion.div
                whileHover={{ rotate: 8 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="relative z-10 w-full h-full rounded-full overflow-hidden shadow-2xl shadow-orange-950/20 border-8 border-white"
              >
                <img
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=85"
                  alt="PIZZORA Handcrafted Artisanal Pizza"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>

              {/* Floating Badge 1: Save 30% */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute -top-3 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-soft-lg border border-orange-100 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold text-lg">
                  🔥
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Save 30%</span>
                  <span className="text-xs font-bold text-charcoal">Code: PIZZORA20</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Pure 100% */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-3 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-soft-lg border border-orange-100 flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  🌿
                </div>
                <div>
                  <span className="text-[10px] text-gray-500 font-semibold block uppercase">Pure 100%</span>
                  <span className="text-xs font-bold text-charcoal">Italian Mozzarella</span>
                </div>
              </motion.div>

              {/* Delivery ETA pill */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-4 left-6 z-20 bg-charcoal text-white px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-2 text-xs font-semibold"
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>Delivery: 20-30 mins</span>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

