import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Users, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Flame, 
  Clock, 
  Tag
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS, CATEGORIES } from '../data/pizzas';

export default function AdminPage() {
  const { orders, updateOrderStatus } = useOrders();
  const { formatPrice, currencyLabel } = useLanguage();
  const [productList, setProductList] = useState(PRODUCTS);

  // New product form modal
  const [newProductModal, setNewProductModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'signature',
    subCategory: 'pizza',
    price: '',
    badge: 'New Arrival',
    description: '',
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
  });

  // Financial calculations
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);
  const avgOrderValue = totalOrders > 0 ? (totalRevenue / totalOrders) : 0;
  const activeOrdersCount = orders.filter((o) => o.status.toLowerCase() !== 'delivered').length;

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;

    const created = {
      id: `custom-${Date.now()}`,
      name: newProduct.name,
      category: newProduct.category,
      subCategory: newProduct.subCategory,
      price: parseFloat(newProduct.price),
      rating: 5.0,
      reviewsCount: 1,
      prepTime: '20-25 mins',
      badge: newProduct.badge,
      image: newProduct.image,
      description: newProduct.description || 'Delicious freshly made recipe by PIZZORA Kitchen.'
    };

    setProductList([created, ...productList]);
    setNewProductModal(false);
    setNewProduct({
      name: '',
      category: 'signature',
      subCategory: 'pizza',
      price: '',
      badge: 'New Arrival',
      description: '',
      image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80'
    });
  };

  const handleDeleteProduct = (id) => {
    setProductList(productList.filter((p) => p.id !== id));
  };

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Admin Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-100 text-brand-800 text-xs font-bold uppercase mb-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Kitchen Management Operations
            </div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
              PIZZORA Live Control Center
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              Real-time hearth ovens order queue, inventory catalog and sales metrics.
            </p>
          </div>

          <button
            onClick={() => setNewProductModal(true)}
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-2xl shadow-md flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Menu Item</span>
          </button>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 bg-white rounded-3xl border border-orange-100 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-muted uppercase">Total Revenue</span>
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">
                {currencyLabel}
              </div>
            </div>
            <p className="font-display font-black text-3xl text-charcoal mt-3">
              {formatPrice(totalRevenue)}
            </p>
            <p className="text-[11px] text-emerald-600 font-semibold mt-1">
              +18.4% from yesterday
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-orange-100 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-muted uppercase">Total Orders</span>
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-charcoal mt-3">
              {totalOrders}
            </p>
            <p className="text-[11px] text-brand-600 font-semibold mt-1">
              Live hearth database
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-orange-100 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-muted uppercase">Avg Order Value</span>
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-charcoal mt-3">
              {formatPrice(avgOrderValue)}
            </p>
            <p className="text-[11px] text-gray-500 font-semibold mt-1">
              Across all customer carts
            </p>
          </div>

          <div className="p-5 bg-white rounded-3xl border border-orange-100 shadow-soft">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-charcoal-muted uppercase">Active In Kitchen</span>
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                <Flame className="w-4 h-4" />
              </div>
            </div>
            <p className="font-display font-black text-3xl text-charcoal mt-3">
              {activeOrdersCount}
            </p>
            <p className="text-[11px] text-rose-600 font-semibold mt-1">
              Currently baking / en route
            </p>
          </div>
        </div>

        {/* Live Orders Queue Table */}
        <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl text-charcoal">
              Kitchen Orders Queue ({orders.length})
            </h2>
            <span className="text-xs text-charcoal-muted">Change status to sync live customer tracker</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-orange-50/70 text-charcoal font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Items</th>
                  <th className="p-3.5">Total</th>
                  <th className="p-3.5">Payment</th>
                  <th className="p-3.5 rounded-r-xl">Live Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium text-charcoal">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-orange-50/30 transition-colors">
                    <td className="p-3.5 font-mono font-bold text-brand-600">#{order.id}</td>
                    <td className="p-3.5">
                      <p className="font-bold">{order.customer.name}</p>
                      <p className="text-[10px] text-gray-400">{order.customer.phone}</p>
                    </td>
                    <td className="p-3.5 max-w-xs truncate">
                      {order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ')}
                    </td>
                    <td className="p-3.5 font-bold">{formatPrice(order.total)}</td>
                    <td className="p-3.5 text-gray-500">{order.paymentMethod}</td>
                    <td className="p-3.5">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer border focus:outline-none ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-orange-50 text-brand-800 border-orange-200'
                        }`}
                      >
                        <option value="Pending">Pending Confirmation</option>
                        <option value="Baking">Stone Oven Baking</option>
                        <option value="Quality Checked">Quality Checked</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Catalog Management */}
        <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-extrabold text-xl text-charcoal">
              Menu Item Catalog ({productList.length})
            </h2>
            <button
              onClick={() => setNewProductModal(true)}
              className="text-xs font-bold text-brand-600 hover:underline"
            >
              + Create new item
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {productList.map((prod) => (
              <div
                key={prod.id}
                className="p-3.5 bg-orange-50/40 rounded-2xl border border-orange-100 flex items-center justify-between gap-3"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-14 h-14 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-xs text-charcoal truncate">{prod.name}</h4>
                  <p className="text-[11px] text-gray-500 capitalize">{prod.category} • {formatPrice(prod.price)}</p>
                  {prod.badge && (
                    <span className="text-[10px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {prod.badge}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleDeleteProduct(prod.id)}
                  className="text-gray-400 hover:text-rose-500 p-2 transition-colors"
                  title="Delete item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* New Product Modal */}
      {newProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-orange-100 space-y-4"
          >
            <h3 className="font-display font-bold text-xl text-charcoal">
              Add New Pizza or Menu Item
            </h3>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-charcoal mb-1">Item Title *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="E.g. Truffle Portobello Melt"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-100 focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-charcoal mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-orange-100 focus:outline-none"
                  >
                    <option value="signature">Signature Pizzas</option>
                    <option value="classic">Classic Italian</option>
                    <option value="spicy">Hot & Fiery</option>
                    <option value="combos">Combos & Deals</option>
                    <option value="drinks">Beverages</option>
                    <option value="desserts">Desserts</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-charcoal mb-1">Narxi ({currencyLabel}) *</label>
                  <input
                    type="number"
                    step="1000"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="65000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-orange-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Badge (Optional)</label>
                <input
                  type="text"
                  value={newProduct.badge}
                  onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                  placeholder="Chef's Special / Limited"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-charcoal mb-1">Description</label>
                <textarea
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                  placeholder="Ingredients and description..."
                  rows="2"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-orange-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setNewProductModal(false)}
                  className="px-4 py-2 font-bold text-charcoal-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-500 text-white font-bold rounded-xl shadow hover:bg-brand-600"
                >
                  Create Item
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

