import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

const PROMO_CODES = {
  PIZZORA20: { discountPercent: 20, description: '20% Off Welcome Discount' },
  CHEESE5: { discountAmount: 5.0, description: '$5.00 Off Any Order' },
  FREESHIP: { freeShipping: true, description: '100% Free Express Delivery' }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('pizzora_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');

  useEffect(() => {
    localStorage.setItem('pizzora_cart_items', JSON.stringify(items));
  }, [items]);

  // Generate a distinct cart item identifier based on size, crust & chosen toppings
  const generateCartItemId = (product, size, crust, extraToppings) => {
    const toppingKeys = (extraToppings || []).map((t) => t.id).sort().join(',');
    return `${product.id}_${size?.id || 'standard'}_${crust?.id || 'default'}_${toppingKeys}`;
  };

  // Add to cart with full customization support
  const addToCart = (product, options = {}) => {
    const {
      size = { id: 'medium', label: '30 cm', multiplier: 1.0 },
      crust = { id: 'classic', label: 'Classic Hand-Tossed', extraPrice: 0 },
      extraToppings = [],
      quantity = 1,
      customNote = ''
    } = options;

    // Calculate base unit price with size multiplier, crust additions and extra toppings
    const toppingsTotal = extraToppings.reduce((acc, t) => acc + (t.price || 0), 0);
    const unitPrice = parseFloat(
      ((product.price * (size.multiplier || 1.0)) + (crust.extraPrice || 0) + toppingsTotal).toFixed(2)
    );

    const cartKey = generateCartItemId(product, size, crust, extraToppings);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartKey === cartKey);
      if (existingIndex > -1) {
        const copy = [...prevItems];
        copy[existingIndex].quantity += quantity;
        return copy;
      } else {
        return [
          ...prevItems,
          {
            cartKey,
            productId: product.id,
            name: product.name,
            image: product.image,
            category: product.category,
            basePrice: product.price,
            unitPrice,
            size,
            crust,
            extraToppings,
            quantity,
            customNote
          }
        ];
      }
    });

    setIsDrawerOpen(true);
  };

  // Update item quantity
  const updateQuantity = (cartKey, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartKey);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.cartKey === cartKey ? { ...item, quantity: newQty } : item))
    );
  };

  // Remove item
  const removeFromCart = (cartKey) => {
    setItems((prev) => prev.filter((item) => item.cartKey !== cartKey));
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    setAppliedPromo(null);
  };

  // Apply promo code
  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    setPromoError('');

    if (PROMO_CODES[clean]) {
      setAppliedPromo({
        code: clean,
        ...PROMO_CODES[clean]
      });
      return { success: true, message: `Promo code "${clean}" successfully applied!` };
    } else {
      setPromoError('Invalid promo code. Try PIZZORA20 or CHEESE5');
      return { success: false, message: 'Invalid promo code.' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    setPromoError('');
  };

  // Computations
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);

  // Delivery fee: $3.99, but FREE over $30 or if FREESHIP applied
  let deliveryFee = subtotal > 0 ? (subtotal >= 30 ? 0 : 3.99) : 0;
  if (appliedPromo?.freeShipping) {
    deliveryFee = 0;
  }

  // Discount calculation
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountPercent) {
      discount = (subtotal * appliedPromo.discountPercent) / 100;
    } else if (appliedPromo.discountAmount) {
      discount = Math.min(subtotal, appliedPromo.discountAmount);
    }
  }

  const tax = subtotal > 0 ? (subtotal - discount) * 0.08 : 0; // 8% sales tax
  const total = Math.max(0, subtotal - discount + deliveryFee + tax);
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isDrawerOpen,
        setIsDrawerOpen,
        subtotal: parseFloat(subtotal.toFixed(2)),
        deliveryFee: parseFloat(deliveryFee.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        discount: parseFloat(discount.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        totalItemsCount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        promoError
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

