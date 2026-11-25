import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Sparkles, 
  ArrowLeft,
  Check,
  Flame
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/pizzas';

export default function CartPage() {
  const { t, formatPrice } = useLanguage();
  const { 
    items, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    subtotal, 
    deliveryFee, 
    tax, 
    discount, 
    total, 
    appliedPromo, 
    applyPromoCode, 
    removePromoCode, 
    promoError,
    addToCart
  } = useCart();

  const navigate = useNavigate();
  const [promoInput, setPromoInput] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.success) {
      setPromoSuccessMsg(res.message);
      setTimeout(() => setPromoSuccessMsg(''), 3000);
    }
  };

  // Upsells: Drinks or Desserts not already in cart
  const cartProductIds = items.map((i) => i.productId);
  const upsells = PRODUCTS.filter(
    (p) => (p.category === 'drinks' || p.category === 'desserts') && !cartProductIds.includes(p.id)
  ).slice(0, 3);

  if (items.length === 0) {
    return (
      <div className="py-20 bg-warmWhite min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center px-4 space-y-5">
          <div className="w-24 h-24 rounded-full bg-orange-100/70 mx-auto flex items-center justify-center text-5xl shadow-inner">
            🍕
          </div>
          <h2 className="font-display font-extrabold text-3xl text-charcoal">
            {t('emptyCartTitle')}
          </h2>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {t('emptyCartDesc')}
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-full shadow-lg shadow-brand-500/25 transition-all"
          >
            <span>{t('browseMenuBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-orange-100 pb-6">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
              {t('shoppingCart')}
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              {t('cartReviewSubtitle')}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={clearCart}
              className="text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
            >
              {t('clearCart')}
            </button>
            <Link
              to="/menu"
              className="px-4 py-2 rounded-full border border-orange-200 text-charcoal hover:bg-orange-50 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>{t('continueShopping')}</span>
            </Link>
          </div>
        </div>

        {/* Cart Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Cart items */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Free shipping progress */}
            <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200/70">
              {subtotal >= 30 ? (
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                  <Sparkles className="w-4 h-4 text-emerald-600" />
                  <span>Congrats! You get <strong>FREE Express Delivery</strong> on this order.</span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-bold text-brand-800">
                    <span>Bepul yetkazib berish uchun yana {formatPrice(Math.max(0, 150000 - subtotal))} buyurtma bering</span>
                    <span>{formatPrice(subtotal)} / {formatPrice(150000)}</span>
                  </div>
                  <div className="w-full bg-orange-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-brand-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (subtotal / 150000) * 100)}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Items list */}
            {items.map((item) => (
              <motion.div
                layout
                key={item.cartKey}
                className="p-5 bg-white rounded-3xl border border-orange-100 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover shrink-0 shadow-sm"
                  />
                  <div className="min-w-0">
                    <h3 className="font-display font-bold text-base text-charcoal">
                      {item.name}
                    </h3>
                    
                    {item.size && (
                      <p className="text-xs text-charcoal-muted mt-0.5">
                        Size: <span className="font-semibold text-charcoal">{item.size.label}</span>
                        {item.crust && ` • ${item.crust.label}`}
                      </p>
                    )}

                    {item.extraToppings && item.extraToppings.length > 0 && (
                      <p className="text-[11px] text-brand-700 mt-1">
                        Toppings: {item.extraToppings.map((t) => t.name).join(', ')}
                      </p>
                    )}

                    {item.customNote && (
                      <p className="text-[11px] text-charcoal-muted italic mt-0.5">
                        Note: "{item.customNote}"
                      </p>
                    )}

                    <span className="text-xs font-bold text-brand-600 block mt-1.5">
                      {formatPrice(item.unitPrice)}
                    </span>
                  </div>
                </div>

                {/* Right controls */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Stepper */}
                  <div className="flex items-center bg-orange-50 border border-orange-100 rounded-full px-2 py-1">
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}
                      className="p-1 text-charcoal hover:text-brand-600"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center font-bold text-xs text-charcoal">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}
                      className="p-1 text-charcoal hover:text-brand-600"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right min-w-[70px]">
                    <span className="font-display font-extrabold text-base text-charcoal">
                      {formatPrice(item.unitPrice * item.quantity)}
                    </span>
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.cartKey)}
                    className="p-2 text-gray-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}

            {/* Upsell treats section */}
            {upsells.length > 0 && (
              <div className="pt-6 space-y-3">
                <h4 className="font-display font-bold text-sm text-charcoal flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  Complete Your Feast With Drinks & Desserts
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {upsells.map((extra) => (
                    <div
                      key={extra.id}
                      className="p-3 bg-white rounded-2xl border border-orange-100 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <img
                        src={extra.image}
                        alt={extra.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold text-charcoal truncate">{extra.name}</p>
                        <p className="text-xs font-bold text-brand-600">{formatPrice(extra.price)}</p>
                      </div>
                      <button
                        onClick={() => addToCart(extra, { quantity: 1 })}
                        className="px-2.5 py-1.5 bg-orange-100 hover:bg-brand-500 hover:text-white text-brand-700 font-bold text-xs rounded-lg transition-colors"
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Right Column: Order Summary & Checkout Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft-lg space-y-5">
              <h2 className="font-display font-extrabold text-xl text-charcoal">
                {t('orderSummary')}
              </h2>

              {/* Promo code form */}
              <div>
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder={t('promoPlaceholder')}
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs font-semibold uppercase tracking-wider focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 bg-charcoal text-white rounded-xl text-xs font-bold hover:bg-black transition-colors"
                  >
                    {t('applyPromoBtn')}
                  </button>
                </form>

                {/* Promo status messages */}
                {promoError && (
                  <p className="text-[11px] text-rose-600 font-semibold mt-1.5">{promoError}</p>
                )}
                {promoSuccessMsg && (
                  <p className="text-[11px] text-emerald-600 font-semibold mt-1.5">{promoSuccessMsg}</p>
                )}
                {appliedPromo && (
                  <div className="mt-2 p-2 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center justify-between text-xs font-bold text-emerald-800">
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      {appliedPromo.code}: {appliedPromo.description}
                    </span>
                    <button
                      onClick={removePromoCode}
                      className="text-rose-600 hover:text-rose-800 text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Summary line items */}
              <div className="space-y-2.5 text-xs text-charcoal-muted pt-2 border-t border-orange-50">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-bold text-charcoal">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between">
                  <span>{t('deliveryFeeLabel')}</span>
                  <span>
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase">{t('freeText')}</span>
                    ) : (
                      formatPrice(deliveryFee)
                    )}
                  </span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>{t('discountLabel')}</span>
                    <span>-{formatPrice(discount)}</span>
                  </div>
                )}

                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-charcoal">{t('totalLabel')}</span>
                  <span className="font-display font-black text-2xl text-brand-600">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="text-center">
                <p className="text-[11px] text-gray-400">
                  🔒 Encrypted 256-bit SSL Checkout Guarantee
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

