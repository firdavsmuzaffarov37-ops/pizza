import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  Flame, 
  Leaf, 
  X,
  ArrowUpDown
} from 'lucide-react';
import ProductCard from '../components/menu/ProductCard';
import { PRODUCTS, CATEGORIES } from '../data/pizzas';

export default function MenuPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const [searchQuery, setSearchQuery] = useState('');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [spicyOnly, setSpicyOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular'); // 'popular' | 'price-asc' | 'price-desc' | 'rating'

  const handleCategoryChange = (catId) => {
    if (catId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', catId);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (currentCategory !== 'all' && product.category !== currentCategory) {
        return false;
      }

      // Dietary filters
      if (vegetarianOnly && !product.isVegetarian) {
        return false;
      }
      if (spicyOnly && !product.isSpicy) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesDesc = product.description.toLowerCase().includes(query);
        const matchesIngredients = product.ingredients?.some((ing) =>
          ing.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesDesc && !matchesIngredients) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return b.reviewsCount - a.reviewsCount; // popular default
    });
  }, [currentCategory, searchQuery, vegetarianOnly, spicyOnly, sortBy]);

  const clearAllFilters = () => {
    setSearchQuery('');
    setVegetarianOnly(false);
    setSpicyOnly(false);
    setSortBy('popular');
    searchParams.delete('category');
    setSearchParams(searchParams);
  };

  const hasActiveFilters = searchQuery || vegetarianOnly || spicyOnly || currentCategory !== 'all' || sortBy !== 'popular';

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title & Hero Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            Handcrafted Menu
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-charcoal">
            Delicious Flavors, Made to Order
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted">
            Explore authentic stone-baked pizzas, family feast combos, hand-spun sodas and traditional Italian desserts.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-3xl border border-orange-100 shadow-soft space-y-4">
          
          {/* Top row: Search input & Sort dropdown */}
          <div className="flex flex-col md:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search pizzas, ingredients, burrata, combos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-10 py-3 bg-orange-50/50 rounded-2xl border border-orange-100 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-200 text-sm font-medium transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-charcoal"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Sort selector */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-3 bg-orange-50/50 rounded-2xl border border-orange-100 text-sm font-semibold text-charcoal shrink-0">
                <ArrowUpDown className="w-4 h-4 text-brand-500" />
                <span className="hidden sm:inline text-xs text-charcoal-muted">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent focus:outline-none text-xs font-bold cursor-pointer"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
          </div>

          {/* Middle row: Category pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = currentCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-md shadow-brand-500/25'
                      : 'bg-orange-50/60 text-charcoal hover:bg-orange-100 hover:text-brand-600'
                  }`}
                >
                  <span>
                    {cat.id === 'all' && '✨'}
                    {cat.id === 'signature' && '🔥'}
                    {cat.id === 'classic' && '🍕'}
                    {cat.id === 'spicy' && '🌶️'}
                    {cat.id === 'combos' && '🎁'}
                    {cat.id === 'drinks' && '🥤'}
                    {cat.id === 'desserts' && '🍰'}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom row: Dietary filter toggles & clear button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-orange-50 text-xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setVegetarianOnly(!vegetarianOnly)}
                className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors border ${
                  vegetarianOnly
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                    : 'bg-white text-charcoal-muted border-gray-200 hover:bg-orange-50'
                }`}
              >
                <Leaf className="w-3.5 h-3.5" />
                <span>Vegetarian Only</span>
              </button>

              <button
                onClick={() => setSpicyOnly(!spicyOnly)}
                className={`px-3.5 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-colors border ${
                  spicyOnly
                    ? 'bg-red-50 text-red-700 border-red-300'
                    : 'bg-white text-charcoal-muted border-gray-200 hover:bg-orange-50'
                }`}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Spicy Only</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-xs font-bold text-rose-600 hover:text-rose-700 flex items-center gap-1"
              >
                <X className="w-3.5 h-3.5" />
                Reset all filters
              </button>
            )}
          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-charcoal-muted font-medium px-1">
          <span>
            Showing <strong className="text-charcoal">{filteredProducts.length}</strong> items
          </span>
          {currentCategory !== 'all' && (
            <span className="capitalize">
              Category: <strong className="text-brand-600">{currentCategory}</strong>
            </span>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-orange-100 shadow-soft max-w-md mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-50 mx-auto flex items-center justify-center text-3xl">
              🔍
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">
              No matching products found
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              We couldn't find anything matching your exact filter combination. Try resetting your search or dietary tags.
            </p>
            <button
              onClick={clearAllFilters}
              className="px-5 py-2.5 bg-brand-500 text-white rounded-full text-xs font-bold shadow hover:bg-brand-600 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}

