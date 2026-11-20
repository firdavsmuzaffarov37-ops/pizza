import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, ShieldCheck, Flame, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AboutPage() {
  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            Our Artisanal Story
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-charcoal">
            Born from a Passion for Perfection & Joy.
          </h1>
          <p className="text-base text-charcoal-muted leading-relaxed">
            At PIZZORA, we believe pizza is not fast food—it's an ancient culinary art designed to gather family, spark laughter, and spread pure happiness.
          </p>
        </div>

        {/* Visual Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white aspect-[4/3]">
            <img
              src="https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=80"
              alt="Pizzaiolo preparing sourdough"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-600">
              <Flame className="w-4 h-4 text-brand-500" />
              The 72-Hour Ferment Difference
            </div>
            <h2 className="font-display font-black text-3xl text-charcoal leading-snug">
              Crispy outside, cloud-like inside, zero heaviness.
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              Standard commercial pizzas rush fermentation with artificial yeasts in 2 hours. At PIZZORA, our dough rests in controlled cold fermentation for three full days. This allows complex organic aromas to develop and naturally digests the starches so you feel light, energetic and joyful after every bite.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                <span className="font-display font-black text-2xl text-brand-500 block">480°C</span>
                <span className="text-xs text-charcoal-muted font-medium">Stone Hearth Oven</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                <span className="font-display font-black text-2xl text-brand-500 block">100% DOP</span>
                <span className="text-xs text-charcoal-muted font-medium">Campania San Marzano</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              🌿
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">Clean, Honest Ingredients</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Zero artificial preservatives, no bleached flour, no seed oil fillers. Only cold-pressed Italian extra virgin olive oil and unadulterated cheeses.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              🔥
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">Master Hearth Craftsmanship</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Every pie is hand-stretched and fired in authentic stone deck ovens, capturing the blistering heat and authentic leopard-spotted char.
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              💛
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">Taste the Happiness</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              More than a meal, it's our promise of warmth, speed, and unforgettable moments shared around the table.
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-brand-600 to-amber-500 text-white text-center space-y-4 shadow-soft-lg">
          <h2 className="font-display font-extrabold text-3xl">Ready to Taste the Happiness?</h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto">
            Order your stone-baked pizza now and experience the PIZZORA craft in under 30 minutes.
          </p>
          <Link
            to="/menu"
            className="inline-block px-8 py-3.5 bg-white text-charcoal font-black text-sm rounded-full shadow-lg hover:bg-orange-50 transition-colors"
          >
            Explore Menu & Order
          </Link>
        </div>

      </div>
    </div>
  );
}

