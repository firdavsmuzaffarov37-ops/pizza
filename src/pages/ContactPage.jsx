import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3500);
  };

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            {t('contactBadge')}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-charcoal">
            {t('contactTitle')}
          </h1>
          <p className="text-sm text-charcoal-muted">
            {t('contactSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-6">
              <h3 className="font-display font-black text-2xl text-charcoal">
                PIZZORA Restaurant
              </h3>

              <div className="space-y-4 text-xs text-charcoal">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">{t('contactVisitUs')}</span>
                    <span className="text-charcoal-muted">Amir Temur shoh ko'chasi, Toshkent, O'zbekiston</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">{t('contactPhone')}</span>
                    <span className="text-charcoal-muted">+998 (71) 200-11-22</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">{t('contactEmail')}</span>
                    <span className="text-charcoal-muted">info@pizzora.uz / order@pizzora.uz</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">{t('contactWorkingHours')}</span>
                    <span className="text-charcoal-muted">{t('contactWorkingHoursVal')}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Pill */}
            <div className="p-5 bg-gradient-to-r from-brand-500 to-amber-500 text-white rounded-3xl shadow-md space-y-1">
              <span className="font-bold text-sm block">{t('guarantee30Min')}</span>
              <p className="text-xs text-white/90">
                {t('guarantee30MinDesc')}
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-6">
              <h3 className="font-display font-extrabold text-2xl text-charcoal">
                {t('contactFormTitle')}
              </h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">{t('contactSentSuccess')}</h4>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-charcoal mb-1">{t('contactNameLabel')} *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Aziz Karimov"
                        className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-charcoal mb-1">{t('contactEmailLabel')} *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="aziz@example.com"
                        className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal mb-1">{t('contactSubjectLabel')}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Stol bron qilish / Katta tadbir / Taklif"
                      className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal mb-1">{t('contactMessageLabel')} *</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="..."
                      className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>{t('contactSendBtn')}</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
