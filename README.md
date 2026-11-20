# 🍕 PIZZORA — Taste the Happiness.
> **Premium Artisanal Pizza Ordering & Delivery Platform**

A complete, production-ready, highly polished pizza ordering web application built for the independent brand **PIZZORA**. Designed with inspiration from modern Dribbble food delivery interfaces, featuring warm cream backgrounds, vibrant orange branding (`#F36F21`), rounded cards, smooth Framer Motion micro-interactions, full shopping cart drawer, interactive pizza customization (sizes, crusts, extra toppings), authentication, checkout, live kitchen tracker, and an operations admin dashboard.

---

## 🚀 Live Demo & Development Server
The development server is running locally:
- **URL:** [http://127.0.0.1:3000/](http://127.0.0.1:3000/)

To run or restart the project locally:
```bash
# Install dependencies (already installed)
npm install

# Start Vite development server
npm run dev

# Run production build
npm run build
```

---

## 🍕 Brand Identity & Design System
- **Brand:** PIZZORA
- **Tagline:** Taste the Happiness.
- **Primary Color:** Orange (`#F36F21` / `brand-500`)
- **Background:** Warm White (`#FFFDF9`) & Soft Cream (`#FFF9F2`)
- **Typography:** Outfit (Display & Headings) + Plus Jakarta Sans (Body)
- **Visuals:** High-resolution stone-baked pizza photography, soft shadows (`shadow-soft`), badge accents ("Save 30%", "Pure 100% Mozzarella", "Chef's Special").

---

## 🗝️ Demo Accounts & 1-Click Login

The login page includes convenient **1-Click Demo Logins** for instant evaluation:

| Account Type | Email | Password | Role & Access |
| :--- | :--- | :--- | :--- |
| **Customer** | `alex@pizzora.com` | `pizza123` | Customer profile, past order history, saved addresses, wishlist |
| **Kitchen Admin** | `admin@pizzora.com` | `admin123` | Full access to `/admin` dashboard, order status switcher, product manager |

> **Note:** Custom registrations via `/register` are also fully supported and stored safely in local persistent storage.

---

## 🛠️ Complete Feature Walkthrough

### 1. 🏠 Homepage (`/`)
- Top promotional announcement bar with discount codes and free delivery banner
- Glassmorphism navigation bar with PIZZORA branding, dynamic cart badge, and responsive dropdowns
- Hero section with headline *"Fresh Pizza, Happy Moments"*, stone-deck pizza plate showcase with 3D rotation hover, floating badges ("Save 30%", "Pure 100% Italian Mozzarella"), and stats (25+ Pizzas, 25 min Avg delivery, 4.9★ rating)
- Quick category strip (Signature, Classic, Spicy, Combos, Drinks, Desserts)
- Crowd-favorite popular pizzas with instant customization & quick-add
- Interactive promo vouchers with 1-click clipboard copy (`PIZZORA20`, `CHEESELOVER`, `FREESHIP`)
- "Why PIZZORA" 4-pillar craft section (72h cold-fermented sourdough, 480°C stone deck, San Marzano DOP, thermal insulated delivery)
- App preview card and verified customer testimonials
- Comprehensive footer with social channels, store hours, and warranty

### 2. 🍕 Menu & Discovery Page (`/menu`)
- Category tabs with smooth transitions
- Instant live search by pizza name, category, or ingredients
- Dietary filters: **Vegetarian Only** & **Spicy Only**
- Sorting: Most Popular, Highest Rated, Price: Low to High, Price: High to Low
- Product cards with calorie counts, preparation time, star ratings, and customizable CTA

### 3. 🔍 Interactive Pizza Customizer (`/product/:id`)
- High-res hero pizza photography
- **Size Selector:** 25 cm (6 slices), 30 cm (8 slices), 35 cm (10 slices) with dynamic multiplier
- **Crust Selection:** Classic Hand-Tossed, Artisan Thin Crust, Melted Cheese Burst (+ $2.99), Garlic Butter Stuffed (+ $3.49)
- **Extra Toppings Checklist:** Smoked Pepperoni, Fior di Latte Mozzarella, White Truffle Oil, Wild Portobello, Kalamata Olives, Fire-Roasted Jalapeños, Fresh Basil, Parmigiano-Reggiano
- Special order instructions / chef notes input
- Real-time dynamic total price calculation
- Animated success toast and related cravings recommendations

### 4. 🛒 Shopping Cart & Cart Drawer (`/cart` & Drawer)
- Persistent across page reloads via `localStorage`
- Slide-over quick drawer with free shipping progress bar (Free delivery over $30)
- Quantity steppers and item deletion
- Dedicated `/cart` view with upsell add-ons (beverages & artisanal desserts)
- Real-time calculations: Subtotal, Delivery Fee, 8% Tax, Promo Discount, Total
- Promo code engine:
  - `PIZZORA20` — 20% discount
  - `CHEESE5` — $5.00 off
  - `FREESHIP` — 100% Free Express Delivery

### 5. 💳 Checkout (`/checkout`)
- Contact information: Full Name, Email, Phone
- Delivery address: Street, Apt/Suite, City, Postal Code, Driver notes
- Timing selector: ASAP (20-30 mins) or Scheduled Delivery
- Payment method options: Credit/Debit Card (with demo card fields), Apple Pay / Google Pay, and Cash on Delivery
- Live breakdown review and order submission with celebratory confetti!

### 6. ⏱️ Live Order Tracking & Confirmation (`/order-confirmation/:id`)
- Order reference receipt with items and delivery address
- 5-stage interactive kitchen timeline:
  1. **Order Confirmed**
  2. **Stone Oven Baking** (480°C hearth)
  3. **Quality Inspected**
  4. **Out with Driver**
  5. **Delivered Hot**
- **Demo Progress Simulator Button:** Allows you to manually advance the kitchen order status in real time to see the timeline change!

### 7. 🔐 Authentication (`/login` & `/register`)
- **Login Page (`/login`):** Dribbble-inspired split-screen layout with large photo showcase on left and clean form on right, show/hide password toggle, remember me checkbox, forgot password modal, validation messages, and 1-click demo logins.
- **Register Page (`/register`):** Matching split-screen design, full name, email, phone, password and password confirmation validation, and terms agreement.
- Protected user state and safe session storage.

### 8. 👤 User Account & Profile (`/account`)
- User avatar, name, email, phone, and saved delivery address
- In-place profile editor with instant saving
- Bookmarked favorite pizzas with 1-click reorder
- Recent order history summary with direct link to tracker

### 9. 📦 Order History (`/orders`)
- Comprehensive list of past customer orders
- Status pills (Delivered, Baking, Out for Delivery)
- 1-click **"Reorder"** button that re-populates the cart with the exact configuration

### 10. 🛡️ Kitchen Operations Admin Dashboard (`/admin`)
- Total Revenue ($), Total Orders, Average Order Value ($), and Active In Kitchen metrics
- Live orders queue table with real-time status changer dropdown (syncs directly with the customer tracking page)
- Menu catalog manager: add new pizzas/items with custom pricing, categories, badges, and descriptions; toggle and delete items

---

## 📁 Project Structure
```
c:\Users\User\Desktop\pizza\
├── src\
│   ├── components\
│   │   ├── cart\
│   │   │   └── CartDrawer.jsx
│   │   ├── home\
│   │   │   ├── Hero.jsx
│   │   │   ├── SpecialOffers.jsx
│   │   │   ├── WhyPizzora.jsx
│   │   │   └── Testimonials.jsx
│   │   ├── layout\
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   └── menu\
│   │       └── ProductCard.jsx
│   ├── context\
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── OrderContext.jsx
│   ├── data\
│   │   └── pizzas.js
│   ├── pages\
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   ├── OrderConfirmationPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── AccountPage.jsx
│   │   ├── OrdersPage.jsx
│   │   ├── AdminPage.jsx
│   │   ├── AboutPage.jsx
│   │   └── ContactPage.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

