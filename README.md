# Global Plug - Cyber-Industrial Bidet E-Commerce App

A futuristic, high-motion React application showcasing a multi-page e-commerce platform for premium bidet systems. Built with **Framer Motion**, **Lucide React**, and **Tailwind CSS**.

## 🎨 Features

- **Multi-Page Navigation**: Home → Product Detail → Checkout with smooth slide animations
- **Cursor-Following Spotlight**: Dynamic mesh gradient background that responds to mouse movement
- **Interactive Product Grid**: 4-column Bento layout with hover effects and staggered animations
- **Detailed Product Pages**: Technical specifications, pricing modes (Single/Wholesale), and dynamic pricing
- **Futuristic Checkout**: Dual-column layout with order summary and secure payment animation
- **Framer Motion Animations**: 
  - Page transitions with spring physics
  - Hover scales (1.1x) and tap scales (0.9x) on all buttons
  - Staggered entrance animations
  - Animated price counters
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Glassmorphism UI**: Frosted glass effects with backdrop blur
- **Secure Payment Flow**: Order confirmation with animated lock and package icons

## 🚀 Quick Start

### Prerequisites
- Node.js >= 16.0.0
- npm >= 8.0.0

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/global-plug.git
   cd global-plug
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will open at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📦 Dependencies

### Core
- **React** 18.2.0 - UI library
- **React DOM** 18.2.0 - React rendering
- **Framer Motion** 10.16.4 - Animation library
- **Lucide React** 0.263.1 - Icon library

### Build & Styling
- **Vite** 4.4.0 - Build tool
- **Tailwind CSS** 3.3.0 - Utility-first CSS
- **PostCSS** 8.4.24 - CSS processing
- **Autoprefixer** 10.4.14 - CSS vendor prefixes

### Development
- **ESLint** 8.44.0 - Code linting
- **ESLint React Plugin** 7.32.2 - React-specific rules

## 🗂️ Project Structure

```
global-plug/
├── src/
│   ├── GlobalPlugApp.jsx      # Main multi-view app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles
├── index.html                  # HTML template
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js           # PostCSS configuration
├── .eslintrc.json              # ESLint rules
├── .gitignore                  # Git ignore rules
├── package.json                # Project dependencies
└── README.md                   # This file
```

## 🎯 Usage

### Home View
- View all 3 bidet models
- Toggle between Single/Wholesale pricing
- Click any product card to view details

### Product Detail View
- See full product specifications
- View technical details and features
- Add to cart or proceed to checkout
- Magnetic button hover effects

### Checkout View
- Review order summary with real-time totals
- Fill in shipping details (Edmonton, AB pre-filled)
- Complete secure payment
- Order confirmation animation

## 🎮 Interactions

| Action | Effect |
|--------|--------|
| Hover Button | Scale to 1.1x with glow effect |
| Tap Button | Scale to 0.9x with instant feedback |
| Move Mouse | Spotlight follows cursor with spring physics |
| Click Product | Slide to product detail page |
| Click Back | Smooth return to home view |
| Complete Order | Secure payment animation + confirmation |

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
extend: {
  colors: {
    'cyber-dark': '#020617',
    'cyber-black': '#0a0a0a',
  },
}
```

### Fonts
Modify Google Fonts import in `index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
```

### Product Data
Edit product array in `GlobalPlugApp.jsx`:
```javascript
const products = [
  {
    id: 'product-id',
    name: 'Product Name',
    single: 450,
    wholesale: 350,
    specs: ['Spec 1', 'Spec 2'],
    details: 'Product description...',
  },
];
```

## 📱 Responsive Breakpoints

- **Mobile**: 1 column
- **Tablet** (md): 2 columns
- **Desktop** (lg): 4 columns

## 🚀 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import project in Vercel
3. Select Vite as build tool
4. Deploy

### Netlify
1. Push to GitHub
2. Connect repository in Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "preview"]
```

## 🔧 Development Tips

### Hot Module Replacement
Vite automatically reloads changes during development. Edit any `.jsx` or `.css` file and see changes instantly.

### ESLint
Run linter to check code quality:
```bash
npm run lint
```

### Performance
- Use React DevTools Profiler to identify bottlenecks
- Framer Motion animations are GPU-accelerated
- Tailwind CSS is tree-shaken in production builds

## 📄 License

MIT License - feel free to use this project for personal and commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues, questions, or feedback, please open an issue on GitHub.

---

**Built with ⚡ and ❄️ by the Global Plug Team**
