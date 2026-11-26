import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CreditCard,
  Banknote,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Receipt,
  Star,
  Sparkles,
  UtensilsCrossed
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function PaymentPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getOrderById, updateOrderStatus } = useOrders();
  const { t, formatPrice } = useLanguage();

  const PAYMENT_METHODS = [
    { id: 'cash', label: t('cash'), icon: Banknote, desc: t('cashDesc'), color: 'bg-emerald-50 border-emerald-300 text-emerald-800' },
    { id: 'card', label: t('card'), icon: CreditCard, desc: t('cardDesc'), color: 'bg-blue-50 border-blue-300 text-blue-800' },
    { id: 'terminal', label: t('posTerminal'), icon: Smartphone, desc: t('posTerminalDesc'), color: 'bg-purple-50 border-purple-300 text-purple-800' },
  ];

  const order = getOrderById(id);
  const [selectedMethod, setSelectedMethod] = useState('cash');
  const [isPaying, setIsPaying] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmWhite">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-charcoal">Buyurtma topilmadi</h2>
          <button
            onClick={() => navigate('/waiter')}
            className="px-6 py-2.5 bg-brand-500 text-white font-bold rounded-full"
          >
            Orqaga
          </button>
        </div>
      </div>
    );
  }

  const handlePay = async () => {
    setIsPaying(true);
    await new Promise(r => setTimeout(r, 1500));

    confetti({
      particleCount: 120,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#F36F21', '#22c55e', '#3b82f6', '#f59e0b']
    });

    updateOrderStatus(order.id, 'Delivered');
    setIsPaying(false);
    setIsPaid(true);
  };

  if (isPaid) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warmWhite p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="max-w-md w-full bg-white rounded-3xl p-8 text-center space-y-6 shadow-2xl border border-orange-100"
        >
          <div className="w-24 h-24 rounded-full bg-emerald-100 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-black text-3xl text-charcoal">
              {t('paymentReceivedSuccess')}
            </h2>
            <p className="text-sm text-gray-500">
              {t('paymentSub')} #{order.id} — {order.customer.name}
            </p>
            <p className="text-3xl sm:text-4xl font-black text-brand-500 mt-4">
              {formatPrice(order.total)}
            </p>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <p className="font-bold text-charcoal text-sm">{t('howWasFood')}</p>
            <div className="flex items-center justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-125"
                >
                  <Star
                    className={`w-9 h-9 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-bold text-amber-500"
              >
                {rating === 5 ? '⭐ Ajoyib!' : rating === 4 ? '😊 Yaxshi!' : rating === 3 ? '😐 Menga keldi' : rating < 3 ? '😕 Yaxshilanishi kerak' : ''}
              </motion.p>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate(`/order-confirmation/${order.id}`)}
              className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-bold rounded-2xl transition-all"
            >
              Buyurtma holatini ko‘rish
            </button>
            <button
              onClick={() => navigate('/menu')}
              className="w-full py-3 border border-orange-200 text-charcoal hover:bg-orange-50 font-bold rounded-2xl transition-all text-sm"
            >
              {t('backToMenuBtn')}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warmWhite flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-brand-500 mx-auto flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Receipt className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-display font-black text-3xl text-charcoal">
            {t('paymentTitle')}
          </h1>
          <p className="text-sm text-gray-500">
            {t('paymentSub')} <strong className="text-brand-600 font-mono">#{order.id}</strong> — {order.customer.name}
          </p>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-soft p-5 space-y-4">
          <div className="flex items-center gap-2 border-b border-orange-50 pb-3">
            <UtensilsCrossed className="w-5 h-5 text-brand-500" />
            <h3 className="font-bold text-charcoal">{t('orderContent')}</h3>
          </div>

          <div className="space-y-2">
            {order.items.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-black text-brand-600 w-7">{item.quantity}×</span>
                  <div>
                    <p className="font-bold text-charcoal">{item.name}</p>
                    {item.size && (
                      <p className="text-xs text-gray-400">{item.size.label} • {item.crust?.label}</p>
                    )}
                  </div>
                </div>
                <span className="font-bold">{formatPrice(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-3 border-t border-gray-100 space-y-2 text-xs text-gray-500">
            <div className="flex justify-between">
              <span>Jami (subtotal)</span>
              <span className="font-bold text-charcoal">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Chegirma</span>
                <span>-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-orange-100 flex justify-between items-center">
              <span className="font-display font-bold text-base text-charcoal">To'lash kerak</span>
              <span className="font-display font-black text-2xl text-brand-500">
                {formatPrice(order.total)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-white rounded-3xl border border-orange-100 shadow-soft p-5 space-y-4">
          <h3 className="font-bold text-charcoal flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-brand-500" />
            {t('choosePaymentMethod')}
          </h3>

          <div className="grid grid-cols-1 gap-3">
            {PAYMENT_METHODS.map(({ id: mid, label, icon: Icon, desc, color }) => (
              <button
                key={mid}
                onClick={() => setSelectedMethod(mid)}
                className={`p-4 rounded-2xl border-2 flex items-center gap-4 text-left transition-all ${
                  selectedMethod === mid
                    ? `${color} ring-2 ring-offset-1 ring-brand-400`
                    : 'bg-gray-50 border-gray-200 hover:border-orange-200'
                }`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  selectedMethod === mid ? 'bg-white/70' : 'bg-white'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-sm text-charcoal">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                {selectedMethod === mid && (
                  <CheckCircle2 className="w-5 h-5 ml-auto text-brand-500 shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pay Button */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handlePay}
          disabled={isPaying}
          className="w-full py-5 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-black text-lg rounded-3xl shadow-xl shadow-brand-500/30 flex items-center justify-center gap-3 transition-all disabled:opacity-75"
        >
          {isPaying ? (
            <>
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              {t('payingInProgress')}
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" />
              {formatPrice(order.total)} {t('paySubmitBtn')}
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </motion.button>

        <button
          onClick={() => navigate('/waiter')}
          className="w-full py-3 text-sm font-bold text-gray-500 hover:text-charcoal transition-colors"
        >
          ← Orqaga qaytish
        </button>

      </div>
    </div>
  );
}

