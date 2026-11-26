import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChefHat, 
  Clock, 
  Flame, 
  CheckCircle2, 
  Bell,
  Timer,
  UtensilsCrossed,
  AlertCircle,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

const STATUS_COLORS = {
  'Pending': { bg: 'bg-yellow-50', border: 'border-yellow-300', text: 'text-yellow-800', badge: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-400' },
  'Baking': { bg: 'bg-orange-50', border: 'border-orange-400', text: 'text-orange-800', badge: 'bg-orange-100 text-brand-700', dot: 'bg-brand-500' },
  'Quality Checked': { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
  'Ready': { bg: 'bg-emerald-50', border: 'border-emerald-400', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
};

function OrderCard({ order, onStatusUpdate }) {
  const { t, formatPrice } = useLanguage();
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    const start = new Date(order.createdAt).getTime();
    const interval = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setTimer(elapsed);
    }, 1000);
    return () => clearInterval(interval);
  }, [order.createdAt]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isUrgent = timer > 20 * 60; // 20 minutes
  const colors = STATUS_COLORS[order.status] || STATUS_COLORS['Baking'];

  const getNextAction = () => {
    switch (order.status) {
      case 'Pending': return { label: t('startBakingBtn'), next: 'Baking' };
      case 'Baking': return { label: t('readyInspectBtn'), next: 'Quality Checked' };
      case 'Quality Checked': return { label: t('giveToWaiterBtn'), next: 'Ready' };
      default: return null;
    }
  };

  const nextAction = getNextAction();

  if (['Out for Delivery', 'Delivered', 'Cancelled', 'Ready'].includes(order.status) && order.status !== 'Ready') {
    return null;
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`${colors.bg} ${colors.border} border-2 rounded-3xl p-5 space-y-4 relative overflow-hidden ${
        isUrgent ? 'ring-2 ring-red-400 ring-offset-2' : ''
      }`}
    >
      {/* Urgent badge */}
      {isUrgent && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full animate-pulse">
          <AlertCircle className="w-3 h-3" />
          {t('urgentBadge')}
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2.5 h-2.5 rounded-full ${colors.dot} ${order.status === 'Baking' ? 'animate-pulse' : ''}`} />
            <span className={`text-[11px] font-extrabold uppercase tracking-wider ${colors.text}`}>
              {order.status === 'Pending' ? 'Yangi Buyurtma' :
               order.status === 'Baking' ? 'Pishirilmoqda...' :
               order.status === 'Quality Checked' ? 'Tekshirildi' :
               order.status === 'Ready' ? 'Tayyor — Ofisant Kutmoqda' : order.status}
            </span>
          </div>
          <h3 className="font-display font-black text-2xl text-charcoal">
            #{order.id}
          </h3>
          <p className="text-xs text-gray-600 font-medium mt-0.5">
            {order.customer.name}
          </p>
        </div>

        <div className="text-right shrink-0">
          <div className={`flex items-center gap-1.5 text-sm font-mono font-bold px-3 py-1.5 rounded-xl ${
            isUrgent ? 'bg-red-100 text-red-700' : 'bg-white/70 text-charcoal'
          }`}>
            <Timer className="w-4 h-4" />
            {formatTime(timer)}
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{t('waitTime')}</p>
        </div>
      </div>

      {/* Items list */}
      <div className="bg-white/70 rounded-2xl p-3 space-y-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 uppercase mb-2">
          <UtensilsCrossed className="w-3.5 h-3.5" />
          {t('orderContent')}
        </div>
        {order.items.map((item, i) => (
          <div key={i} className="flex items-start justify-between text-xs">
            <div className="flex items-start gap-2">
              <span className="font-black text-brand-600 text-sm w-6 shrink-0">{item.quantity}×</span>
              <div>
                <p className="font-bold text-charcoal leading-tight">{item.name}</p>
                {item.size && (
                  <p className="text-[10px] text-gray-500">
                    {item.size.label} • {item.crust?.label}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

        {order.orderNotes && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-[10px] text-orange-700 font-semibold">
              {t('orderNotePrefix')} {order.orderNotes}
            </p>
          </div>
        )}
      </div>

      {/* Footer info */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {new Date(order.createdAt).toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' })}
        </span>
        <span className="font-bold text-charcoal">{formatPrice(order.total)}</span>
      </div>

      {/* Action button */}
      {nextAction && (
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => onStatusUpdate(order.id, nextAction.next)}
          className={`w-full py-3 rounded-2xl font-bold text-sm transition-all ${
            order.status === 'Pending'
              ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/30'
              : order.status === 'Baking'
              ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30'
          }`}
        >
          {nextAction.label}
        </motion.button>
      )}

      {order.status === 'Ready' && (
        <div className="w-full py-3 rounded-2xl font-bold text-sm text-center bg-emerald-100 text-emerald-700 border-2 border-emerald-300">
          {t('waiterCarrying')}
        </div>
      )}
    </motion.div>
  );
}

export default function ChefKioskPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [lastCount, setLastCount] = useState(0);
  const [newOrderAlert, setNewOrderAlert] = useState(false);

  // Active orders for chef: Pending, Baking, Quality Checked, Ready
  const activeOrders = orders.filter(o => 
    ['Pending', 'Baking', 'Quality Checked', 'Ready'].includes(o.status)
  );

  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const bakingCount = orders.filter(o => o.status === 'Baking').length;
  const readyCount = orders.filter(o => o.status === 'Ready').length;

  useEffect(() => {
    if (activeOrders.length > lastCount) {
      setNewOrderAlert(true);
      setTimeout(() => setNewOrderAlert(false), 3000);
    }
    setLastCount(activeOrders.length);
  }, [activeOrders.length]);

  return (
    <div className="min-h-screen bg-gray-950 text-white p-4 sm:p-6">
      
      {/* New order alert */}
      <AnimatePresence>
        {newOrderAlert && (
          <motion.div
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 bg-brand-500 text-white px-6 py-3 rounded-2xl shadow-2xl font-bold text-sm"
          >
            <Bell className="w-5 h-5 animate-bounce" />
            {t('newOrderAlert')}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500 flex items-center justify-center shadow-lg shadow-brand-500/40">
              <ChefHat className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                {t('chefKioskTitle')}
              </h1>
              <p className="text-xs text-gray-400 font-medium">{t('chefKioskSub')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/waiter')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center gap-2"
            >
              {t('waiterPanelBtn')}
            </button>
            <button
              onClick={() => window.location.reload()}
              className="p-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors"
              title={t('reloadBtn')}
            >
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 text-center">
            <p className="text-3xl font-black text-yellow-400">{pendingCount}</p>
            <p className="text-xs text-yellow-300/80 font-bold uppercase mt-1">{t('newOrdersBadge')}</p>
          </div>
          <div className="bg-brand-500/10 border border-brand-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-black text-brand-400">{bakingCount}</p>
              {bakingCount > 0 && <Flame className="w-5 h-5 text-brand-400 animate-pulse" />}
            </div>
            <p className="text-xs text-brand-300/80 font-bold uppercase mt-1">{t('bakingBadge')}</p>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2">
              <p className="text-3xl font-black text-emerald-400">{readyCount}</p>
              {readyCount > 0 && <Sparkles className="w-5 h-5 text-emerald-400" />}
            </div>
            <p className="text-xs text-emerald-300/80 font-bold uppercase mt-1">{t('readyBadge')}</p>
          </div>
        </div>

        {/* Orders Grid */}
        {activeOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 space-y-4"
          >
            <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center text-4xl">
              😴
            </div>
            <h3 className="font-bold text-xl text-gray-300">{t('noOrdersChef')}</h3>
            <p className="text-sm text-gray-500">{t('noOrdersChefSub')}</p>
          </motion.div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {activeOrders.map((order) => (
                <OrderCard
                  key={order.id}
                  order={order}
                  onStatusUpdate={updateOrderStatus}
                />
              ))}
            </div>
          </AnimatePresence>
        )}

      </div>
    </div>
  );
}

