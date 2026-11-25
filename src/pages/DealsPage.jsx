import React from 'react';
import { motion } from 'framer-motion';
import { Ticket, Sparkles, ArrowRight, Clock, Percent } from 'lucide-react';
import SpecialOffers from '../components/home/SpecialOffers';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';

export default function DealsPage() {
  const { t } = useLanguage();

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Hero Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            {t('dealsBadge')}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-charcoal">
            {t('dealsTitle')}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            {t('dealsSubtitle')}
          </p>
        </div>

        {/* Offers Grid */}
        <SpecialOffers />

        {/* Promo VIP Club Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-amber-500 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-xl text-center md:text-left">
            <span className="px-3.5 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
              PIZZORA VIP CLUB
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl">
              {t('cravingFreshPizza')}
            </h3>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              {t('cravingSub')}
            </p>
          </div>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-charcoal hover:bg-orange-50 font-extrabold text-sm rounded-full shadow-lg transition-transform hover:scale-105 shrink-0"
          >
            {t('createAccountPromo')}
          </Link>
        </div>

      </div>
    </div>
  );
}

