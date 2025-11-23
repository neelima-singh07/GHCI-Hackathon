# Fiba - AI-First Financial Tracking Dashboard

A React-based web dashboard for Fiba, an AI-powered multi-modal financial tracking application integrated with WhatsApp.

## Features

- 📊 **Real-time Dashboard** - View spending trends, financial health score, and achievements
- 💰 **Transaction Management** - Browse, filter, and analyze all transactions
- 📈 **Advanced Analytics** - Category breakdowns, spending patterns, and anomaly alerts
- 🏆 **Gamification** - Streaks, badges, and progress tracking
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🌐 **Multi-language Support** - Optimized for Indian languages including Hinglish

## Technology Stack

- **React 18** - Frontend framework
- **React Router** - Navigation and routing
- **Chart.js & Recharts** - Data visualization
- **Tailwind CSS** - Styling
- **Axios** - API communication
- **Framer Motion** - Animations
- **Lucide React** - Modern icons

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

The app will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── layout/         # Layout components (Header, Sidebar)
│   ├── dashboard/      # Dashboard-specific components
│   ├── transactions/   # Transaction components
│   ├── analytics/      # Analytics components
│   └── common/         # Common UI components
├── pages/              # Page components
├── services/           # API services
├── contexts/           # React contexts for state management
├── utils/              # Utility functions
├── hooks/              # Custom React hooks
└── assets/             # Static assets

```

## API Integration

Update the API base URL in `src/services/api.js` to connect to your backend:

```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

## Configuration

- **Tailwind Config**: `tailwind.config.js`
- **Environment Variables**: Create `.env` file for environment-specific configs

## Features Overview

### Dashboard
- Monthly spending overview
- Financial health score with AI-powered insights
- Active streaks and achievements
- Quick transaction summary
- Spending trends charts

### Transactions
- Complete transaction history
- Multi-modal input indicators (text, audio, image)
- Category-based filtering
- Search and sort functionality
- Transaction details with AI-extracted metadata

### Analytics
- Category-wise spending breakdown
- Time-series spending patterns
- Anomaly detection alerts
- Merchant analysis
- Budget tracking and predictions

### Profile
- User preferences
- Language settings
- WhatsApp integration status
- Notification preferences

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License
