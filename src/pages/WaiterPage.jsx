import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  ChefHat,
  ArrowRight,
  Sparkles,
  Receipt,
  RefreshCw,
  Bell
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

function WaiterOrderCard({ order, onDeliver, onRequestPayment }) {
  const { t, formatPrice } = useLanguage();
  const isReady = order.status === 'Ready';
  const isDelivered = order.status === 'Out for Delivery' || order.status === 'Delivered';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`rounded-3xl border-2 p-5 space-y-4 ${
        isReady
          ? 'bg-emerald-50 border-emerald-400'
          : isDelivered
          ? 'bg-blue-50 border-blue-300'
          : 'bg-gray-50 border-gray-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full ${
              isReady ? 'bg-emerald-500 animate-pulse' : isDelivered ? 'bg-blue-500' : 'bg-gray-400'
            }`} />
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${
              isReady ? 'text-emerald-700' : isDelivered ? 'text-blue-700' : 'text-gray-500'
            }`}>
              {isReady ? `✅ ${t('readyBadge')}` : isDelivered ? `🚶 ${t('deliveringCountLabel')}` : order.status}
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-charcoal">
            #{order.id}
          </h3>
        </div>
        <div className="text-right">
          <p className="font-bold text-charcoal text-sm">{order.customer.name}</p>
          <p className="text-xs text-gray-500">{order.customer.phone}</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white rounded-2xl p-3 space-y-1.5">
        <p className="text-[11px] font-bold text-gray-500 uppercase mb-2">Ovqatlar:</p>
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="font-black text-brand-600 w-5">{item.quantity}×</span>
            <div>
              <span className="font-bold text-charcoal">{item.name}</span>
              {item.size && (
                <span className="text-gray-400"> · {item.size.label}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500 flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {new Date(order.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="font-black text-lg text-charcoal">{formatPrice(order.total)}</span>
      </div>

      {/* Actions */}
      {isReady && (
        <div className="space-y-2">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onDeliver(order.id)}
            className="w-full py-3 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all"
          >
            <UtensilsCrossed className="w-4 h-4" />
            {t('deliverToTableBtn')}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </div>
      )}

      {order.status === 'Out for Delivery' && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onRequestPayment(order.id)}
          className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all"
        >
          <Receipt className="w-4 h-4" />
          {t('requestPaymentBtn')}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      )}

      {(order.status === 'Delivered' || order.status === 'Paid') && (
        <div className="w-full py-3 bg-gray-100 rounded-2xl text-center text-sm font-bold text-gray-500">
          {t('paidAndClosedBtn')}
        </div>
      )}
    </motion.div>
  );
}

export default function WaiterPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Waiter sees: Ready, Out for Delivery, Delivered, Paid
  const waiterOrders = orders.filter(o =>
    ['Ready', 'Out for Delivery', 'Delivered', 'Paid'].includes(o.status)
  );

  const readyCount = orders.filter(o => o.status === 'Ready').length;
  const inProgressCount = orders.filter(o => o.status === 'Out for Delivery').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered' || o.status === 'Paid').length;

  const handleDeliver = (orderId) => {
    updateOrderStatus(orderId, 'Out for Delivery');
  };

  const handleRequestPayment = (orderId) => {
    navigate(`/payment/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-950 to-gray-950 text-white p-4 sm:p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/40">
              <UtensilsCrossed className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                {t('waiterTitle')}
              </h1>
              <p className="text-xs text-blue-300/80 font-medium">{t('waiterSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/chef-kiosk')}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              <ChefHat className="w-4 h-4" />
              {t('waiterChefKioskBtn')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 bg-blue-900 hover:bg-blue-800 rounded-xl transition-colors"
            >
              <RefreshCw className="w-4 h-4 text-blue-300" />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-black text-emerald-400">{readyCount}</p>
              {readyCount > 0 && <Bell className="w-5 h-5 text-emerald-400 animate-bounce" />}
            </div>
            <p className="text-xs text-emerald-300/80 font-bold uppercase mt-1">{t('readyCountLabel')}</p>
          </div>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-blue-400">{inProgressCount}</p>
            <p className="text-xs text-blue-300/80 font-bold uppercase mt-1">{t('deliveringCountLabel')}</p>
          </div>
          <div className="bg-gray-500/10 border border-gray-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-gray-400">{deliveredCount}</p>
            <p className="text-xs text-gray-300/80 font-bold uppercase mt-1">{t('deliveredCountLabel')}</p>
          </div>
        </div>

        {/* Priority alert */}
        {readyCount > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl px-5 py-3 text-emerald-300 font-bold text-sm"
          >
            <Sparkles className="w-5 h-5 text-emerald-400" />
            {readyCount} {t('readyAlertPrefix')}
          </motion.div>
        )}

        {/* Orders */}
        {waiterOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 space-y-4">
            <div className="w-20 h-20 rounded-full bg-blue-900/50 flex items-center justify-center text-4xl">
              🍽️
            </div>
            <h3 className="font-bold text-xl text-gray-300">{t('noReadyOrdersWaiter')}</h3>
            <p className="text-sm text-gray-500">{t('noReadyOrdersWaiterSub')}</p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {waiterOrders.map((order) => (
                <WaiterOrderCard
                  key={order.id}
                  order={order}
                  onDeliver={handleDeliver}
                  onRequestPayment={handleRequestPayment}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}

