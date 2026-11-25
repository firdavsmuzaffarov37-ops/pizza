import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Check, Ticket, ArrowRight, Send, ExternalLink, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SPECIAL_OFFERS, PRODUCTS } from '../../data/pizzas';
import { useLanguage } from '../../context/LanguageContext';
import ProductCard from '../menu/ProductCard';

export default function SpecialOffers() {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState(null);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const discountedProducts = PRODUCTS.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <section className="py-14 bg-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Telegram Promocodes Official Banner */}
        <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full bg-white/10 blur-xl pointer-events-none" />
          <div className="flex items-center gap-4 z-10">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner">
              <Send className="w-7 h-7 text-white -rotate-12 translate-x-0.5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-white text-[11px] font-bold uppercase tracking-wider mb-1.5 backdrop-blur-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Eksklyuziv Promokodlar</span>
              </div>
              <h3 className="font-display font-extrabold text-xl sm:text-2xl text-white">
                Promokodlarni Telegram Kanalimizdan Oling!
              </h3>
              <p className="text-xs sm:text-sm text-sky-100 mt-1 max-w-xl leading-relaxed">
                Yangi 20%, 30% chegirmalar, har haftalik maxsus promo-kuponlar va bepul sovg‘alar faqat rasmiy Telegram kanalimizda e'lon qilinadi.
              </p>
            </div>
          </div>

          <a
            href="https://t.me/pizzora_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="z-10 px-6 py-3.5 bg-white text-blue-700 hover:bg-sky-50 font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-transform hover:scale-105 shrink-0 flex items-center gap-2"
          >
            <Send className="w-4 h-4 text-blue-600" />
            <span>Telegram Kanalga O'tish</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-60" />
          </a>
        </div>

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
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
          {SPECIAL_OFFERS.map((offer) => {
            const offerKey = offer.id.replace(/-/g, '_');
            const locTitle = t(`offer_${offerKey}_title`) !== `offer_${offerKey}_title` ? t(`offer_${offerKey}_title`) : offer.title;
            const locDesc = t(`offer_${offerKey}_desc`) !== `offer_${offerKey}_desc` ? t(`offer_${offerKey}_desc`) : offer.description;
            const locTag = t(`offer_${offerKey}_tag`) !== `offer_${offerKey}_tag` ? t(`offer_${offerKey}_tag`) : offer.tag;
            const locDiscount = t(`offer_${offerKey}_discount`) !== `offer_${offerKey}_discount` ? t(`offer_${offerKey}_discount`) : offer.discount;
            const locExpires = t(`offer_${offerKey}_expires`) !== `offer_${offerKey}_expires` ? t(`offer_${offerKey}_expires`) : offer.expiresIn;

            return (
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
                      {locTag}
                    </span>
                    <span className="text-xs font-medium text-white/80">{locExpires}</span>
                  </div>

                  <div className="font-display font-black text-3xl mb-1 tracking-tight">
                    {locDiscount}
                  </div>
                  <h3 className="font-bold text-lg text-white mb-2 leading-snug">
                    {locTitle}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed mb-6">
                    {locDesc}
                  </p>
                </div>

                {/* Voucher Action Code */}
                <div className="pt-4 border-t border-white/20 flex flex-wrap items-center justify-between gap-2">
                  <div className="bg-black/25 px-3 py-1.5 rounded-xl font-mono text-sm font-bold tracking-wider">
                    {offer.code}
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={offer.telegramUrl || "https://t.me/pizzora_uz"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-white/20 hover:bg-white/30 text-white text-xs font-bold rounded-xl backdrop-blur-sm flex items-center gap-1 transition-colors"
                      title="Telegram kanalida ko'rish"
                    >
                      <Send className="w-3 h-3" />
                      <span>Telegramda</span>
                    </a>

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
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Discounted Products Section */}
        {discountedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-t border-orange-100 pt-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4 text-brand-500 fill-brand-500" />
                  <span>Katta Aksiya & Chegirmalar</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
                  Chegirmadagi Mahsulotlar
                </h3>
                <p className="text-xs sm:text-sm text-charcoal-muted">
                  Hozirda arzonlashtirilgan narxdagi eng sara pitsalar, burgerlar, to‘plamlar va shirinliklar
                </p>
              </div>
              <Link
                to="/menu"
                className="text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>Barcha taomlarni ko‘rish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {discountedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
