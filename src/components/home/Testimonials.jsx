import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../data/pizzas';
import { useLanguage } from '../../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-brand-600 font-bold text-xs uppercase tracking-widest">
            {t('testimonialsBadge')}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal mt-2">
            {t('testimonialsTitle')}
          </h2>
          <p className="text-sm text-charcoal-muted mt-2">
            {t('testimonialsSub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -5 }}
              className="p-7 rounded-3xl bg-white border border-orange-100 shadow-soft relative flex flex-col justify-between"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-orange-200/50" />

              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-sm text-charcoal leading-relaxed italic mb-6">
                  "{item.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-orange-50 flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-brand-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-charcoal">{item.name}</h4>
                  <p className="text-xs text-charcoal-muted">{item.role}</p>
                  <p className="text-[11px] text-brand-600 font-semibold mt-0.5">
                    {t('favoritePizzaLabel')} {item.favoritePizza}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
