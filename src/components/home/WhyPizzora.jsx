import React from 'react';
import { motion } from 'framer-motion';
import { Award, Leaf, Zap, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export default function WhyPizzora() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Award className="w-7 h-7 text-brand-500" />,
      title: t('feat1Title'),
      desc: t('feat1Desc')
    },
    {
      icon: <Leaf className="w-7 h-7 text-emerald-500" />,
      title: t('feat2Title'),
      desc: t('feat2Desc')
    },
    {
      icon: <Zap className="w-7 h-7 text-amber-500" />,
      title: t('feat3Title'),
      desc: t('feat3Desc')
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-brand-600" />,
      title: t('feat4Title'),
      desc: t('feat4Desc')
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-warmWhite via-orange-50/30 to-warmWhite">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            {t('thePizzoraStandard')}
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal mt-3">
            {t('whyPureHappiness')}
          </h2>
          <p className="text-sm text-charcoal-muted mt-3">
            {t('whySub')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              className="p-6 rounded-3xl bg-white border border-orange-100/90 shadow-soft hover:shadow-soft-lg flex flex-col justify-between transition-all"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-50 border border-orange-100 flex items-center justify-center mb-5">
                  {item.icon}
                </div>
                <h3 className="font-display font-bold text-lg text-charcoal mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-orange-50 flex items-center gap-1.5 text-brand-600 font-bold text-xs">
                <span>{t('heritageCraft')}</span>
                <span>•</span>
                <span className="text-gray-400 font-normal">Est. 2024</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
