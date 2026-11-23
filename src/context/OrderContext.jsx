import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const OrderContext = createContext();

const INITIAL_ORDERS = [
  {
    id: 'PZ-8841',
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    customer: {
      name: 'Alex Johnson',
      email: 'alex@pizzora.com',
      phone: '+1 (555) 234-5678',
      address: '742 Evergreen Terrace, Springfield, IL'
    },
    items: [
      {
        name: 'Truffle Burrata Bliss',
        quantity: 1,
        size: { label: '30 cm' },
        crust: { label: 'Classic Hand-Tossed' },
        unitPrice: 18.99
      },
      {
        name: 'San Pellegrino Aranciata Rossa',
        quantity: 2,
        size: null,
        crust: null,
        unitPrice: 3.75
      }
    ],
    subtotal: 26.49,
    discount: 0,
    deliveryFee: 0,
    tax: 2.12,
    total: 28.61,
    status: 'Delivered', // Pending | Baking | Ready | Delivered | Paid
    paymentMethod: 'Credit Card (Stripe Verified)',
    estimatedTime: 'Delivered at 7:42 PM'
  },
  {
    id: 'PZ-9024',
    createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    customer: {
      name: 'Sophia Chen',
      email: 'sophia@example.com',
      phone: '+1 (555) 999-4433',
      address: '450 Ocean Drive, Suite 12B, Miami, FL'
    },
    items: [
      {
        name: 'PIZZORA Famiglia Party Feast',
        quantity: 1,
        size: { label: '35 cm' },
        crust: { label: 'Melted Cheese Burst' },
        unitPrice: 42.98
      }
    ],
    subtotal: 42.98,
    discount: 8.59,
    deliveryFee: 0,
    tax: 2.75,
    total: 37.14,
    status: 'Ready',
    paymentMethod: 'Apple Pay',
    estimatedTime: 'ETA: ~12 mins'
  }
];

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('pizzora_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  // Keep local storage synchronized
  useEffect(() => {
    try {
      localStorage.setItem('pizzora_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Supabase Initial Fetch and Realtime Subscription
  useEffect(() => {
    let channel;

    const initSupabaseOrders = async () => {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map((d) => ({
            ...d,
            createdAt: d.created_at || d.createdAt,
            paymentMethod: d.payment_method || d.paymentMethod,
            estimatedTime: d.estimated_time || d.estimatedTime,
            orderNotes: d.order_notes || d.orderNotes,
            deliverySlot: d.delivery_slot || d.deliverySlot,
            deliveryFee: d.delivery_fee ?? d.deliveryFee ?? 0
          }));
          setOrders(mapped);
        }
      } catch (err) {
        console.warn('Supabase fetch orders notice:', err);
      }

      // Listen for realtime orders updates
      try {
        channel = supabase
          .channel('realtime_pizzora_orders')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'orders' },
            (payload) => {
              if (payload.eventType === 'INSERT') {
                const newDoc = {
                  ...payload.new,
                  createdAt: payload.new.created_at || payload.new.createdAt,
                  paymentMethod: payload.new.payment_method || payload.new.paymentMethod,
                  estimatedTime: payload.new.estimated_time || payload.new.estimatedTime,
                  orderNotes: payload.new.order_notes || payload.new.orderNotes,
                  deliverySlot: payload.new.delivery_slot || payload.new.deliverySlot
                };
                setOrders((prev) => {
                  if (prev.some((o) => o.id === newDoc.id)) return prev;
                  return [newDoc, ...prev];
                });
              } else if (payload.eventType === 'UPDATE') {
                setOrders((prev) =>
                  prev.map((o) =>
                    o.id === payload.new.id
                      ? {
                          ...o,
                          ...payload.new,
                          createdAt: payload.new.created_at || o.createdAt,
                          paymentMethod: payload.new.payment_method || o.paymentMethod,
                          estimatedTime: payload.new.estimated_time || o.estimatedTime
                        }
                      : o
                  )
                );
              } else if (payload.eventType === 'DELETE') {
                setOrders((prev) => prev.filter((o) => o.id !== payload.old.id));
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.warn('Supabase realtime subscription notice:', err);
      }
    };

    initSupabaseOrders();

    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const placeOrder = async (orderData) => {
    const orderId = `PZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date().toISOString();
    const newOrder = {
      id: orderId,
      createdAt: now,
      status: 'Pending',
      estimatedTime: 'Taxminiy vaqt: 25 - 30 daqiqa',
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Asynchronously sync to Supabase
    try {
      const supabasePayload = {
        id: orderId,
        created_at: now,
        status: 'Pending',
        customer: newOrder.customer,
        items: newOrder.items,
        subtotal: newOrder.subtotal,
        discount: newOrder.discount || 0,
        delivery_fee: newOrder.deliveryFee || 0,
        tax: newOrder.tax || 0,
        total: newOrder.total,
        payment_method: newOrder.paymentMethod,
        estimated_time: newOrder.estimatedTime,
        order_notes: newOrder.orderNotes,
        delivery_slot: newOrder.deliverySlot
      };

      const { error } = await supabase.from('orders').insert([supabasePayload]);
      if (error) {
        console.warn('Supabase insert notice (run SQL table migration if table does not exist):', error.message);
      }
    } catch (err) {
      console.warn('Supabase order insert error:', err);
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );

    // Asynchronously sync status update to Supabase
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) {
        console.warn('Supabase status update notice:', error.message);
      }
    } catch (err) {
      console.warn('Supabase update order error:', err);
    }
  };

  const getOrderById = (id) => {
    return orders.find((o) => o.id === id);
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        getOrderById
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
