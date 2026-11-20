import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Heart, 
  Clock, 
  ShieldCheck, 
  LogOut, 
  Edit3, 
  Check, 
  ShoppingBag,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/pizzas';

export default function AccountPage() {
  const { user, updateProfile, logout, isAdmin } = useAuth();
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // If not logged in, show prompt
  if (!user) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <div className="w-16 h-16 rounded-full bg-orange-100 text-brand-600 flex items-center justify-center mx-auto text-2xl">
          🔒
        </div>
        <h2 className="text-2xl font-bold text-charcoal">Sign in to your account</h2>
        <p className="text-xs text-charcoal-muted">Access your saved addresses, favorites and order history.</p>
        <Link to="/login" className="inline-block px-8 py-3 bg-brand-500 text-white font-bold rounded-full">
          Sign In
        </Link>
      </div>
    );
  }

  // Edit profile state
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    phone: user.phone || '',
    address: user.address || ''
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // User favorite products
  const favoriteProducts = PRODUCTS.filter((p) => user.favorites?.includes(p.id));

  // User orders
  const userOrders = orders.filter(
    (o) => o.customer.email.toLowerCase() === user.email.toLowerCase()
  );

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* User Profile Card */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-orange-100 shadow-md"
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display font-black text-2xl sm:text-3xl text-charcoal">
                  {user.name}
                </h1>
                {isAdmin && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-brand-100 text-brand-700">
                    Admin
                  </span>
                )}
              </div>
              <p className="text-xs text-charcoal-muted mt-0.5">{user.email}</p>
              <div className="flex items-center gap-4 mt-2 text-xs font-semibold text-brand-700">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {userOrders.length} Order(s) Placed
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-brand-500 text-brand-500" />
                  {user.favorites?.length || 0} Favorites
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isAdmin && (
              <Link
                to="/admin"
                className="px-5 py-2.5 rounded-xl bg-charcoal text-white hover:bg-black font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Kitchen Admin</span>
              </Link>
            )}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2.5 rounded-xl border border-orange-200 text-charcoal hover:bg-orange-50 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {saveSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>Profile information updated successfully!</span>
          </div>
        )}

        {/* Edit Profile Form */}
        {isEditing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft"
          >
            <h3 className="font-display font-bold text-lg text-charcoal mb-4">
              Update Contact Details
            </h3>
            <form onSubmit={handleSave} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Phone Number</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-charcoal mb-1">Default Delivery Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-orange-50/50 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500 font-medium"
                />
              </div>
              <div className="sm:col-span-3 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Favorite Pizzas Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-2xl text-charcoal flex items-center gap-2">
              <Heart className="w-5 h-5 fill-brand-500 text-brand-500" />
              <span>Your Favorite Pizzas</span>
            </h2>
            <Link to="/menu" className="text-xs font-bold text-brand-600 hover:underline">
              Explore more pizzas
            </Link>
          </div>

          {favoriteProducts.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-orange-100 text-center text-xs text-charcoal-muted">
              You haven't bookmarked any favorite pizzas yet. Tap the heart icon on any pizza to save it here for 1-click reordering!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteProducts.map((p) => (
                <div
                  key={p.id}
                  className="p-4 bg-white rounded-3xl border border-orange-100 shadow-soft flex items-center gap-4"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-18 h-18 rounded-2xl object-cover shrink-0 w-20 h-20"
                  />
                  <div className="min-w-0 flex-1">
                    <h4 className="font-display font-bold text-sm text-charcoal truncate">{p.name}</h4>
                    <p className="text-xs font-bold text-brand-600 mt-0.5">${p.price.toFixed(2)}</p>
                    <button
                      onClick={() => addToCart(p, { quantity: 1 })}
                      className="mt-2 px-3 py-1 bg-brand-50 text-brand-600 hover:bg-brand-500 hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Order</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Orders Overview */}
        <div className="space-y-4 pt-4 border-t border-orange-100">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-2xl text-charcoal flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-500" />
              <span>Recent Orders</span>
            </h2>
            <Link to="/orders" className="text-xs font-bold text-brand-600 hover:underline">
              View all orders
            </Link>
          </div>

          {userOrders.length === 0 ? (
            <div className="p-8 bg-white rounded-3xl border border-orange-100 text-center text-xs text-charcoal-muted">
              No orders placed yet. Fresh stone-baked pizza is just a few clicks away!
            </div>
          ) : (
            <div className="space-y-3">
              {userOrders.slice(0, 2).map((order) => (
                <div
                  key={order.id}
                  className="p-5 bg-white rounded-3xl border border-orange-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-charcoal">#{order.id}</span>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-100 text-brand-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="text-xs text-charcoal-muted mt-1">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {new Date(order.createdAt).toLocaleDateString()} • {order.paymentMethod}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <span className="font-display font-extrabold text-base text-charcoal">
                      ${order.total.toFixed(2)}
                    </span>
                    <Link
                      to={`/order-confirmation/${order.id}`}
                      className="px-4 py-2 bg-orange-50 hover:bg-orange-100 text-brand-700 text-xs font-bold rounded-xl transition-colors"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

