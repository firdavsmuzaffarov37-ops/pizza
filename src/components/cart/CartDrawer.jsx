import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles,
  Tag
} from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';

export default function CartDrawer() {
  const { t, formatPrice } = useLanguage();
  const { 
    items, 
    isDrawerOpen, 
    setIsDrawerOpen, 
    updateQuantity, 
    removeFromCart, 
    subtotal, 
    deliveryFee, 
    discount, 
    total,
    appliedPromo 
  } = useCart();
  
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    setIsDrawerOpen(false);
    navigate('/checkout');
  };

  const handleViewCartClick = () => {
    setIsDrawerOpen(false);
    navigate('/cart');
  };

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsDrawerOpen(false)}
            className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="w-screen max-w-md bg-warmWhite shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="p-5 border-b border-orange-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-lg text-charcoal">{t('yourOrder')}</h3>
                    <p className="text-xs text-charcoal-muted">
                      {items.length === 0 ? t('emptyBasket') : `${items.length} ${t('itemsSelected')}`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full text-charcoal-muted hover:text-charcoal hover:bg-orange-50 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free delivery progress bar */}
              <div className="bg-orange-50 px-5 py-2.5 border-b border-orange-100">
                {subtotal >= 150000 ? (
                  <p className="text-xs font-semibold text-emerald-700 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-500" />
                    {t('freeDeliveryUnlocked')}
                  </p>
                ) : (
                  <div>
                    <div className="flex justify-between text-xs font-medium text-brand-800 mb-1">
                      <span>+{formatPrice(150000 - subtotal)} {t('addMoreForFreeDelivery')}</span>
                      <span>{Math.min(100, Math.round((subtotal / 150000) * 100))}%</span>
                    </div>
                    <div className="w-full bg-orange-200/60 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-brand-500 h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / 150000) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Item List */}
              <div className="flex-1 overflow-y-auto p-5 space-y-4">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                    <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-4xl shadow-inner">
                      🍕
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-charcoal text-lg">{t('cartHungry')}</h4>
                      <p className="text-sm text-charcoal-muted mt-1 max-w-xs">
                        {t('cartHungryDesc')}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setIsDrawerOpen(false);
                        navigate('/menu');
                      }}
                      className="px-6 py-2.5 bg-brand-500 text-white rounded-full font-bold text-sm shadow-md shadow-brand-500/25 hover:bg-brand-600 transition-colors"
                    >
                      {t('browseMenuBtn')}
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div
                      layout
                      key={item.cartKey}
                      className="p-3.5 bg-white rounded-2xl border border-orange-100/80 shadow-sm flex gap-3 relative group"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-18 h-18 rounded-xl object-cover shrink-0 w-20 h-20"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="font-bold text-sm text-charcoal truncate">{item.name}</h4>
                          <button
                            onClick={() => removeFromCart(item.cartKey)}
                            className="text-gray-400 hover:text-rose-500 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.size && (
                          <p className="text-xs text-charcoal-muted mt-0.5">
                            Size: <span className="font-semibold text-charcoal">{item.size.label}</span>
                            {item.crust && ` • ${item.crust.label}`}
                          </p>
                        )}

                        {item.extraToppings && item.extraToppings.length > 0 && (
                          <p className="text-[11px] text-brand-700 mt-0.5 truncate">
                            +{item.extraToppings.map((t) => t.name).join(', ')}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-bold text-sm text-brand-600">
                            {formatPrice(item.unitPrice * item.quantity)}
                          </span>

                          {/* Quantity stepper */}
                          <div className="flex items-center gap-2 bg-orange-50/70 border border-orange-100 rounded-full px-2 py-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                              className="text-charcoal hover:text-brand-600 p-0.5 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-charcoal w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                              className="text-charcoal hover:text-brand-600 p-0.5 transition-colors"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Footer Summary & Checkout */}
              {items.length > 0 && (
                <div className="p-5 bg-white border-t border-orange-100 shadow-lg space-y-3">
                  {appliedPromo && (
                    <div className="flex items-center justify-between text-xs text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100 font-semibold">
                      <span className="flex items-center gap-1">
                        <Tag className="w-3.5 h-3.5" />
                        Code: {appliedPromo.code}
                      </span>
                      <span>-{formatPrice(discount)}</span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-charcoal-muted">
                    <div className="flex justify-between">
                      <span>{t('subtotal')}</span>
                      <span className="font-semibold text-charcoal">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('deliveryFeeLabel')}</span>
                      <span className="font-semibold text-charcoal">
                        {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">{t('freeText')}</span> : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>{t('discountLabel')}</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-extrabold text-charcoal pt-2 border-t border-gray-100">
                      <span>{t('totalLabel')}</span>
                      <span className="text-brand-600 font-display">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button
                      onClick={handleViewCartClick}
                      className="w-full py-3 px-4 border border-orange-200 text-charcoal hover:bg-orange-50 text-sm font-bold rounded-xl transition-colors"
                    >
                      {t('viewCart')}
                    </button>
                    <button
                      onClick={handleCheckoutClick}
                      className="w-full py-3 px-4 bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold rounded-xl shadow-md shadow-brand-500/25 flex items-center justify-center gap-1.5 transition-all"
                    >
                      <span>{t('checkoutBtn')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

