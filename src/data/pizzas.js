// Comprehensive, realistic PIZZORA catalog with high-resolution Unsplash photography
export const PIZZA_SIZES = [
  { id: 'small', label: '25 cm', inches: '10"', multiplier: 0.85, sliceCount: 6, serves: '1-2 People' },
  { id: 'medium', label: '30 cm', inches: '12"', multiplier: 1.0, sliceCount: 8, serves: '2-3 People', isDefault: true },
  { id: 'large', label: '35 cm', inches: '14"', multiplier: 1.35, sliceCount: 10, serves: '3-4 People' }
];

export const PIZZA_CRUSTS = [
  { id: 'classic', label: 'Classic Hand-Tossed', extraPrice: 0, desc: 'Crispy exterior with an airy, chewy crumb' },
  { id: 'thin', label: 'Artisan Thin Crust', extraPrice: 0, desc: 'Ultra-thin, stone-baked crunchy Roman style' },
  { id: 'cheese-burst', label: 'Melted Cheese Burst', extraPrice: 2.99, desc: 'Decadent pool of mozzarella inside the core' },
  { id: 'stuffed-garlic', label: 'Garlic Butter Stuffed', extraPrice: 3.49, desc: 'Ring stuffed with aged gouda & roasted garlic butter' }
];

export const EXTRA_TOPPINGS = [
  { id: 'extra-cheese', name: 'Fresh Fior di Latte Mozzarella', price: 1.99, category: 'cheese' },
  { id: 'pepperoni', name: 'Artisan Smoked Pepperoni', price: 2.49, category: 'meat' },
  { id: 'truffle-oil', name: 'White Truffle Infused Oil', price: 2.99, category: 'premium' },
  { id: 'mushrooms', name: 'Wild Sautéed Portobello', price: 1.50, category: 'veg' },
  { id: 'olives', name: 'Kalamata Black Olives', price: 1.25, category: 'veg' },
  { id: 'jalapenos', name: 'Fire-Roasted Jalapeños', price: 1.25, category: 'veg' },
  { id: 'basil', name: 'Fresh Genovese Basil Leaves', price: 0.99, category: 'veg' },
  { id: 'parmigiano', name: 'Aged 24-Mo Parmigiano Reggiano', price: 2.25, category: 'cheese' }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Items', icon: 'Sparkles' },
  { id: 'signature', label: 'Signature Pizzas', icon: 'Flame' },
  { id: 'classic', label: 'Classic Italian', icon: 'Pizza' },
  { id: 'spicy', label: 'Hot & Fiery', icon: 'Zap' },
  { id: 'combos', label: 'Deals & Combos', icon: 'Gift' },
  { id: 'drinks', label: 'Beverages', icon: 'Coffee' },
  { id: 'desserts', label: 'Artisan Desserts', icon: 'Cake' }
];

export const PRODUCTS = [
  {
    id: 'truffle-burrata-bliss',
    name: 'Truffle Burrata Bliss',
    category: 'signature',
    subCategory: 'pizza',
    price: 18.99,
    rating: 4.9,
    reviewsCount: 342,
    prepTime: '20-25 mins',
    calories: '890 kcal',
    badge: "Chef's Special",
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1000&q=80',
    description: 'Whole creamy artisanal burrata placed atop organic San Marzano tomato sauce, sautéed forest wild mushrooms, and drizzled with fragrant white truffle oil and micro herbs.',
    ingredients: ['San Marzano Tomatoes', 'Fresh Burrata Pugliese', 'Wild Portobello', 'White Truffle Oil', 'Genovese Basil', '24-Mo Parmigiano']
  },
  {
    id: 'fiery-diavola-pepperoni',
    name: 'Fiery Diavola Pepperoni',
    category: 'signature',
    subCategory: 'pizza',
    price: 16.99,
    rating: 4.8,
    reviewsCount: 512,
    prepTime: '18-22 mins',
    calories: '980 kcal',
    badge: 'Popular',
    isVegetarian: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=1000&q=80',
    description: 'Crispy spiced artisan pepperoni curled into crispy grease cups, Calabrian chili honey drizzle, charred red onions, and hot smoked mozzarella on our 72-hour fermented sourdough.',
    ingredients: ['Artisan Pepperoni', 'Calabrian Chili Honey', 'Smoked Fior di Latte', 'San Marzano Sauce', 'Roasted Garlic']
  },
  {
    id: 'margherita-d-oro',
    name: 'Margherita D’Oro',
    category: 'classic',
    subCategory: 'pizza',
    price: 13.99,
    rating: 4.9,
    reviewsCount: 780,
    prepTime: '15-18 mins',
    calories: '760 kcal',
    badge: 'Classic Heritage',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=1000&q=80',
    description: 'The golden classic of Naples. Sweet DOP San Marzano tomatoes, buffalo mozzarella from Campania, hand-torn sweet basil, and a finishing swirl of cold-pressed extra virgin olive oil.',
    ingredients: ['DOP San Marzano Tomatoes', 'Campania Buffalo Mozzarella', 'Sweet Basil', 'Cold-Pressed EVO Oil', 'Sea Salt Flakes']
  },
  {
    id: 'smokey-bbq-chicken-supreme',
    name: 'Smokey BBQ Pollo Supreme',
    category: 'signature',
    subCategory: 'pizza',
    price: 17.49,
    rating: 4.8,
    reviewsCount: 420,
    prepTime: '20-25 mins',
    calories: '940 kcal',
    badge: 'Customer Fav',
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1000&q=80',
    description: 'Slow-smoked tender chicken breast glazed in our signature honey hickory bourbon BBQ sauce, sweet charred sweetcorn, smoked gouda, pickled red onion pearls, and cilantro.',
    ingredients: ['Smoked Pulled Chicken', 'Honey Hickory BBQ Glaze', 'Smoked Gouda', 'Caramelized Onion', 'Fresh Cilantro']
  },
  {
    id: 'quattro-formaggi-royale',
    name: 'Quattro Formaggi Royale',
    category: 'classic',
    subCategory: 'pizza',
    price: 16.50,
    rating: 4.7,
    reviewsCount: 290,
    prepTime: '18-20 mins',
    calories: '1020 kcal',
    badge: 'Cheese Lovers',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1573821663912-569905455b1c?auto=format&fit=crop&w=1000&q=80',
    description: 'A harmonious symphony of four world-class cheeses: Fior di Latte Mozzarella, aged Gorgonzola Dolce, creamy Taleggio, and 24-month shaved Parmigiano-Reggiano with thyme blossom honey.',
    ingredients: ['Fior di Latte', 'Gorgonzola Dolce', 'Taleggio DOP', 'Parmigiano-Reggiano', 'Thyme Blossom Honey']
  },
  {
    id: 'inferno-habanero-carnivore',
    name: 'Inferno Habanero Carnivore',
    category: 'spicy',
    subCategory: 'pizza',
    price: 18.50,
    rating: 4.8,
    reviewsCount: 310,
    prepTime: '20-22 mins',
    calories: '1050 kcal',
    badge: 'Extremely Spicy 🔥',
    isVegetarian: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1000&q=80',
    description: 'For genuine spice thrill-seekers. Spiced Italian nduja, spicy chorizo crisps, smoked beef brisket, pickled habanero slices, and spicy ghost pepper infused maple dip.',
    ingredients: ['Spicy Calabrian Nduja', 'Spanish Chorizo', 'Smoked Brisket', 'Pickled Habanero', 'Pepper Jack Cheese']
  },
  {
    id: 'garden-mediterranean-pesto',
    name: 'Garden Pesto & Sun-Dried Tomato',
    category: 'signature',
    subCategory: 'pizza',
    price: 15.99,
    rating: 4.7,
    reviewsCount: 195,
    prepTime: '18-22 mins',
    calories: '790 kcal',
    badge: 'Vegetarian Delight',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=1000&q=80',
    description: 'Nut-free vibrant basil pine pesto base, sun-ripened cherry tomatoes, grilled artichoke hearts, kalamata olives, crumbled Greek feta, and baby wild arugula.',
    ingredients: ['Genovese Basil Pesto', 'Semi-Dried Cherry Tomatoes', 'Artichoke Hearts', 'Greek Sheep Feta', 'Baby Arugula']
  },
  {
    id: 'combo-famiglia-feast',
    name: 'PIZZORA Famiglia Party Feast',
    category: 'combos',
    subCategory: 'combo',
    price: 39.99,
    originalPrice: 49.99,
    rating: 5.0,
    reviewsCount: 640,
    prepTime: '25-30 mins',
    calories: 'Serves 4-6',
    badge: 'Save 20%',
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=1000&q=80',
    description: 'Any 2 Large 35cm Signature Pizzas + 1 Artisanal Garlic Parmesan Dough Knots + 2 House Crafted Sodas + 1 Nutella Tiramisu Jar. Perfect for game nights and gatherings!',
    ingredients: ['2x Large Pizzas of Choice', 'Garlic Knots with Marinara', '2x Crafted Sodas', '1x Family Nutella Tiramisu']
  },
  {
    id: 'combo-duo-date-night',
    name: 'Romantic Duo Date Night Combo',
    category: 'combos',
    subCategory: 'combo',
    price: 26.99,
    originalPrice: 32.99,
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '20-25 mins',
    calories: 'Serves 2',
    badge: 'Date Night Hit',
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
    description: '1 Medium Gourmet Pizza + 1 Fresh Burrata Caprese Salad + 2 San Pellegrino Blood Orange Sodas + 2 Warm Chocolate Lava Cakes.',
    ingredients: ['1x Medium Pizza', 'Caprese Salad', '2x San Pellegrino Sodas', '2x Molten Lava Cakes']
  },
  {
    id: 'beverage-blood-orange-soda',
    name: 'San Pellegrino Aranciata Rossa',
    category: 'drinks',
    subCategory: 'beverage',
    price: 3.75,
    rating: 4.9,
    reviewsCount: 154,
    prepTime: 'Instant',
    calories: '130 kcal',
    badge: 'Imported',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=1000&q=80',
    description: 'Sparkling Italian blood orange beverage made with 100% Mediterranean sun-ripened fruit juices for an exhilarating citrus sparkle.',
    ingredients: ['Italian Sparkling Water', 'Blood Orange Juice', 'Natural Cane Sugar', 'Citrus Extracts']
  },
  {
    id: 'beverage-craft-lemonade',
    name: 'Sicilian Mint & Lemon Quencher',
    category: 'drinks',
    subCategory: 'beverage',
    price: 4.25,
    rating: 4.8,
    reviewsCount: 180,
    prepTime: 'Instant',
    calories: '110 kcal',
    badge: 'House Special',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    description: 'Cold-pressed Sicilian lemon juice, bruised sweet mint leaves, organic agave nectar, and sparkling spring water over crushed crystal ice.',
    ingredients: ['Fresh Lemon Juice', 'Wild Mint', 'Organic Agave', 'Sparkling Mineral Water']
  },
  {
    id: 'dessert-classic-tiramisu',
    name: 'Artisanal Treviso Tiramisu',
    category: 'desserts',
    subCategory: 'dessert',
    price: 7.99,
    rating: 4.9,
    reviewsCount: 412,
    prepTime: 'Instant',
    calories: '420 kcal',
    badge: 'Best Seller',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=1000&q=80',
    description: 'Espresso-soaked Savoiardi ladyfingers layered with velvety cloud-like mascarpone cream, lightly dusted with Valrhona Dutch cocoa powder.',
    ingredients: ['Italian Mascarpone', 'Savoiardi Ladyfingers', 'Illy Dark Espresso', 'Valrhona Cocoa']
  },
  {
    id: 'dessert-pistachio-cannoli',
    name: 'Bronte Pistachio Crisp Cannoli (3 pcs)',
    category: 'desserts',
    subCategory: 'dessert',
    price: 6.99,
    rating: 4.8,
    reviewsCount: 220,
    prepTime: 'Instant',
    calories: '380 kcal',
    badge: 'Authentic Sicilian',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=1000&q=80',
    description: 'Golden fried bubbly pastry shells filled to order with sweet sheep ricotta, scented with orange blossom and dipped in crushed Sicilian Bronte pistachios.',
    ingredients: ['Crispy Pastry Shell', 'Sheep Milk Ricotta', 'Bronte Pistachios', 'Orange Blossom Essence']
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 'offer-1',
    code: 'PIZZORA20',
    discount: '20% OFF',
    title: 'Welcome Celebration Feast',
    description: 'Get 20% off on your entire first order over $25 with promo code PIZZORA20.',
    bgColor: 'from-amber-500 to-brand-500',
    expiresIn: 'Limited Time',
    tag: 'FIRST ORDER'
  },
  {
    id: 'offer-2',
    code: 'CHEESELOVER',
    discount: 'FREE CRUST UPGRADE',
    title: 'Melted Cheese Burst Wednesday',
    description: 'Upgrade any large pizza to Cheese Burst or Stuffed Crust totally on the house.',
    bgColor: 'from-orange-500 to-rose-500',
    expiresIn: 'Every Midweek',
    tag: 'SPECIAL BONUS'
  },
  {
    id: 'offer-3',
    code: 'FREESHIP',
    discount: 'FREE DELIVERY',
    title: 'Zero Delivery Fee Above $30',
    description: 'Hot, piping pizza straight from our stone oven to your door within 30 minutes or free.',
    bgColor: 'from-brand-600 to-amber-600',
    expiresIn: 'Always Active',
    tag: 'AUTO APPLIED'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Food Blogger & Critic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    comment: 'PIZZORA completely redefined what delivered pizza tastes like. The 72-hour sourdough crust has that unmistakable leopard-spotted Neapolitan char and chewiness. 10/10!',
    rating: 5,
    favoritePizza: 'Truffle Burrata Bliss'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Software Architect & Pizza Enthusiast',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    comment: 'The order arrived in 24 minutes piping hot! The Fiery Diavola is the real deal—hot honey glaze balance is pure culinary artistry. Website ordering was super smooth.',
    rating: 5,
    favoritePizza: 'Fiery Diavola Pepperoni'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Creative Director',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    comment: 'Ordered the Famiglia Party Feast for our studio team lunch. Everyone was blown away by the quality of the ingredients. The Burrata was silky smooth!',
    rating: 5,
    favoritePizza: 'PIZZORA Famiglia Party Feast'
  }
];

