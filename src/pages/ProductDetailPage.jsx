import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star, 
  Clock, 
  Flame, 
  Plus, 
  Minus, 
  Check, 
  ArrowLeft, 
  ShoppingBag, 
  Heart,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { PRODUCTS, PIZZA_SIZES, PIZZA_CRUSTS, EXTRA_TOPPINGS } from '../data/pizzas';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from '../components/menu/ProductCard';

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user, toggleFavorite } = useAuth();

  const product = PRODUCTS.find((p) => p.id === id);

  // Fallback if product not found
  if (!product) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-charcoal">Product Not Found</h2>
        <p className="text-sm text-charcoal-muted">The delicious item you are looking for is currently unavailable.</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-brand-500 text-white font-bold rounded-full">
          Back to Menu
        </Link>
      </div>
    );
  }

  const isPizza = product.subCategory === 'pizza';

  // Customization states
  const [selectedSize, setSelectedSize] = useState(PIZZA_SIZES[1]); // Medium 30 cm default
  const [selectedCrust, setSelectedCrust] = useState(PIZZA_CRUSTS[0]); // Classic
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [customNote, setCustomNote] = useState('');
  const [showAddedToast, setShowAddedToast] = useState(false);

  // Toggle topping
  const handleToppingToggle = (topping) => {
    if (selectedToppings.some((t) => t.id === topping.id)) {
      setSelectedToppings(selectedToppings.filter((t) => t.id !== topping.id));
    } else {
      setSelectedToppings([...selectedToppings, topping]);
    }
  };

  // Dynamic price calculation
  const toppingsTotal = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const calculatedUnitPrice = isPizza
    ? (product.price * selectedSize.multiplier) + selectedCrust.extraPrice + toppingsTotal
    : product.price;

  const totalPrice = (calculatedUnitPrice * quantity).toFixed(2);

  const handleAddToCart = () => {
    addToCart(product, {
      size: isPizza ? selectedSize : null,
      crust: isPizza ? selectedCrust : null,
      extraToppings: selectedToppings,
      quantity,
      customNote
    });

    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 2500);
  };

  const isFavorite = user?.favorites?.includes(product.id);

  // Related products
  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3);

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Breadcrumb / Back button */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-xs font-bold text-charcoal hover:text-brand-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>

          <button
            onClick={() => {
              if (!user) navigate('/login');
              else toggleFavorite(product.id);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-orange-100 text-xs font-bold text-charcoal hover:border-brand-300 shadow-sm transition-all"
          >
            <Heart className={`w-4 h-4 ${isFavorite ? 'fill-brand-500 text-brand-500' : 'text-gray-400'}`} />
            <span>{isFavorite ? 'In Wishlist' : 'Add to Favorites'}</span>
          </button>
        </div>

        {/* Product Customizer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 space-y-6">
            <div className="relative w-full aspect-square max-h-[500px] rounded-3xl overflow-hidden bg-white border border-orange-100 shadow-soft p-4 flex items-center justify-center">
              
              {/* Product Badge */}
              {product.badge && (
                <div className="absolute top-6 left-6 z-10">
                  <span className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r from-brand-500 to-amber-500 shadow-md">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Pizza Plate / Image */}
              <motion.div
                key={isPizza ? selectedSize.id : product.id}
                initial={{ scale: 0.9, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 200 }}
                className="w-full h-full rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
            </div>

            {/* Ingredients highlights */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="p-5 bg-white rounded-2xl border border-orange-100 shadow-sm space-y-3">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-charcoal">
                  Crafted With Fresh Ingredients
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-orange-50 text-charcoal border border-orange-100/80"
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Customization & Actions */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-3 text-xs text-charcoal-muted mb-2">
                <span className="flex items-center gap-1 font-bold text-amber-500">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  {product.rating} ({product.reviewsCount} reviews)
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {product.prepTime}
                </span>
                <span>•</span>
                <span>{product.calories}</span>
              </div>

              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-charcoal">
                {product.name}
              </h1>

              <p className="text-sm text-charcoal-muted mt-3 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pizza Customization Sections (if Pizza) */}
            {isPizza && (
              <div className="space-y-6 pt-4 border-t border-orange-100">
                
                {/* 1. Size Selection */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="font-display font-bold text-sm text-charcoal">
                      1. Select Pizza Size
                    </label>
                    <span className="text-xs text-brand-600 font-semibold">
                      {selectedSize.serves}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {PIZZA_SIZES.map((size) => {
                      const isSelected = selectedSize.id === size.id;
                      return (
                        <button
                          key={size.id}
                          onClick={() => setSelectedSize(size)}
                          className={`p-3.5 rounded-2xl border text-center transition-all ${
                            isSelected
                              ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-300/40 shadow-sm'
                              : 'bg-white border-orange-100 hover:border-brand-200'
                          }`}
                        >
                          <span className="block font-bold text-sm text-charcoal">
                            {size.label}
                          </span>
                          <span className="text-xs text-charcoal-muted block mt-0.5">
                            {size.sliceCount} Slices
                          </span>
                          <span className="text-[11px] font-semibold text-brand-600 block mt-1">
                            ${(product.price * size.multiplier).toFixed(2)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Crust Selection */}
                <div>
                  <label className="font-display font-bold text-sm text-charcoal block mb-3">
                    2. Choose Your Crust
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {PIZZA_CRUSTS.map((crust) => {
                      const isSelected = selectedCrust.id === crust.id;
                      return (
                        <button
                          key={crust.id}
                          onClick={() => setSelectedCrust(crust)}
                          className={`p-3 rounded-2xl border text-left transition-all flex items-start justify-between ${
                            isSelected
                              ? 'bg-brand-50 border-brand-500 ring-1 ring-brand-400 shadow-sm'
                              : 'bg-white border-orange-100 hover:border-brand-200'
                          }`}
                        >
                          <div>
                            <span className="block font-bold text-xs text-charcoal">
                              {crust.label}
                            </span>
                            <span className="text-[11px] text-charcoal-muted leading-tight block mt-0.5">
                              {crust.desc}
                            </span>
                          </div>
                          {crust.extraPrice > 0 && (
                            <span className="text-xs font-bold text-brand-600 shrink-0 ml-2">
                              +${crust.extraPrice.toFixed(2)}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Extra Toppings Checklist */}
                <div>
                  <label className="font-display font-bold text-sm text-charcoal block mb-3">
                    3. Add Extra Gourmet Toppings (Optional)
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
                    {EXTRA_TOPPINGS.map((topping) => {
                      const isSelected = selectedToppings.some((t) => t.id === topping.id);
                      return (
                        <div
                          key={topping.id}
                          onClick={() => handleToppingToggle(topping)}
                          className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-orange-50 border-brand-400 text-brand-900'
                              : 'bg-white border-orange-100 hover:bg-orange-50/50'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                              isSelected ? 'bg-brand-500 border-brand-500 text-white' : 'border-gray-300'
                            }`}>
                              {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span className="text-xs font-medium">{topping.name}</span>
                          </div>
                          <span className="text-xs font-bold text-brand-600">
                            +${topping.price.toFixed(2)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}

            {/* Special Instructions note */}
            <div>
              <label className="block text-xs font-bold text-charcoal mb-1">
                Special Order Notes (Optional)
              </label>
              <input
                type="text"
                placeholder="E.g. Extra crispy, slice into squares, sauce on side..."
                value={customNote}
                onChange={(e) => setCustomNote(e.target.value)}
                className="w-full px-4 py-2.5 bg-white border border-orange-100 rounded-xl text-xs focus:outline-none focus:border-brand-500"
              />
            </div>

            {/* Price & Quantity & Add to Cart Footer Bar */}
            <div className="pt-6 border-t border-orange-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs text-charcoal-muted block font-medium">Total Price</span>
                <span className="font-display font-black text-3xl text-brand-600">
                  ${totalPrice}
                </span>
              </div>

              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-white border border-orange-200 rounded-2xl p-1 shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 rounded-xl hover:bg-orange-50 text-charcoal"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm text-charcoal">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 rounded-xl hover:bg-orange-50 text-charcoal"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart CTA */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAddToCart}
                  className="flex-1 sm:flex-none px-8 py-3.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/30 flex items-center justify-center gap-2 transition-all"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Order • ${totalPrice}</span>
                </motion.button>
              </div>
            </div>

            {/* Notification Toast */}
            <AnimatePresence>
              {showAddedToast && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-bold flex items-center justify-between shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Added {product.name} to your cart!</span>
                  </div>
                  <Link to="/cart" className="text-emerald-900 underline font-extrabold">
                    View Cart
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="pt-12 border-t border-orange-100 space-y-6">
            <h3 className="font-display font-extrabold text-2xl text-charcoal">
              You Might Also Crave
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

