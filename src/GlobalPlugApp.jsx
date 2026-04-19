import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShoppingCart, CheckCircle, ArrowLeft, Lock, Package } from 'lucide-react';

const GlobalPlugApp = () => {
  const [view, setView] = useState('home'); // 'home', 'product', 'checkout'
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pricingMode, setPricingMode] = useState('single');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cartItems, setCartItems] = useState([]);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: 'Edmonton, AB',
    postalCode: '',
    cardNumber: '',
  });

  const products = [
    {
      id: 'arctic-x',
      name: 'Arctic-X',
      single: 450,
      wholesale: 350,
      description: 'Premium cooling technology',
      icon: '❄️',
      specs: [
        'Aerospace Grade Materials',
        'Instant Heating Technology',
        'Dual-Zone Temperature Control',
        'Silent Motor (45dB)',
        '5-Year Warranty',
        '220V or 110V Compatible',
      ],
      details: 'The Arctic-X represents peak performance in premium bidet engineering. Featuring aerospace-grade stainless steel and instant heating technology, this system delivers uncompromising comfort with whisper-quiet operation.',
    },
    {
      id: 'jasper',
      name: 'Jasper Comfort',
      single: 299,
      wholesale: 199,
      description: 'Entry-level excellence',
      icon: '⚡',
      specs: [
        'Durable Polycarbonate Shell',
        'Adjustable Water Pressure',
        'Basic Heating Function',
        'Energy Efficient Design',
        '3-Year Warranty',
        'Compact Form Factor',
      ],
      details: 'Jasper Comfort brings accessibility to everyone. No compromises on core functionality, engineered for reliability and simplicity. Perfect for first-time bidet users or cost-conscious buyers.',
    },
    {
      id: 'aurora',
      name: 'Aurora Elite',
      single: 650,
      wholesale: 499,
      description: 'Flagship intelligence',
      icon: '✨',
      specs: [
        'Smart IoT Integration',
        'AI-Powered Pressure Detection',
        'Nightlight & Deodorizer',
        'Self-Cleaning Nozzle System',
        'Heated Seat (5 Levels)',
        '5-Year Premium Warranty + Support',
      ],
      details: 'Aurora Elite is the pinnacle of bidet innovation. With AI-powered user detection, IoT integration, and a fully autonomous cleaning system, this flagship model learns your preferences and adapts in real-time.',
    },
  ];

  // Mouse tracking for spotlight
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const getPrice = (product) => {
    return pricingMode === 'single' ? product.single : product.wholesale;
  };

  const navigateToProduct = (productId) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product);
    setView('product');
  };

  const navigateToCheckout = () => {
    setView('checkout');
  };

  const addToCart = (product) => {
    setCartItems([...cartItems, { ...product, price: getPrice(product) }]);
  };

  const goBack = () => {
    setView('home');
    setSelectedProduct(null);
  };

  const completeOrder = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      setCartItems([]);
      setFormData({
        name: '',
        email: '',
        address: 'Edmonton, AB',
        postalCode: '',
        cardNumber: '',
      });
      setView('home');
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  // Page transition variants
  const pageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const pageTransition = {
    x: { type: 'spring', stiffness: 300, damping: 30 },
    opacity: { duration: 0.5 },
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white font-mono overflow-x-hidden relative">
      {/* ANIMATED BACKGROUND WITH MESH GRADIENT */}
      <div className="fixed inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full opacity-40" preserveAspectRatio="xMidYMid slice">
          <defs>
            <filter id="noise">
              <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="4" result="noise" seed="2" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="80" xChannelSelector="R" yChannelSelector="G" />
            </filter>
            <radialGradient id="meshGrad1" cx="20%" cy="20%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="meshGrad2" cx="80%" cy="80%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#meshGrad1)" />
          <rect width="100%" height="100%" fill="url(#meshGrad2)" />
          <circle cx="20%" cy="30%" r="300" fill="rgba(59, 130, 246, 0.1)" filter="url(#noise)" />
          <circle cx="80%" cy="70%" r="250" fill="rgba(6, 182, 212, 0.1)" filter="url(#noise)" />
        </svg>

        {/* Cursor-following spotlight */}
        <motion.div
          className="absolute w-96 h-96 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(59, 130, 246, 0) 70%)',
            x: mousePosition.x - 192,
            y: mousePosition.y - 192,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        />
      </div>

      {/* CONTENT */}
      <div className="relative z-10">
        <AnimatePresence mode="wait" custom={1}>
          {/* HOME VIEW */}
          {view === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              transition={pageTransition}
            >
              <HomeView
                products={products}
                pricingMode={pricingMode}
                setPricingMode={setPricingMode}
                navigateToProduct={navigateToProduct}
                getPrice={getPrice}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
              />
            </motion.div>
          )}

          {/* PRODUCT DETAIL VIEW */}
          {view === 'product' && selectedProduct && (
            <motion.div
              key="product"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={-1}
              transition={pageTransition}
            >
              <ProductDetailView
                product={selectedProduct}
                pricingMode={pricingMode}
                getPrice={getPrice}
                goBack={goBack}
                addToCart={addToCart}
                navigateToCheckout={navigateToCheckout}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
              />
            </motion.div>
          )}

          {/* CHECKOUT VIEW */}
          {view === 'checkout' && (
            <motion.div
              key="checkout"
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={-1}
              transition={pageTransition}
            >
              <CheckoutView
                cartItems={cartItems}
                formData={formData}
                setFormData={setFormData}
                goBack={goBack}
                completeOrder={completeOrder}
                orderComplete={orderComplete}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
                buttonVariants={buttonVariants}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8); }
        }

        @keyframes secure-lock {
          0% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.2) rotate(5deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .secure-lock {
          animation: secure-lock 0.6s ease-in-out;
        }

        body {
          background-color: #020617;
        }
      `}</style>
    </div>
  );
};

// ============================================
// HOME VIEW COMPONENT
// ============================================
const HomeView = ({
  products,
  pricingMode,
  setPricingMode,
  navigateToProduct,
  getPrice,
  containerVariants,
  itemVariants,
  buttonVariants,
}) => {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            variants={itemVariants}
            className="text-7xl md:text-8xl font-black mb-4 tracking-tighter"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #00bccc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '0 0 60px rgba(59, 130, 246, 0.8), 0 0 30px rgba(0, 212, 255, 0.6)',
              filter: 'drop-shadow(0 0 40px rgba(59, 130, 246, 0.5))',
            }}
          >
            GLOBAL PLUG
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-cyan-400 mb-8 tracking-widest"
          >
            CYBER-INDUSTRIAL BIDET SYSTEMS
          </motion.p>

          {/* Pricing Toggle */}
          <motion.div variants={itemVariants} className="mb-12 flex justify-center gap-4">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => setPricingMode('single')}
              className={`px-6 py-2 text-sm font-bold tracking-widest uppercase border-2 transition-all ${
                pricingMode === 'single'
                  ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300'
                  : 'border-gray-600 text-gray-400 hover:border-cyan-400/50'
              }`}
            >
              Single
            </motion.button>
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              onClick={() => setPricingMode('wholesale')}
              className={`px-6 py-2 text-sm font-bold tracking-widest uppercase border-2 transition-all ${
                pricingMode === 'wholesale'
                  ? 'border-lime-400 bg-lime-400/20 text-lime-300'
                  : 'border-gray-600 text-gray-400 hover:border-lime-400/50'
              }`}
            >
              Wholesale
            </motion.button>
          </motion.div>

          {/* CTA */}
          <motion.div variants={itemVariants} className="flex gap-6 justify-center flex-wrap">
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
              className="px-8 py-4 bg-blue-500 text-white font-bold tracking-widest uppercase text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/50"
            >
              <ShoppingCart className="inline mr-2" size={18} />
              Shop Now
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemVariants} className="mt-16 pt-12 border-t border-blue-500/30 flex gap-16 justify-center flex-wrap">
            <div>
              <div className="text-3xl font-black text-blue-400">3</div>
              <div className="text-xs text-gray-500 tracking-widest mt-2">MODELS</div>
            </div>
            <div>
              <div className="text-3xl font-black text-cyan-400">$199+</div>
              <div className="text-xs text-gray-500 tracking-widest mt-2">STARTING</div>
            </div>
            <div>
              <div className="text-3xl font-black text-blue-400">5YR</div>
              <div className="text-xs text-gray-500 tracking-widest mt-2">WARRANTY</div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* PRODUCTS SECTION */}
      <section className="relative py-24 px-8 border-t border-blue-500/30">
        <motion.div
          className="max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div variants={itemVariants} className="mb-16">
            <div className="text-xs text-cyan-400 tracking-widest mb-4 font-bold">
              — LINEUP —
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter">
              <span className="text-blue-400">BIDET</span> SYSTEMS
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
          >
            {products.map((product, idx) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -8 }}
                onClick={() => navigateToProduct(product.id)}
                className={`${
                  idx === 2 ? 'lg:col-span-2 lg:aspect-video' : 'lg:col-span-1 aspect-square'
                } bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500/30 hover:border-blue-400 relative overflow-hidden group cursor-pointer transition-all`}
              >
                <div className="absolute inset-0 bg-repeat opacity-0 group-hover:opacity-20 transition-opacity"
                  style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.5) 0px, rgba(59, 130, 246, 0.5) 1px, transparent 1px, transparent 2px)',
                    animation: 'scan 3s linear infinite'
                  }}
                />

                <div className="absolute inset-0 flex items-center justify-center opacity-60 group-hover:opacity-100 transition-opacity">
                  <div className={idx === 2 ? 'text-8xl' : 'text-6xl'}>{product.icon}</div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform"
                  initial={{ y: 20 }}
                >
                  <h3 className="text-xl font-black tracking-wider text-blue-400 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-3">{product.description}</p>
                  <p className="text-2xl font-black text-cyan-400">
                    ${getPrice(product)}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-8 text-center border-t border-blue-500/30">
        <p className="text-xs text-gray-600 tracking-widest">
          © 2026 GLOBAL PLUG | CYBER-INDUSTRIAL BIDET SYSTEMS
        </p>
      </footer>
    </>
  );
};

// ============================================
// PRODUCT DETAIL VIEW COMPONENT
// ============================================
const ProductDetailView = ({
  product,
  pricingMode,
  getPrice,
  goBack,
  addToCart,
  navigateToCheckout,
  containerVariants,
  itemVariants,
  buttonVariants,
}) => {
  const [addedToCart, setAddedToCart] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen py-20 px-8">
      {/* Back Button */}
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onClick={goBack}
        className="mb-12 px-6 py-3 border-2 border-blue-500/50 text-blue-400 font-bold tracking-widest uppercase text-sm hover:border-blue-400 transition-all flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        BACK
      </motion.button>

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          {/* Product Hero */}
          <motion.div
            variants={itemVariants}
            className="aspect-square bg-gradient-to-br from-gray-900 to-black border-2 border-blue-500/30 relative overflow-hidden flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-repeat opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(59, 130, 246, 0.5) 0px, rgba(59, 130, 246, 0.5) 1px, transparent 1px, transparent 2px)',
              }}
            />
            <div className="text-9xl">{product.icon}</div>
          </motion.div>

          {/* Product Info */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter mb-6">
              <span className="text-cyan-400">{product.name.toUpperCase()}</span>
            </h1>

            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              {product.details}
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-xs text-gray-500 tracking-widest mb-2">PRICE</p>
              <p className="text-5xl font-black text-blue-400">
                ${getPrice(product)}
              </p>
            </div>

            {/* Specs */}
            <div className="mb-12">
              <p className="text-xs text-gray-500 tracking-widest mb-4">TECHNICAL SPECIFICATIONS</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specs.map((spec, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                    <span className="text-sm text-gray-300">{spec}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="flex gap-4 flex-wrap">
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={handleAddToCart}
                className="px-8 py-4 bg-blue-500 text-white font-bold tracking-widest uppercase text-sm hover:bg-blue-400 transition-colors shadow-lg shadow-blue-500/50"
              >
                <ShoppingCart className="inline mr-2" size={18} />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={navigateToCheckout}
                className="px-8 py-4 border-2 border-cyan-400 text-cyan-400 font-bold tracking-widest uppercase text-sm hover:bg-cyan-400/10 transition-colors"
              >
                Buy Now
              </motion.button>
            </div>

            <AnimatePresence>
              {addedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-4 text-green-400 font-bold flex items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Added to Cart!
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// ============================================
// CHECKOUT VIEW COMPONENT
// ============================================
const CheckoutView = ({
  cartItems,
  formData,
  setFormData,
  goBack,
  completeOrder,
  orderComplete,
  containerVariants,
  itemVariants,
  buttonVariants,
}) => {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 15;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen py-20 px-8">
      {/* Back Button */}
      <motion.button
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        onClick={goBack}
        className="mb-12 px-6 py-3 border-2 border-blue-500/50 text-blue-400 font-bold tracking-widest uppercase text-sm hover:border-blue-400 transition-all flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        BACK
      </motion.button>

      <motion.div
        className="max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-16">
          <span className="text-cyan-400">CHECKOUT</span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Order Summary */}
          <motion.div variants={itemVariants}>
            <div className="bg-black/40 backdrop-blur-md border-2 border-blue-500/30 p-8 rounded-lg mb-8">
              <h2 className="text-xl font-black tracking-wider mb-6 text-blue-400">ORDER SUMMARY</h2>

              <div className="space-y-4 mb-6 border-b border-gray-700/50 pb-6">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex justify-between items-center"
                  >
                    <div>
                      <p className="font-bold text-white">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.icon}</p>
                    </div>
                    <p className="font-bold text-cyan-400">${item.price}</p>
                  </motion.div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="font-bold">${subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Shipping</span>
                  <span className="font-bold">${shipping}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tax (10%)</span>
                  <span className="font-bold">${tax}</span>
                </div>
                <div className="flex justify-between text-lg border-t border-gray-700/50 pt-3 mt-3">
                  <span className="font-bold">Total</span>
                  <span className="font-black text-cyan-400">${total}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Shipping Form */}
          <motion.div variants={itemVariants}>
            <div className="bg-black/40 backdrop-blur-md border-2 border-blue-500/30 p-8 rounded-lg">
              <h2 className="text-xl font-black tracking-wider mb-6 text-blue-400">SHIPPING DETAILS</h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border-2 border-gray-700 text-white placeholder-gray-600 focus:border-blue-400 focus:outline-none transition-all"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border-2 border-gray-700 text-white placeholder-gray-600 focus:border-blue-400 focus:outline-none transition-all"
                />

                <input
                  type="text"
                  placeholder="Address"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border-2 border-gray-700 text-white placeholder-gray-600 focus:border-blue-400 focus:outline-none transition-all"
                />

                <input
                  type="text"
                  placeholder="Postal Code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 bg-black/60 border-2 border-gray-700 text-white placeholder-gray-600 focus:border-blue-400 focus:outline-none transition-all"
                />

                <div className="border-t border-gray-700/50 pt-4 mt-4">
                  <input
                    type="text"
                    placeholder="Card Number (4242 4242 4242 4242)"
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-4 py-3 bg-black/60 border-2 border-gray-700 text-white placeholder-gray-600 focus:border-blue-400 focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Complete Order Button */}
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={completeOrder}
                disabled={orderComplete}
                className="w-full mt-8 px-8 py-4 bg-cyan-500 text-black font-black tracking-widest uppercase text-sm hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/50 flex items-center justify-center gap-2"
              >
                <Lock size={18} />
                COMPLETE ORDER
              </motion.button>

              <p className="text-xs text-gray-500 text-center mt-4 tracking-widest">
                🔒 SECURE PAYMENT | TLS 1.3 ENCRYPTED
              </p>
            </div>
          </motion.div>
        </div>

        {/* Order Complete Animation */}
        <AnimatePresence>
          {orderComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <motion.div
                className="bg-black/95 border-2 border-cyan-400 p-12 rounded-lg text-center"
                animate={{ scale: [0.8, 1] }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="secure-lock text-6xl mb-6"
                >
                  <Lock size={64} className="text-cyan-400 mx-auto" />
                </motion.div>

                <h2 className="text-3xl font-black text-cyan-400 mb-4">ORDER CONFIRMED</h2>
                <p className="text-gray-400 mb-4">Your bidet systems are on the way!</p>
                <p className="text-lg font-bold text-cyan-400">Delivery: 48 hours</p>

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-8"
                >
                  <Package size={48} className="text-cyan-400 mx-auto" />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

// Animated Price Counter Component
const AnimatedPrice = ({ target }) => {
  const [displayPrice, setDisplayPrice] = React.useState(0);

  React.useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayPrice(target);
        clearInterval(timer);
      } else {
        setDisplayPrice(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return `$${displayPrice}`;
};

export default GlobalPlugApp;
