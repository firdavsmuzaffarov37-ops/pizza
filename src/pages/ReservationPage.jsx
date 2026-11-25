import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles, 
  MapPin, 
  UtensilsCrossed,
  ShieldCheck,
  Send
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function ReservationPage() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '19:00',
    guests: '2',
    tableType: 'main-hall',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState(null);

  const TABLE_TYPES = [
    { id: 'main-hall', name: t('resHallMain'), desc: t('resHallMainDesc'), icon: '🏛️' },
    { id: 'window-side', name: t('resHallWindow'), desc: t('resHallWindowDesc'), icon: '🪟' },
    { id: 'romantic-corner', name: t('resHallRomantic'), desc: t('resHallRomanticDesc'), icon: '🕯️' },
    { id: 'vip-room', name: t('resHallVip'), desc: t('resHallVipDesc'), icon: '👑' },
    { id: 'terrace', name: t('resHallTerrace'), desc: t('resHallTerraceDesc'), icon: '🌿' }
  ];

  const TIME_SLOTS = [
    '11:30', '12:30', '13:30', '14:30', '16:00', 
    '17:30', '18:30', '19:00', '19:30', '20:00', '21:00', '22:00'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      alert(t('resFillRequired'));
      return;
    }

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));

    const reservationNumber = `BRON-${Math.floor(1000 + Math.random() * 9000)}`;
    const result = {
      id: reservationNumber,
      ...formData,
      createdAt: new Date().toISOString()
    };

    setConfirmedReservation(result);
    setIsSubmitting(false);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            {t('resBadge')}
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-charcoal">
            {t('resTitle')}
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            {t('resSubtitle')}
          </p>
        </div>

        {/* Confirmation Modal / Banner if completed */}
        <AnimatePresence>
          {confirmedReservation ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 sm:p-10 bg-white rounded-3xl border-2 border-emerald-400 shadow-2xl text-center space-y-6"
            >
              <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3.5 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">
                  {t('resSuccessBadge')}
                </span>
                <h2 className="font-display font-black text-3xl text-charcoal">
                  {t('resSuccessTitle')}
                </h2>
                <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                  {t('resSuccessDesc')}: <strong className="text-brand-600 font-mono">#{confirmedReservation.id}</strong>
                </p>
              </div>

              {/* Reservation card breakdown */}
              <div className="bg-orange-50/60 rounded-2xl p-5 border border-orange-100 max-w-lg mx-auto text-left grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-gray-500 block font-medium">{t('resLabelName')}:</span>
                  <p className="font-bold text-sm text-charcoal">{confirmedReservation.name}</p>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">{t('resLabelPhone')}:</span>
                  <p className="font-bold text-sm text-charcoal">{confirmedReservation.phone}</p>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">{t('resLabelDateTime')}:</span>
                  <p className="font-bold text-sm text-charcoal">{confirmedReservation.date} • {confirmedReservation.time}</p>
                </div>
                <div>
                  <span className="text-gray-500 block font-medium">{t('resLabelGuests')}:</span>
                  <p className="font-bold text-sm text-charcoal">{confirmedReservation.guests} {t('resGuestsCount')}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setConfirmedReservation(null)}
                className="px-8 py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl shadow-lg shadow-brand-500/25 transition-all text-sm"
              >
                {t('resBookAnother')}
              </button>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 sm:p-10 bg-white rounded-3xl border border-orange-100 shadow-soft-lg space-y-8"
            >
              {/* Step 1: Guest Count & Table Zone */}
              <div className="space-y-4">
                <label className="font-display font-bold text-base text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>{t('resStep1Zone')}</span>
                </label>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {TABLE_TYPES.map((tbl) => {
                    const isSelected = formData.tableType === tbl.id;
                    return (
                      <button
                        type="button"
                        key={tbl.id}
                        onClick={() => setFormData({ ...formData, tableType: tbl.id })}
                        className={`p-3.5 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center ${
                          isSelected
                            ? 'bg-brand-50 border-brand-500 text-brand-900 shadow-xs'
                            : 'bg-orange-50/40 border-orange-100 hover:bg-orange-50 text-charcoal'
                        }`}
                      >
                        <span className="text-2xl mb-1">{tbl.icon}</span>
                        <span className="font-bold text-xs block">{tbl.name}</span>
                        <span className="text-[10px] text-gray-500 block leading-tight mt-0.5">{tbl.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Date, Time & Number of Guests */}
              <div className="space-y-4 pt-4 border-t border-orange-50">
                <label className="font-display font-bold text-base text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>{t('resStep2DateTime')}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Date */}
                  <div>
                    <label className="text-xs font-bold text-charcoal mb-1.5 block">
                      {t('resLabelDate')}
                    </label>
                    <div className="relative">
                      <Calendar className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="date"
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-bold focus:outline-none focus:border-brand-500"
                        required
                      />
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-xs font-bold text-charcoal mb-1.5 block">
                      {t('resLabelGuests')}
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.guests}
                        onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-bold focus:outline-none focus:border-brand-500"
                      >
                        <option value="1">1 {t('resPerson')}</option>
                        <option value="2">2 {t('resPerson')}</option>
                        <option value="3">3 {t('resPerson')}</option>
                        <option value="4">4 {t('resPerson')}</option>
                        <option value="5">5 {t('resPerson')}</option>
                        <option value="6">6 {t('resPerson')}</option>
                        <option value="8">8 {t('resPerson')}</option>
                        <option value="10+">10+ {t('resPerson')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="text-xs font-bold text-charcoal mb-1.5 block">
                      {t('resLabelTime')}
                    </label>
                    <div className="relative">
                      <Clock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-bold focus:outline-none focus:border-brand-500"
                      >
                        {TIME_SLOTS.map((tSlot) => (
                          <option key={tSlot} value={tSlot}>{tSlot}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Details */}
              <div className="space-y-4 pt-4 border-t border-orange-50">
                <label className="font-display font-bold text-base text-charcoal flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center font-bold">3</span>
                  <span>{t('resStep3Contact')}</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-charcoal mb-1.5 block">
                      {t('resLabelName')} *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        placeholder="Masalan: Sardor Aliyev"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-charcoal mb-1.5 block">
                      {t('resLabelPhone')} *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="tel"
                        placeholder="+998 (90) 123-45-67"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-10 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-charcoal mb-1.5 block">
                    {t('resLabelSpecialNotes')} ({t('chefNote').split('(')[1] || 'ixtiyoriy)'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={t('resSpecialNotesPlaceholder')}
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                >
                  {isSubmitting ? (
                    <span>{t('resSubmitting')}</span>
                  ) : (
                    <>
                      <UtensilsCrossed className="w-5 h-5" />
                      <span>{t('resConfirmSubmit')}</span>
                    </>
                  )}
                </button>
              </div>

            </motion.form>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}

