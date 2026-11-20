import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Plus, Flame, Sparkles, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();

  const isFavorite = user?.favorites?.includes(product.id);

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // If it's a pizza, default size is medium
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

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="group bg-white rounded-3xl p-4 border border-orange-100 shadow-soft hover:shadow-soft-lg flex flex-col justify-between relative overflow-hidden transition-all duration-300"
    >
      {/* Badges */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-1.5">
        {product.badge && (
          <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide text-white bg-gradient-to-r from-brand-500 to-amber-500 shadow-sm backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        {product.isSpicy && (
          <span className="w-fit px-2 py-0.5 rounded-full text-[10px] font-bold text-red-700 bg-red-100 border border-red-200 flex items-center gap-0.5">
            <Flame className="w-3 h-3 fill-red-500 text-red-500" /> Hot
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
              <span>{product.prepTime}</span>
            </div>
          </div>

          <Link to={`/product/${product.id}`} className="group-hover:text-brand-600 transition-colors">
            <h3 className="font-display font-bold text-lg text-charcoal leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          <p className="text-xs text-charcoal-muted mt-1.5 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 mt-3 border-t border-orange-50 flex items-center justify-between">
          <div>
            <span className="text-xs text-charcoal-muted block font-medium">Starts from</span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display font-extrabold text-xl text-charcoal">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/product/${product.id}`}
              className="px-3 py-2 text-xs font-bold text-brand-600 bg-brand-50 hover:bg-brand-100 rounded-xl transition-colors"
            >
              Customize
            </Link>

            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={handleQuickAdd}
              className="w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-600 text-white flex items-center justify-center shadow-md shadow-brand-500/25 transition-all"
              aria-label="Add to cart"
            >
              <Plus className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

