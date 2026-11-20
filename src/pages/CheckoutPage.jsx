import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard, 
  MapPin, 
  Phone, 
  User, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  ShoppingBag,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useOrders } from '../context/OrderContext';

export default function CheckoutPage() {
  const { items, subtotal, deliveryFee, tax, discount, total, clearCart, appliedPromo } = useCart();
  const { user } = useAuth();
  const { placeOrder } = useOrders();
  const navigate = useNavigate();

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="py-24 text-center max-w-md mx-auto space-y-4">
        <h2 className="text-2xl font-bold text-charcoal">Your cart is empty</h2>
        <p className="text-xs text-charcoal-muted">Add some delicious pizzas to proceed with checkout.</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-brand-500 text-white font-bold rounded-full">
          Back to Menu
        </Link>
      </div>
    );
  }

  // Delivery details state
  const [formData, setFormData] = useState({
    fullName: user?.name || 'Alex Johnson',
    email: user?.email || 'alex@pizzora.com',
    phone: user?.phone || '+1 (555) 234-5678',
    streetAddress: user?.address || '742 Evergreen Terrace',
    aptUnit: 'Apt 4B',
    city: 'Springfield',
    postalCode: '62704',
    orderNotes: 'Please ring bell twice and leave on doorstep.'
  });

  const [deliverySlot, setDeliverySlot] = useState('asap'); // 'asap' | 'scheduled'
  const [paymentMethod, setPaymentMethod] = useState('card'); // 'card' | 'apple-pay' | 'cod'

  // Card details state
  const [cardData, setCardData] = useState({
    cardNumber: '•••• •••• •••• 4242',
    cardExpiry: '12/28',
    cardCvc: '888',
    cardName: user?.name || 'Alex Johnson'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e.target;
    setCardData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.fullName.trim() || !formData.phone.trim() || !formData.streetAddress.trim()) {
      setFormError('Please fill in all required customer name, phone, and delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate payment processing delay
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const newOrder = placeOrder({
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.streetAddress}, ${formData.aptUnit ? formData.aptUnit + ', ' : ''}${formData.city} ${formData.postalCode}`
        },
        items: items.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          size: item.size,
          crust: item.crust,
          extraToppings: item.extraToppings,
          unitPrice: item.unitPrice,
          image: item.image
        })),
        orderNotes: formData.orderNotes,
        deliverySlot: deliverySlot === 'asap' ? 'ASAP (20-30 mins)' : 'Pre-scheduled Delivery',
        paymentMethod: paymentMethod === 'card' ? 'Credit Card (Stripe Sim)' : paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Cash on Delivery',
        subtotal,
        deliveryFee,
        discount,
        tax,
        total,
        appliedPromoCode: appliedPromo?.code || null
      });

      // Blast celebratory confetti!
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });

      clearCart();
      navigate(`/order-confirmation/${newOrder.id}`);
    } catch (err) {
      setFormError('Failed to process payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-8 sm:py-12 bg-warmWhite min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Title */}
        <div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-charcoal">
            Secure Checkout
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Fast, contactless delivery right to your door.
          </p>
        </div>

        {formError && (
          <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs font-bold text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Delivery & Payment Details */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* 1. Customer Contact */}
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2 border-b border-orange-50 pb-3">
                <User className="w-5 h-5 text-brand-500" />
                <h2 className="font-display font-bold text-base text-charcoal">
                  1. Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Mobile Phone (For delivery driver live updates) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* 2. Delivery Address */}
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2 border-b border-orange-50 pb-3">
                <MapPin className="w-5 h-5 text-brand-500" />
                <h2 className="font-display font-bold text-base text-charcoal">
                  2. Delivery Address & Instructions
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="streetAddress"
                    required
                    value={formData.streetAddress}
                    onChange={handleInputChange}
                    placeholder="E.g. 742 Evergreen Terrace"
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Apt / Suite / Floor
                  </label>
                  <input
                    type="text"
                    name="aptUnit"
                    value={formData.aptUnit}
                    onChange={handleInputChange}
                    placeholder="Apt 4B"
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Speed / Timing
                  </label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-bold text-charcoal focus:outline-none focus:border-brand-500 cursor-pointer"
                  >
                    <option value="asap">⚡ ASAP (~25-30 mins)</option>
                    <option value="scheduled">🕒 Later Today</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-charcoal mb-1">
                    Driver Notes / Delivery Instructions
                  </label>
                  <input
                    type="text"
                    name="orderNotes"
                    value={formData.orderNotes}
                    onChange={handleInputChange}
                    placeholder="Gate code, leave with concierge, etc."
                    className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs font-medium focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-4">
              <div className="flex items-center gap-2 border-b border-orange-50 pb-3">
                <CreditCard className="w-5 h-5 text-brand-500" />
                <h2 className="font-display font-bold text-base text-charcoal">
                  3. Payment Method
                </h2>
              </div>

              {/* Method radio tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentMethod === 'card'
                      ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-300/40 shadow-sm'
                      : 'bg-white border-orange-100 hover:border-brand-200'
                  }`}
                >
                  <CreditCard className="w-5 h-5 text-brand-600" />
                  <div>
                    <span className="block font-bold text-xs text-charcoal">Credit / Debit Card</span>
                    <span className="text-[10px] text-gray-500">Stripe Verified</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('apple-pay')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentMethod === 'apple-pay'
                      ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-300/40 shadow-sm'
                      : 'bg-white border-orange-100 hover:border-brand-200'
                  }`}
                >
                  <span className="text-xl"></span>
                  <div>
                    <span className="block font-bold text-xs text-charcoal">Apple / Google Pay</span>
                    <span className="text-[10px] text-gray-500">1-Touch Pay</span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-2xl border flex items-center gap-2.5 transition-all text-left ${
                    paymentMethod === 'cod'
                      ? 'bg-brand-50 border-brand-500 ring-2 ring-brand-300/40 shadow-sm'
                      : 'bg-white border-orange-100 hover:border-brand-200'
                  }`}
                >
                  <DollarSign className="w-5 h-5 text-brand-600" />
                  <div>
                    <span className="block font-bold text-xs text-charcoal">Cash on Delivery</span>
                    <span className="text-[10px] text-gray-500">Pay at your door</span>
                  </div>
                </button>
              </div>

              {/* Card input preview */}
              {paymentMethod === 'card' && (
                <div className="p-4 bg-orange-50/50 rounded-2xl border border-orange-100 space-y-3 mt-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-charcoal mb-1">
                        Card Number (Demo Simulator)
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={cardData.cardNumber}
                        onChange={handleCardInputChange}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-orange-100 text-xs font-mono font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal mb-1">
                        Expiration
                      </label>
                      <input
                        type="text"
                        name="cardExpiry"
                        value={cardData.cardExpiry}
                        onChange={handleCardInputChange}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-orange-100 text-xs font-mono font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-charcoal mb-1">
                        CVC
                      </label>
                      <input
                        type="password"
                        name="cardCvc"
                        maxLength="4"
                        value={cardData.cardCvc}
                        onChange={handleCardInputChange}
                        className="w-full px-3.5 py-2.5 bg-white rounded-xl border border-orange-100 text-xs font-mono font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Confirmation Card */}
          <div className="lg:col-span-4 sticky top-28 space-y-4">
            
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-soft-lg space-y-5">
              <h3 className="font-display font-extrabold text-xl text-charcoal">
                Order Review ({items.length} items)
              </h3>

              {/* Items scroll */}
              <div className="max-h-60 overflow-y-auto space-y-2.5 pr-1 divide-y divide-gray-50">
                {items.map((item) => (
                  <div key={item.cartKey} className="pt-2 first:pt-0 flex items-center justify-between text-xs">
                    <div className="min-w-0 pr-2">
                      <p className="font-bold text-charcoal truncate">
                        {item.quantity}x {item.name}
                      </p>
                      {item.size && (
                        <p className="text-[11px] text-gray-500">
                          {item.size.label} • {item.crust?.label}
                        </p>
                      )}
                    </div>
                    <span className="font-bold text-brand-600 shrink-0">
                      ${(item.unitPrice * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financials */}
              <div className="pt-3 border-t border-orange-50 space-y-2 text-xs text-charcoal-muted">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-charcoal">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{deliveryFee === 0 ? <strong className="text-emerald-600">FREE</strong> : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="pt-3 border-t border-gray-100 flex justify-between items-baseline">
                  <span className="font-display font-bold text-base text-charcoal">Total Amount</span>
                  <span className="font-display font-black text-2xl text-brand-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 transition-all disabled:opacity-75"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Authorizing Payment...</span>
                  </div>
                ) : (
                  <>
                    <span>Place Order • ${total.toFixed(2)}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-1">
                <p className="text-[10px] text-gray-400">
                  By placing your order, you agree to PIZZORA's Delivery Policy and Happiness Guarantee.
                </p>
              </div>

            </div>

          </div>

        </form>

      </div>
    </div>
  );
}

