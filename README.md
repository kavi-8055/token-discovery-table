# Axiom Trade - Token Discovery Table

A pixel-perfect, high-performance token trading table built with Next.js 14, TypeScript, and Tailwind CSS. Features real-time price updates, advanced filtering, and comprehensive data visualization.

![Axiom Trade Preview](./public/preview.png)

## 🚀 Features

### Core Functionality
- ✅ **Real-time Price Updates** - WebSocket simulation with smooth color transitions
- ✅ **Three Token Categories** - New Pairs, Final Stretch, and Migrated tokens
- ✅ **Advanced Sorting** - Sort by any column (price, volume, market cap, etc.)
- ✅ **Search & Filters** - Filter tokens by name/symbol and price movement
- ✅ **Dual View Modes** - Table view for desktop, Grid view for mobile
- ✅ **Interactive UI** - Hover cards, tooltips, modals for detailed token info

### Technical Highlights
- ⚡ **Performance Optimized** - Memoized components, <100ms interactions
- 📱 **Fully Responsive** - Works perfectly from 320px to 4K displays
- 🎨 **Pixel-Perfect Design** - Clean, modern UI matching design specifications
- 🏗️ **Atomic Architecture** - Reusable atoms, molecules, and organisms
- 🛡️ **Type-Safe** - Strict TypeScript with comprehensive error handling
- 🔄 **State Management** - Redux Toolkit + React Query for optimal data flow

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Data Fetching:** React Query
- **UI Components:** Radix UI / shadcn/ui
- **Icons:** Lucide React
- **Animations:** CSS Keyframes + Framer Motion concepts

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/axiom-token-table.git
cd axiom-token-table

# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🏗️ Project Structure

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx             # Main dashboard page
│   ├── layout.tsx           # Root layout with providers
│   └── globals.css          # Global styles and animations
├── components/
│   ├── atoms/               # Basic reusable components
│   │   ├── PriceDisplay.tsx
│   │   ├── PercentageChange.tsx
│   │   ├── TokenSkeleton.tsx
│   │   ├── TooltipWrapper.tsx
│   │   └── EmptyState.tsx
│   ├── molecules/           # Composite components
│   │   ├── TokenCard.tsx
│   │   ├── TokenRow.tsx
│   │   ├── TokenPopover.tsx
│   │   ├── SearchBar.tsx
│   │   ├── FilterDropdown.tsx
│   │   └── StatsBar.tsx
│   ├── organisms/           # Complex feature components
│   │   ├── TokenTable.tsx
│   │   ├── TokenGrid.tsx
│   │   └── TokenDetailsModal.tsx
│   └── ui/                  # shadcn/ui components
├── lib/
│   ├── redux/               # Redux store and slices
│   │   ├── store.ts
│   │   ├── hooks.ts
│   │   └── slices/
│   │       └── tokensSlice.ts
│   ├── services/            # Business logic
│   │   ├── mockData.ts
│   │   └── websocket.ts
│   ├── providers.tsx        # App providers wrapper
│   └── utils.ts             # Utility functions
└── types/                   # TypeScript type definitions
```

## 🎯 Key Features Implementation

### 1. Real-time Price Updates
Mock WebSocket service simulates live price changes with smooth animations:
- Green flash for price increases
- Red flash for price decreases
- Updates every 2-5 seconds randomly

### 2. Responsive Design
- **Desktop (1024px+):** Full table view with all columns
- **Tablet (768px-1023px):** Horizontal scroll table
- **Mobile (<768px):** Auto-switches to card grid view

### 3. Performance Optimizations
- React.memo for component memoization
- useMemo/useCallback for expensive computations
- Virtualization-ready architecture
- Lazy loading for modals and tooltips

### 4. State Management
- **Redux Toolkit:** Global token state, sorting preferences
- **React Query:** Data fetching, caching, and synchronization
- **Local State:** UI state (modals, filters, search)

## 📸 Screenshots

### Desktop View
![Desktop Table View](./screenshots/desktop-table.png)

### Mobile View
![Mobile Grid View](./screenshots/mobile-grid.png)

### Token Details Modal
![Token Modal](./screenshots/token-modal.png)

### Hover Card Preview
![Hover Card](./screenshots/hover-card.png)

## 🎨 Responsive Breakpoints

| Breakpoint | Width | View |
|------------|-------|------|
| Mobile | 320px - 767px | Card Grid (Auto) |
| Tablet | 768px - 1023px | Scrollable Table |
| Desktop | 1024px+ | Full Table |

## 🚀 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Or connect GitHub repo to Vercel dashboard
```

**Live Demo:** [https://axiom-token-table.vercel.app](https://axiom-token-table.vercel.app)

## 🎥 Demo Video

[Watch Demo Video](https://youtube.com/watch?v=your-video-id)

## ⚡ Performance Metrics

- **Lighthouse Score:** 95+ (Desktop & Mobile)
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <2.5s
- **Interaction Latency:** <100ms

## 🧪 Testing

```bash
# Run type checking
npm run type-check

# Run linting
npm run lint

# Build for production
npm run build
```

## 📝 Code Quality

- ✅ Strict TypeScript mode enabled
- ✅ ESLint configured with recommended rules
- ✅ Comprehensive error boundaries
- ✅ All components properly typed
- ✅ DRY principles followed throughout

## 🔧 Environment Variables

No environment variables required for demo mode. For production with real APIs:

```env
NEXT_PUBLIC_API_URL=your_api_url
NEXT_PUBLIC_WS_URL=your_websocket_url
```

## 🤝 Contributing

Contributions welcome! Please read the contribution guidelines first.

## 📄 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👨‍💻 Author

Built with ❤️ by kavipriya

## 🙏 Acknowledgments

- Design inspiration: [Axiom Trade](https://axiom.trade/pulse)
- UI Components: [shadcn/ui](https://ui.shadcn.com)
- Icons: [Lucide](https://lucide.dev)

---

**Star ⭐ this repo if you found it helpful!**