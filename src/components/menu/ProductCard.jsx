import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Clock, Plus, Flame, Sparkles, Heart, Utensils, X, CheckCircle2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user, toggleFavorite } = useAuth();
  const { placeOrder } = useOrders();
  const { t, formatPrice } = useLanguage();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const urlTable = searchParams.get('table');

  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(urlTable || '3-Stol');
  const [quantity, setQuantity] = useState(1);
  const [specialNote, setSpecialNote] = useState('');
  const [isOrdering, setIsOrdering] = useState(false);

  useEffect(() => {
    if (urlTable) {
      setSelectedTable(urlTable);
    }
  }, [urlTable]);

  const isFavorite = user?.favorites?.includes(product.id);

  const prodKey = product.id.replace(/-/g, '_');
  const localizedName = t(`prod_${prodKey}_name`) !== `prod_${prodKey}_name` ? t(`prod_${prodKey}_name`) : product.name;
  const localizedDesc = t(`prod_${prodKey}_desc`) !== `prod_${prodKey}_desc` ? t(`prod_${prodKey}_desc`) : product.description;
  const badgeKey = product.badge ? 'badge_' + product.badge.replace(/[^a-zA-Z0-9]/g, '') : null;
  const localizedBadge = badgeKey && t(badgeKey) !== badgeKey ? t(badgeKey) : product.badge;
  const localizedPrepTime = product.prepTime ? product.prepTime.replace(/mins?/gi, t('prepMinutes')) : '';

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const defaultOptions = product.subCategory === 'pizza'
      ? {
          size: { id: 'medium', label: '30 cm', multiplier: 1.0 },
          crust: { id: 'classic', label: 'Classic Hand-Tossed', extraPrice: 0 },
          quantity: 1
        }
      : { quantity: 1 };

    addToCart(product, defaultOptions);
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }
    toggleFavorite(product.id);
  };

  const handleOpenOrderModal = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOrderModalOpen(true);
  };

  const handleDirectOrder = async (e) => {
    e.preventDefault();
    setIsOrdering(true);

    try {
      await new Promise((r) => setTimeout(r, 600));

      const subtotal = product.price * quantity;
      const total = subtotal;

      const newOrder = placeOrder({
        customer: {
          name: user?.name || `Mijoz (${selectedTable})`,
          email: user?.email || 'mijoz@restoran.uz',
          phone: user?.phone || '+998 (90) 123-45-67',
          address: `${selectedTable} • Restoran zali`
        },
        items: [
          {
            name: product.name,
            quantity: quantity,
            size: { label: 'Standart porsiya' },
            crust: null,
            unitPrice: product.price,
            image: product.image
          }
        ],
        orderNotes: specialNote || `${selectedTable} mijoz buyurtmasi`,
        deliverySlot: `${selectedTable} (Zalda)`,
        paymentMethod: "Ovqatlangandan keyin to'lanadi",
        subtotal,
        deliveryFee: 0,
        discount: 0,
        tax,
        total
      });

      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 }
      });

      setOrderModalOpen(false);
      navigate(`/order-confirmation/${newOrder.id}`);
    } finally {
      setIsOrdering(false);
    }
  };

  return (
    <>
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="group bg-white rounded-3xl p-4 border border-orange-100 shadow-soft hover:shadow-soft-lg flex flex-col justify-between relative overflow-hidden transition-all duration-300"
      >
        {/* Badges */}
        <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-gradient-to-r from-brand-500 to-amber-500 shadow-sm backdrop-blur-sm">
              {localizedBadge}
            </span>
          )}
          {product.isSpicy && (
            <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 flex items-center gap-0.5">
              <Flame className="w-3 h-3 fill-red-500 text-red-500" /> {t('spicyTag') || 'Hot'}
            </span>
          )}
        </div>

        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          aria-label="Save to favorites"
          className="absolute top-6 right-6 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-orange-100 flex items-center justify-center text-gray-400 hover:text-brand-500 shadow-sm transition-transform active:scale-90"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-brand-500 text-brand-500' : ''
            }`}
          />
        </button>

        {/* Card Image Link */}
        <Link to={`/product/${product.id}`} className="block relative pt-2 pb-4 overflow-hidden">
          <div className="w-full h-48 sm:h-52 rounded-2xl overflow-hidden bg-orange-50/50 flex items-center justify-center">
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Card Content */}
        <div className="flex-1 flex flex-col justify-between pt-1">
          <div>
            {/* Metadata bar */}
            <div className="flex items-center justify-between text-xs text-charcoal-muted mb-1.5">
              <div className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>{localizedPrepTime}</span>
              </div>
            </div>

            <Link to={`/product/${product.id}`} className="group-hover:text-brand-600 transition-colors">
              <h3 className="font-display font-bold text-lg text-charcoal leading-snug line-clamp-1">
                {localizedName}
              </h3>
            </Link>

            <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
              {localizedDesc}
            </p>
          </div>

          {/* Price & Action Row */}
          <div className="pt-3 mt-3 border-t border-orange-50 space-y-2.5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] text-charcoal-muted block font-medium">{t('startsFrom')}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="font-display font-extrabold text-xl text-charcoal">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  to={`/product/${product.id}`}
                  className="px-2.5 py-1.5 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
                >
                  {t('details')}
                </Link>

                <motion.button
                  whileTap={{ scale: 0.92 }}
                  onClick={handleQuickAdd}
                  className="w-9 h-9 rounded-xl bg-orange-100 hover:bg-orange-200 text-brand-700 flex items-center justify-center transition-all"
                  title={t('addToCart')}
                >
                  <Plus className="w-4 h-4" />
                </motion.button>
              </div>
            </div>

            {/* Prominent "Buyurtma berish" button */}
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleOpenOrderModal}
              className="w-full py-2.5 px-4 bg-gradient-to-r from-brand-500 to-amber-500 hover:from-brand-600 hover:to-amber-600 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-brand-500/25 flex items-center justify-center gap-2 transition-all"
            >
              <Utensils className="w-4 h-4" />
              <span>{t('orderNow')}</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Quick Order Modal */}
      <AnimatePresence>
        {orderModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-orange-100 space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🍽️</span>
                  <h3 className="font-display font-black text-lg text-charcoal">
                    {t('orderFoodTitle')}
                  </h3>
                </div>
                <button
                  onClick={() => setOrderModalOpen(false)}
                  className="p-1.5 rounded-full text-gray-400 hover:text-charcoal hover:bg-gray-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Product preview */}
              <div className="flex items-center gap-3 bg-orange-50/70 p-3 rounded-2xl border border-orange-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-charcoal truncate">{localizedName}</h4>
                  <p className="text-xs text-brand-600 font-extrabold mt-0.5">
                    {formatPrice(product.price)}
                  </p>
                  <p className="text-[10px] text-gray-500 flex items-center gap-1 mt-0.5">
                    <Clock className="w-3 h-3" /> {t('prepTimePrefix')} {product.prepTime}
                  </p>
                </div>
              </div>

              {/* Table selection */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1.5">
                  {t('selectYourTable')}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['1-Stol', '2-Stol', '3-Stol', '4-Stol', '5-Stol', 'VIP-Xona'].map((tbl) => (
                    <button
                      key={tbl}
                      type="button"
                      onClick={() => setSelectedTable(tbl)}
                      className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                        selectedTable === tbl
                          ? 'bg-brand-500 text-white border-brand-500 shadow-sm'
                          : 'bg-white text-charcoal border-gray-200 hover:border-brand-300'
                      }`}
                    >
                      {tbl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-2xl">
                <span className="text-xs font-bold text-charcoal">{t('portionsCount')}</span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-xl bg-white border border-gray-200 text-charcoal font-black flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="font-black text-sm text-charcoal w-6 text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-xl bg-brand-500 text-white font-black flex items-center justify-center shadow hover:bg-brand-600"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Special instructions */}
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">
                  {t('chefNote')}
                </label>
                <input
                  type="text"
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  placeholder={t('notePlaceholder')}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-brand-500"
                />
              </div>

              {/* Order total */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-gray-500 block">{t('totalAmount')}</span>
                  <span className="font-display font-black text-xl text-brand-600">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
                <span className="text-[10px] text-gray-400 font-medium">
                  {t('payAfterEatingNotice')}
                </span>
              </div>

              {/* Confirm button */}
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={handleDirectOrder}
                disabled={isOrdering}
                className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isOrdering ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>{t('sendingToKitchen')}</span>
                  </div>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{t('confirmOrder')}</span>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}


