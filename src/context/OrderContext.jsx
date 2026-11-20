import React, { createContext, useContext, useState, useEffect } from 'react';

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
    status: 'Delivered', // Pending | Baking | Out for Delivery | Delivered | Cancelled
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
    status: 'Out for Delivery',
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

  useEffect(() => {
    localStorage.setItem('pizzora_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData) => {
    const orderId = `PZ-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      status: 'Baking',
      estimatedTime: 'Estimated delivery: 25 - 30 mins',
      ...orderData
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
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

