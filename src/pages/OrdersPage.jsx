import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, ArrowRight, RotateCcw, CheckCircle2, Flame, Bike, PackageCheck } from 'lucide-react';
import { useOrders } from '../context/OrderContext';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import { PRODUCTS } from '../data/pizzas';

export default function OrdersPage() {
  const { orders } = useOrders();
  const { addToCart } = useCart();
  const { t, formatPrice } = useLanguage();

  const handleReorder = (order) => {
    order.items.forEach((item) => {
      // Find base product or build stub
      const matched = PRODUCTS.find((p) => p.name === item.name) || {
        id: `reorder-${item.name}`,
        name: item.name,
        price: item.unitPrice,
        image: item.image || 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80'
      };

      addToCart(matched, {
        size: item.size,
        crust: item.crust,
        extraToppings: item.extraToppings || [],
        quantity: item.quantity
      });
    });
  };

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
              Order History
            </h1>
            <p className="text-xs text-charcoal-muted mt-1">
              Track live kitchen status, view item receipts, and reorder your favorite meals.
            </p>
          </div>
          <Link
            to="/menu"
            className="px-5 py-2.5 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-full shadow transition-all self-start sm:self-auto"
          >
            Order New Pizza
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="p-12 bg-white rounded-3xl border border-orange-100 text-center space-y-4 max-w-md mx-auto">
            <div className="w-16 h-16 rounded-full bg-orange-100 text-brand-600 flex items-center justify-center mx-auto text-3xl">
              📦
            </div>
            <h3 className="font-display font-bold text-lg text-charcoal">No Orders Placed Yet</h3>
            <p className="text-xs text-charcoal-muted">
              Whenever you place an order, its live progress and receipts will appear here.
            </p>
            <Link
              to="/menu"
              className="inline-block px-6 py-2.5 bg-brand-500 text-white text-xs font-bold rounded-full shadow"
            >
              Browse Menu
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {orders.map((order) => {
              const isDelivered = order.status.toLowerCase() === 'delivered';

              return (
                <div
                  key={order.id}
                  className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4 hover:shadow-soft-lg transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-orange-50">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-bold text-base text-charcoal">
                          #{order.id}
                        </span>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                            isDelivered
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-amber-100 text-amber-900 animate-pulse'
                          }`}
                        >
                          {!isDelivered && <Flame className="w-3.5 h-3.5 text-brand-600" />}
                          <span>{order.status}</span>
                        </span>
                      </div>
                      <p className="text-xs text-charcoal-muted mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString()} at{' '}
                        {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-3.5 py-2 bg-orange-50 hover:bg-orange-100 text-brand-700 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Reorder</span>
                      </button>

                      <Link
                        to={`/order-confirmation/${order.id}`}
                        className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow transition-all"
                      >
                        <span>Live Tracker</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* Order items */}
                  <div className="divide-y divide-gray-50 text-xs">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="py-2.5 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-charcoal">
                            {item.quantity}x {item.name}
                          </span>
                          {item.size && (
                            <span className="text-gray-500 ml-2">
                              ({item.size.label} {item.crust ? `• ${item.crust.label}` : ''})
                            </span>
                          )}
                        </div>
                        <span className="font-semibold text-charcoal">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Total */}
                  <div className="pt-3 border-t border-orange-50 flex items-center justify-between text-xs">
                    <span className="text-charcoal-muted">
                      Paid via {order.paymentMethod}
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-charcoal-muted">Total:</span>
                      <span className="font-display font-black text-lg text-brand-600">
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

