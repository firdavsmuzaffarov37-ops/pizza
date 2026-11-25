import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Award, ShieldCheck, Flame, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            {t('aboutHeroBadge')}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-charcoal">
            {t('aboutHeroTitle')}
          </h1>
          <p className="text-base text-charcoal-muted leading-relaxed">
            {t('aboutHeroSubtitle')}
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
              {t('aboutFermentDiff')}
            </div>
            <h2 className="font-display font-black text-3xl text-charcoal leading-snug">
              {t('aboutFermentTitle')}
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {t('aboutFermentDesc')}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                <span className="font-display font-black text-2xl text-brand-500 block">480°C</span>
                <span className="text-xs text-charcoal-muted font-medium">{t('aboutOven')}</span>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-orange-100 shadow-sm">
                <span className="font-display font-black text-2xl text-brand-500 block">100% DOP</span>
                <span className="text-xs text-charcoal-muted font-medium">{t('aboutTomato')}</span>
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
            <h3 className="font-display font-bold text-lg text-charcoal">{t('aboutPillar1Title')}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('aboutPillar1Desc')}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              🔥
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">{t('aboutPillar2Title')}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('aboutPillar2Desc')}
            </p>
          </div>

          <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-brand-600 flex items-center justify-center font-bold">
              💛
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">{t('aboutPillar3Title')}</h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('aboutPillar3Desc')}
            </p>
          </div>
        </div>

        {/* CTA banner */}
        <div className="p-10 rounded-3xl bg-gradient-to-r from-brand-600 to-amber-500 text-white text-center space-y-4 shadow-soft-lg">
          <h2 className="font-display font-extrabold text-3xl">{t('tagline')}</h2>
          <p className="text-sm text-white/80 max-w-lg mx-auto">
            {t('heroSubtitle')}
          </p>
          <Link
            to="/menu"
            className="inline-block px-8 py-3.5 bg-white text-charcoal font-black text-sm rounded-full shadow-lg hover:bg-orange-50 transition-colors"
          >
            {t('exploreCompleteMenu')}
          </Link>
        </div>

      </div>
    </div>
  );
}
