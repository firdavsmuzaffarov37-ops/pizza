import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Ticket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPECIAL_OFFERS } from '../../data/pizzas';
import { useLanguage } from '../../context/LanguageContext';

export default function SpecialOffers() {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-14 bg-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider mb-2">
              <Ticket className="w-4 h-4" />
              {t('exclusiveDeals')}
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
              {t('freshDealsDaily')}
            </h2>
          </div>
          <Link
            to="/menu?category=combos"
            className="mt-3 md:mt-0 text-sm font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 group"
          >
            <span>{t('viewCombosOffers')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Promo Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SPECIAL_OFFERS.map((offer) => (
            <motion.div
              key={offer.id}
              whileHover={{ y: -5 }}
              className={`rounded-3xl p-6 bg-gradient-to-br ${offer.bgColor} text-white shadow-soft relative overflow-hidden flex flex-col justify-between`}
            >
              {/* Subtle background shape */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/20 backdrop-blur-md">
                    {offer.tag}
                  </span>
                  <span className="text-xs font-medium text-white/80">{offer.expiresIn}</span>
                </div>

                <div className="font-display font-black text-3xl mb-1 tracking-tight">
                  {offer.discount}
                </div>
                <h3 className="font-bold text-lg text-white mb-2 leading-snug">
                  {offer.title}
                </h3>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  {offer.description}
                </p>
              </div>

              {/* Voucher Action Code */}
              <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                <div className="bg-black/20 px-3 py-1.5 rounded-xl font-mono text-sm font-bold tracking-wider">
                  {offer.code}
                </div>

                <button
                  onClick={() => copyCode(offer.code)}
                  className="px-3.5 py-1.5 bg-white text-charcoal hover:bg-orange-50 font-bold text-xs rounded-xl shadow transition-colors flex items-center gap-1.5"
                >
                  {copiedCode === offer.code ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">{t('copiedCodeText')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-gray-500" />
                      <span>{t('copyCodeBtn')}</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
