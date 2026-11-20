import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3500);
  };

  return (
    <div className="py-10 sm:py-16 bg-warmWhite min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-brand-700 bg-orange-100/70 border border-orange-200">
            Get In Touch
          </span>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-charcoal">
            We'd Love to Hear From You
          </h1>
          <p className="text-sm text-charcoal-muted">
            Have a catering request, question about dietary allergens, or feedback on your delivery? Our friendly support team is here for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Contact Details Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-6">
              <h3 className="font-display font-black text-2xl text-charcoal">
                PIZZORA Flagship Kitchen
              </h3>

              <div className="space-y-4 text-xs text-charcoal">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">Visit Our Hearth Kitchen:</span>
                    <span className="text-charcoal-muted">100 Artisan Way, Pizzora Square, New York, NY 10012</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">Direct Hotline:</span>
                    <span className="text-charcoal-muted">+1 (800) 749-9672 (1-800-PIZZORA)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">Email Inquiries:</span>
                    <span className="text-charcoal-muted">hello@pizzora.com / catering@pizzora.com</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-brand-600 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold block">Kitchen Hours:</span>
                    <span className="text-charcoal-muted">Monday – Sunday: 11:00 AM – 11:30 PM EST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Guarantee Pill */}
            <div className="p-5 bg-gradient-to-r from-brand-500 to-amber-500 text-white rounded-3xl shadow-md space-y-1">
              <span className="font-bold text-sm block">Express 30-Minute Guarantee</span>
              <p className="text-xs text-white/90">
                If your hot pizza takes more than 30 minutes from oven dispatch, your next large pizza is on us.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="p-8 bg-white rounded-3xl border border-orange-100 shadow-soft space-y-6">
              <h3 className="font-display font-extrabold text-2xl text-charcoal">
                Send Us a Message
              </h3>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base">Message Dispatched!</h4>
                  <p className="text-xs">Thank you for writing to PIZZORA. Our team will get back to you within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-charcoal mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-charcoal mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal mb-1">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Catering event / Order question / Feedback"
                      className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-charcoal mb-1">Message *</label>
                    <textarea
                      required
                      rows="4"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="How can our pizza makers help you today?"
                      className="w-full px-4 py-3 bg-orange-50/40 rounded-xl border border-orange-100 text-xs focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-extrabold text-sm rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

