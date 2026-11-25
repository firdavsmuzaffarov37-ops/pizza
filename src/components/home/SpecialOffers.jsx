import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Send, ExternalLink, Sparkles, Flame } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PRODUCTS } from '../../data/pizzas';
import { useLanguage } from '../../context/LanguageContext';
import ProductCard from '../menu/ProductCard';

export default function SpecialOffers() {
  const { t } = useLanguage();

  const discountedProducts = PRODUCTS.filter(
    (p) => p.originalPrice && p.originalPrice > p.price
  );

  return (
    <section className="py-10 bg-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Telegram Promocodes Official Banner */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
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

        {/* Discounted Products Section */}
        {discountedProducts.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 text-brand-600 font-bold text-xs uppercase tracking-wider mb-1">
                  <Flame className="w-4 h-4 text-brand-500 fill-brand-500" />
                  <span>Katta Aksiya & Chegirmalar</span>
                </div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-charcoal">
                  Chegirmadagi Mahsulotlar
                </h2>
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
