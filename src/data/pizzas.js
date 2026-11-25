// Comprehensive, realistic PIZZORA restaurant catalog with high-resolution Unsplash photography
export const PIZZA_SIZES = [
  { id: 'small', label: '25 cm', inches: '10"', multiplier: 0.85, sliceCount: 6, serves: '1-2 People' },
  { id: 'medium', label: '30 cm', inches: '12"', multiplier: 1.0, sliceCount: 8, serves: '2-3 People', isDefault: true },
  { id: 'large', label: '35 cm', inches: '14"', multiplier: 1.35, sliceCount: 10, serves: '3-4 People' }
];

export const PIZZA_CRUSTS = [
  { id: 'classic', label: 'Classic Hand-Tossed', extraPrice: 0, desc: 'Crispy exterior with an airy, chewy crumb' },
  { id: 'thin', label: 'Artisan Thin Crust', extraPrice: 0, desc: 'Ultra-thin, stone-baked crunchy Roman style' },
  { id: 'cheese-burst', label: 'Melted Cheese Burst', extraPrice: 15000, desc: 'Decadent pool of mozzarella inside the core' },
  { id: 'stuffed-garlic', label: 'Garlic Butter Stuffed', extraPrice: 18000, desc: 'Ring stuffed with aged gouda & roasted garlic butter' }
];

export const EXTRA_TOPPINGS = [
  { id: 'extra-cheese', name: 'Fresh Fior di Latte Mozzarella', price: 10000, category: 'cheese' },
  { id: 'pepperoni', name: 'Artisan Smoked Pepperoni', price: 12000, category: 'meat' },
  { id: 'truffle-oil', name: 'White Truffle Infused Oil', price: 15000, category: 'premium' },
  { id: 'mushrooms', name: 'Wild Sautéed Portobello', price: 8000, category: 'veg' },
  { id: 'olives', name: 'Kalamata Black Olives', price: 6000, category: 'veg' },
  { id: 'jalapenos', name: 'Fire-Roasted Jalapeños', price: 6000, category: 'veg' },
  { id: 'basil', name: 'Fresh Genovese Basil Leaves', price: 5000, category: 'veg' },
  { id: 'parmigiano', name: 'Aged 24-Mo Parmigiano Reggiano', price: 12000, category: 'cheese' }
];

export const CATEGORIES = [
  { 
    id: 'all', 
    label: 'All Items', 
    icon: 'Sparkles',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'pizza', 
    label: 'Pizzas', 
    icon: 'Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'burgers', 
    label: 'Burgers & Sandwiches', 
    icon: 'Flame',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'snacks', 
    label: 'Crispy Snacks & Wings', 
    icon: 'Zap',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'salads', 
    label: 'Fresh Salads', 
    icon: 'Leaf',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'soups', 
    label: 'Soups & Hot Meals', 
    icon: 'Soup',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'combos', 
    label: 'Deals & Combos', 
    icon: 'Gift',
    image: 'https://images.unsplash.com/photo-1544982503-9f984c14501a?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'drinks', 
    label: 'Beverages', 
    icon: 'Coffee',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80'
  },
  { 
    id: 'desserts', 
    label: 'Artisan Desserts', 
    icon: 'Cake',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=300&q=80'
  }
];

export const PRODUCTS = [
  // ================= 1. PIZZAS =================
  {
    id: 'truffle-burrata-bliss',
    name: 'Truffle Burrata Bliss',
    category: 'pizza',
    subCategory: 'pizza',
    price: 95000,
    originalPrice: 115000,
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
    category: 'pizza',
    subCategory: 'pizza',
    price: 78000,
    originalPrice: 92000,
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
    category: 'pizza',
    subCategory: 'pizza',
    price: 65000,
    originalPrice: 78000,
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
    category: 'pizza',
    subCategory: 'pizza',
    price: 82000,
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
    category: 'pizza',
    subCategory: 'pizza',
    price: 85000,
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
    category: 'pizza',
    subCategory: 'pizza',
    price: 79000,
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

  // ================= 2. BURGERS & SANDWICHES =================
  {
    id: 'black-angus-smash-burger',
    name: 'Double Black Angus Smash Burger',
    category: 'burgers',
    subCategory: 'burger',
    price: 52000,
    originalPrice: 62000,
    rating: 4.9,
    reviewsCount: 460,
    prepTime: '15-18 mins',
    calories: '820 kcal',
    badge: "Chef's Special",
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1000&q=80',
    description: 'Two smash patties of 100% prime Black Angus beef, double melted American cheddar, sweet caramelized shallots, dill pickles, and secret truffle burger sauce on toasted brioche.',
    ingredients: ['Black Angus Beef (2x100g)', 'Melted Cheddar', 'Caramelized Onion', 'House Truffle Burger Sauce', 'Brioche Bun']
  },
  {
    id: 'crispy-chicken-bbq-burger',
    name: 'Crispy Hot Chicken Supreme Burger',
    category: 'burgers',
    subCategory: 'burger',
    price: 44000,
    rating: 4.8,
    reviewsCount: 385,
    prepTime: '12-15 mins',
    calories: '750 kcal',
    badge: 'Best Seller',
    isVegetarian: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=1000&q=80',
    description: 'Golden buttermilk fried chicken breast, Nashville spice dip, crunchy purple cabbage slaw, chipotle aioli, and honey mustard glaze inside a soft glazed sesame bun.',
    ingredients: ['Crispy Buttermilk Chicken', 'Chipotle Aioli', 'Nashville Hot Glaze', 'Coleslaw', 'Sesame Brioche Bun']
  },

  // ================= 3. CRISPY SNACKS & WINGS =================
  {
    id: 'crispy-buffalo-wings',
    name: 'Crispy Buffalo Chicken Wings (8 pcs)',
    category: 'snacks',
    subCategory: 'snack',
    price: 42000,
    originalPrice: 50000,
    rating: 4.9,
    reviewsCount: 520,
    prepTime: '12-15 mins',
    calories: '610 kcal',
    badge: 'Popular',
    isVegetarian: false,
    isSpicy: true,
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1000&q=80',
    description: 'Crispy stone-baked chicken wings tossed in fiery Louisiana Buffalo butter glaze, served with cool buttermilk herb ranch and celery sticks.',
    ingredients: ['Fresh Chicken Wings (8 pcs)', 'Louisiana Buffalo Glaze', 'Buttermilk Ranch Dip', 'Fresh Celery']
  },
  {
    id: 'parmesan-truffle-fries',
    name: 'Parmesan & White Truffle Fries',
    category: 'snacks',
    subCategory: 'snack',
    price: 26000,
    rating: 4.8,
    reviewsCount: 410,
    prepTime: '8-10 mins',
    calories: '420 kcal',
    badge: 'Customer Fav',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1000&q=80',
    description: 'Hand-cut golden skin-on Idaho fries tossed with Italian white truffle oil, freshly grated 24-month Parmigiano-Reggiano, and chopped rosemary parsley sea salt.',
    ingredients: ['Skin-on Idaho Potatoes', 'White Truffle Oil', '24-Mo Parmigiano', 'Rosemary Parsley Flakes', 'Garlic Aioli']
  },
  {
    id: 'golden-mozzarella-sticks',
    name: 'Melted Mozzarella Sticks (6 pcs)',
    category: 'snacks',
    subCategory: 'snack',
    price: 32000,
    rating: 4.7,
    reviewsCount: 295,
    prepTime: '8-10 mins',
    calories: '480 kcal',
    badge: 'Cheese Lovers',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1531749668029-2db88e4276c7?auto=format&fit=crop&w=1000&q=80',
    description: 'Crisp herb-crusted mozzarella sticks with an irresistible hot cheese pull, served alongside warm San Marzano garlic herb marinara sauce.',
    ingredients: ['Real Mozzarella', 'Italian Herb Panko Crust', 'San Marzano Marinara Dip']
  },

  // ================= 4. FRESH SALADS =================
  {
    id: 'caesar-chicken-supreme',
    name: 'Classic Grilled Chicken Caesar Salad',
    category: 'salads',
    subCategory: 'salad',
    price: 44000,
    rating: 4.8,
    reviewsCount: 310,
    prepTime: '10-12 mins',
    calories: '450 kcal',
    badge: 'Best Seller',
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&w=1000&q=80',
    description: 'Crisp Romaine hearts, grilled free-range chicken breast, shaved Parmigiano-Reggiano, garlic butter sourdough croutons, and house creamy Caesar dressing.',
    ingredients: ['Crisp Romaine Lettuce', 'Grilled Chicken Breast', 'Parmigiano-Reggiano', 'Garlic Sourdough Croutons', 'House Caesar Dressing']
  },
  {
    id: 'burrata-caprese-salad',
    name: 'Burrata Caprese Garden Salad',
    category: 'salads',
    subCategory: 'salad',
    price: 54000,
    rating: 4.9,
    reviewsCount: 240,
    prepTime: '8-10 mins',
    calories: '380 kcal',
    badge: "Chef's Special",
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d69102a56?auto=format&fit=crop&w=1000&q=80',
    description: 'Fresh Pugliese burrata ball, colorful heirloom vine tomatoes, Genovese basil pesto, aged Modena balsamic glaze reduction, and sea salt crystals.',
    ingredients: ['Fresh Burrata Pugliese', 'Heirloom Vine Tomatoes', 'Genovese Basil Pesto', 'Modena Balsamic Glaze', 'Extra Virgin Olive Oil']
  },

  // ================= 5. SOUPS & HOT MEALS =================
  {
    id: 'creamy-wild-mushroom-soup',
    name: 'Creamy Forest Wild Mushroom Soup',
    category: 'soups',
    subCategory: 'soup',
    price: 32000,
    rating: 4.8,
    reviewsCount: 185,
    prepTime: '10-12 mins',
    calories: '340 kcal',
    badge: 'Customer Fav',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1000&q=80',
    description: 'Slow-simmered velvety cream soup made from Portobello and Porcini mushrooms, fresh thyme, cream, white wine essence, and toasted sourdough croutons.',
    ingredients: ['Wild Porcini & Portobello', 'Fresh Cream', 'Fresh Thyme', 'Toasted Sourdough Croutons']
  },
  {
    id: 'tuscan-tomato-basil-soup',
    name: 'Tuscan Roasted Tomato & Basil Soup',
    category: 'soups',
    subCategory: 'soup',
    price: 28000,
    rating: 4.7,
    reviewsCount: 140,
    prepTime: '10-12 mins',
    calories: '280 kcal',
    badge: 'Classic Heritage',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1000&q=80',
    description: 'Fire-roasted San Marzano tomatoes blended with sweet onions, garlic, fresh basil, extra virgin olive oil, and melted Fior di Latte cheese on top.',
    ingredients: ['Roasted San Marzano Tomatoes', 'Fresh Sweet Basil', 'Melted Mozzarella', 'Extra Virgin Olive Oil']
  },

  // ================= 6. DEALS & COMBOS =================
  {
    id: 'combo-famiglia-feast',
    name: 'PIZZORA Famiglia Party Feast',
    category: 'combos',
    subCategory: 'combo',
    price: 175000,
    originalPrice: 215000,
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
    price: 125000,
    originalPrice: 155000,
    rating: 4.9,
    reviewsCount: 380,
    prepTime: '20-25 mins',
    calories: 'Serves 2',
    badge: 'Date Night Hit',
    isVegetarian: false,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1590947132387-155cc02f3212?auto=format&fit=crop&w=1000&q=80',
    description: '1 Medium Gourmet Pizza + 1 Fresh Burrata Caprese Salad + 2 San Pellegrino Blood Orange Sodas + 2 Warm Chocolate Lava Cakes.',
    ingredients: ['1x Medium Pizza', 'Caprese Salad', '2x San Pellegrino Sodas', '2x Molten Lava Cakes']
  },

  // ================= 7. BEVERAGES =================
  {
    id: 'strawberry-mint-mojito',
    name: 'Fresh Strawberry Mint Mojito (Mocktail)',
    category: 'drinks',
    subCategory: 'beverage',
    price: 24000,
    rating: 4.9,
    reviewsCount: 270,
    prepTime: 'Instant',
    calories: '120 kcal',
    badge: 'Popular',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1000&q=80',
    description: 'Refreshing sparkling mocktail with crushed organic strawberries, fresh garden mint, fresh lime slices, and sparkling mineral water over ice.',
    ingredients: ['Fresh Strawberries', 'Wild Mint', 'Lime Slices', 'Pure Cane Sugar', 'Sparkling Mineral Water']
  },
  {
    id: 'beverage-blood-orange-soda',
    name: 'San Pellegrino Aranciata Rossa',
    category: 'drinks',
    subCategory: 'beverage',
    price: 20000,
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
    id: 'classic-iced-coffee-latte',
    name: 'Caramel Iced Latte Espresso',
    category: 'drinks',
    subCategory: 'beverage',
    price: 22000,
    rating: 4.8,
    reviewsCount: 195,
    prepTime: 'Instant',
    calories: '160 kcal',
    badge: 'Customer Fav',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=1000&q=80',
    description: 'Double shot of rich Arabica espresso poured over chilled whole milk, artisanal caramel drizzle, and ice crystals.',
    ingredients: ['Arabica Espresso', 'Fresh Whole Milk', 'Artisanal Caramel Drizzle', 'Ice']
  },

  // ================= 8. ARTISAN DESSERTS =================
  {
    id: 'san-sebastian-cheesecake',
    name: 'San Sebastian Basque Burnt Cheesecake',
    category: 'desserts',
    subCategory: 'dessert',
    price: 36000,
    originalPrice: 44000,
    rating: 5.0,
    reviewsCount: 480,
    prepTime: 'Instant',
    calories: '490 kcal',
    badge: "Chef's Special",
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=1000&q=80',
    description: 'Ultra-creamy Spanish Basque cheesecake with a beautifully caramelized exterior and melted custard center, served with warm Belgian chocolate sauce.',
    ingredients: ['Philadelphia Cream Cheese', 'Heavy Farm Cream', 'Madagascar Vanilla', 'Warm Belgian Chocolate Sauce']
  },
  {
    id: 'dessert-classic-tiramisu',
    name: 'Artisanal Treviso Tiramisu',
    category: 'desserts',
    subCategory: 'dessert',
    price: 34000,
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
    id: 'warm-chocolate-lava-cake',
    name: 'Warm Belgian Chocolate Molten Lava Cake',
    category: 'desserts',
    subCategory: 'dessert',
    price: 32000,
    rating: 4.9,
    reviewsCount: 320,
    prepTime: 'Instant',
    calories: '460 kcal',
    badge: 'Popular',
    isVegetarian: true,
    isSpicy: false,
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=1000&q=80',
    description: 'Warm chocolate sponge cake with a rich flowing molten dark chocolate center, dusted with powdered sugar and served warm.',
    ingredients: ['70% Belgian Dark Chocolate', 'Farm Fresh Butter', 'Dutch Cocoa', 'Vanilla Gelato']
  }
];

export const SPECIAL_OFFERS = [
  {
    id: 'offer-1',
    code: 'PIZZORA20',
    discount: '20% CHEGIRMA',
    title: 'Telegram Obunachilariga Bayramona Chegirma',
    description: "120 000 so'mdan yuqori birinchi buyurtmaga 20% maxsus promokod faqat bizning Telegram kanalimizda e'lon qilinadi.",
    bgColor: 'from-amber-500 to-brand-500',
    expiresIn: 'Telegram kanalimizda',
    tag: 'TELEGRAM KANALDAN',
    telegramUrl: 'https://t.me/pizzora_uz'
  },
  {
    id: 'offer-2',
    code: 'CHEESELOVER',
    discount: 'TEKIN QO‘SHIMCHA XAMIR',
    title: 'Chorshanba Pishloq Sehri Bonusi',
    description: 'Katta pitsalarga pishloqli yoki sarimsoqli xamir qirrasi bepul beriladi. Promokod Telegram kanalimizda faollashadi.',
    bgColor: 'from-orange-500 to-rose-500',
    expiresIn: 'Telegram kanalimizda',
    tag: 'TELEGRAM KANALDAN',
    telegramUrl: 'https://t.me/pizzora_uz'
  },
  {
    id: 'offer-3',
    code: 'FREESHIP',
    discount: 'BEPUL YETKAZIB BERISH',
    title: "150 000 so'mdan Yuqori Buyurtmalarga",
    description: "O‘tin pechidan to‘g‘ridan-to‘g‘ri issiq holda 30 daqiqada bepul yetkaziladi. Yangi promokodlarni Telegram kanalimizdan oling!",
    bgColor: 'from-brand-600 to-amber-600',
    expiresIn: 'Telegram kanalimizda',
    tag: 'TELEGRAM KANALDAN',
    telegramUrl: 'https://t.me/pizzora_uz'
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
