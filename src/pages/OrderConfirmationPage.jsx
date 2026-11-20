import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Flame, 
  PackageCheck, 
  Bike, 
  Home, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';
import { useOrders } from '../context/OrderContext';

export default function OrderConfirmationPage() {
  const { id } = useParams();
  const { getOrderById, updateOrderStatus } = useOrders();

  const order = getOrderById(id);

  // Status progression simulation steps
  const steps = [
    { key: 'Pending', label: 'Order Confirmed', icon: CheckCircle2, desc: 'Kitchen acknowledged ticket' },
    { key: 'Baking', label: 'Stone Oven Baking', icon: Flame, desc: 'Baking at 480°C in Neapolitan hearth' },
    { key: 'Quality Checked', label: 'Quality Inspected', icon: PackageCheck, desc: 'Fresh basil & truffle oil finish' },
    { key: 'Out for Delivery', label: 'Out with Driver', icon: Bike, desc: 'Thermal bag kept at 80°C' },
    { key: 'Delivered', label: 'Delivered Hot', icon: Home, desc: 'Enjoy your pizza happiness!' }
  ];

  const currentStatusIndex = steps.findIndex(
    (s) => s.key.toLowerCase() === (order?.status || 'Baking').toLowerCase()
  );

  const activeIndex = currentStatusIndex >= 0 ? currentStatusIndex : 1;

  // Interactive live simulator to advance order state
  const handleAdvanceStatus = () => {
    if (!order) return;
    const nextIndex = (activeIndex + 1) % steps.length;
    updateOrderStatus(order.id, steps[nextIndex].key);
  };

  if (!order) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-charcoal">Order Not Found</h2>
        <p className="text-xs text-charcoal-muted">We couldn't locate this order ID in our live system.</p>
        <Link to="/" className="inline-block px-6 py-2.5 bg-brand-500 text-white font-bold rounded-full">
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Celebration Header */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-3"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 border border-emerald-200 inline-block">
            Order Successfully Placed
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-charcoal">
            Taste the Happiness Soon!
          </h1>
          <p className="text-sm text-charcoal-muted max-w-md mx-auto">
            Order <strong className="text-brand-600 font-mono">#{order.id}</strong> has been sent to our master pizzaiolo. Estimated delivery in <strong>25 - 30 minutes</strong>.
          </p>
        </motion.div>

        {/* Live Kitchen Status Timeline */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-soft-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-orange-50 pb-4">
            <div>
              <span className="text-xs font-bold text-charcoal-muted block uppercase tracking-wider">
                Live Kitchen Tracker
              </span>
              <h2 className="font-display font-extrabold text-xl text-charcoal flex items-center gap-2">
                <span>Status:</span>
                <span className="text-brand-600">{order.status}</span>
              </h2>
            </div>

            {/* Test simulator button */}
            <button
              onClick={handleAdvanceStatus}
              className="self-start sm:self-auto px-3.5 py-1.5 bg-orange-100 hover:bg-orange-200 text-brand-800 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              title="Click to simulate advancing order to the next step"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>Advance Kitchen Step (Demo)</span>
            </button>
          </div>

          {/* Stepper Progress */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {steps.map((step, idx) => {
              const isCompleted = idx <= activeIndex;
              const isCurrent = idx === activeIndex;
              const StepIcon = step.icon;

              return (
                <div key={step.key} className="flex flex-col items-center text-center space-y-2">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                      isCurrent
                        ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/40 ring-4 ring-brand-100 animate-pulse'
                        : isCompleted
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'bg-orange-50 text-gray-400'
                    }`}
                  >
                    <StepIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className={`text-xs font-bold ${isCompleted ? 'text-charcoal' : 'text-gray-400'}`}>
                      {step.label}
                    </h4>
                    <p className="text-[10px] text-gray-500 leading-tight mt-0.5 max-w-[130px] mx-auto hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-100 flex items-center justify-between text-xs text-charcoal">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-brand-600" />
              <span>Target Delivery Time: <strong>{new Date(Date.now() + 25 * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</strong></span>
            </div>
            <a href="tel:+18007499672" className="text-brand-600 font-bold hover:underline flex items-center gap-1">
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call Kitchen</span>
            </a>
          </div>
        </div>

        {/* Order Details & Summary Card */}
        <div className="p-6 sm:p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-6">
          <h3 className="font-display font-extrabold text-lg text-charcoal">
            Order Receipt & Breakdown
          </h3>

          <div className="divide-y divide-gray-100">
            {order.items.map((item, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <p className="font-bold text-charcoal">
                    {item.quantity}x {item.name}
                  </p>
                  {item.size && (
                    <p className="text-xs text-gray-500">
                      {item.size.label} {item.crust ? `• ${item.crust.label}` : ''}
                    </p>
                  )}
                </div>
                <span className="font-bold text-charcoal">
                  ${(item.unitPrice * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-orange-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-charcoal-muted">
            <div className="space-y-1">
              <span className="font-bold text-charcoal block">Delivering To:</span>
              <p>{order.customer.name}</p>
              <p>{order.customer.address}</p>
              <p>{order.customer.phone}</p>
            </div>
            <div className="space-y-1 sm:text-right">
              <span className="font-bold text-charcoal block">Payment Summary:</span>
              <p>Method: {order.paymentMethod}</p>
              <p>Delivery: {order.deliveryFee === 0 ? 'FREE' : `$${order.deliveryFee.toFixed(2)}`}</p>
              <p className="text-base font-black text-brand-600 pt-1">
                Total Paid: ${order.total.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-orange-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/orders"
              className="w-full sm:w-auto px-6 py-3 rounded-full border border-orange-200 text-charcoal hover:bg-orange-50 font-bold text-xs text-center transition-colors"
            >
              View All Orders in Account
            </Link>
            <Link
              to="/menu"
              className="w-full sm:w-auto px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-xs rounded-full shadow-md text-center transition-all"
            >
              Order More Food
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

