# Fiba Frontend - Setup Guide

## 🚀 Quick Start

This guide will help you set up and run the Fiba frontend application.

## Prerequisites

- **Node.js** 16.x or higher
- **npm** 8.x or higher (comes with Node.js)
- A code editor (VS Code recommended)

## Installation Steps

### 1. Install Dependencies

Open PowerShell in the project directory and run:

```powershell
npm install
```

This will install all required packages including:
- React and React Router
- Chart.js for data visualization
- Tailwind CSS for styling
- Axios for API calls
- And other dependencies

### 2. Configure Environment Variables

Create a `.env` file in the root directory:

```powershell
Copy-Item .env.example .env
```

Edit the `.env` file and update the API URL to point to your backend:

```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

### 3. Start the Development Server

```powershell
npm start
```

The application will open automatically at `http://localhost:3000`

## 🏗️ Project Structure

```
fiba-frontend/
├── public/                 # Static files
│   ├── index.html         # HTML template
│   └── manifest.json      # PWA manifest
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components
│   │   │   ├── Layout.js
│   │   │   ├── Header.js
│   │   │   └── Sidebar.js
│   │   └── dashboard/     # Dashboard components
│   │       ├── SpendingChart.js
│   │       ├── CategoryPieChart.js
│   │       ├── HealthScoreCard.js
│   │       ├── StreakCard.js
│   │       ├── BadgesCard.js
│   │       └── RecentTransactions.js
│   ├── pages/             # Page components
│   │   ├── Dashboard.js
│   │   ├── Transactions.js
│   │   ├── Analytics.js
│   │   └── Profile.js
│   ├── services/          # API services
│   │   └── api.js
│   ├── contexts/          # React contexts
│   │   └── AppContext.js
│   ├── utils/             # Utility functions
│   │   ├── helpers.js
│   │   └── constants.js
│   ├── App.js             # Main app component
│   ├── index.js           # Entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies
├── tailwind.config.js     # Tailwind configuration
└── postcss.config.js      # PostCSS configuration
```

## 🎨 Features

### Dashboard
- **Monthly spending overview** with comparison to previous month
- **Financial health score** with AI-powered assessment (0-100 scale)
- **Streak tracking** to gamify consistent expense tracking
- **Achievement badges** for milestones
- **Spending trends chart** showing daily patterns
- **Category breakdown** with pie chart visualization
- **Recent transactions** with multi-modal input indicators

### Transactions
- **Complete transaction history** with filtering and search
- **Multi-modal input indicators** (text, audio, image)
- **Category-based filtering** and sorting
- **Export functionality** for reports
- **Transaction statistics** summary

### Analytics
- **AI-powered anomaly detection** for unusual spending patterns
- **Category comparison** charts (current vs previous month)
- **Weekly breakdown** visualization
- **Top merchants** analysis
- **Budget status** and warnings
- **Spending trend** insights

### Profile & Settings
- **Personal information** management
- **Notification preferences** customization
- **WhatsApp integration** status and management
- **Privacy settings** control
- **Multi-language support** (English, Hindi, Hinglish, and more)
- **Quick commands** reference for WhatsApp

## 🔌 Backend Integration

### API Endpoints

The frontend expects these API endpoints from your backend:

```javascript
// Dashboard
GET /api/dashboard

// Transactions
GET /api/transactions
POST /api/transactions
PUT /api/transactions/:id
DELETE /api/transactions/:id

// Analytics
GET /api/analytics
GET /api/analytics/anomalies

// User Profile
GET /api/user/profile
PUT /api/user/profile

// WhatsApp
GET /api/whatsapp/status
POST /api/whatsapp/disconnect
```

### Mock Data

The application includes mock data for development. When the backend is not available, it automatically falls back to mock responses. See `src/services/api.js` for details.

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

### Branding

Update the logo and branding in:
- `src/components/layout/Sidebar.js` - Main logo
- `public/manifest.json` - PWA metadata
- `public/index.html` - Page title and meta tags

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1920px and above)
- Laptop (1366px - 1920px)
- Tablet (768px - 1366px)
- Mobile (320px - 768px)

## 🔍 Development Tips

### Hot Reload
The development server supports hot reload. Changes to components will automatically refresh the browser.

### Debugging
- Use React DevTools browser extension
- Check browser console for errors
- Use Network tab to debug API calls

### Code Style
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use meaningful variable names

## 🚀 Production Build

Create an optimized production build:

```powershell
npm run build
```

This creates a `build/` directory with optimized files ready for deployment.

### Deployment Options

**Static Hosting (Netlify, Vercel)**
```powershell
# Build the project
npm run build

# Deploy the build folder
```

**Docker**
Create a `Dockerfile`:
```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
```

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 is busy:
```powershell
$env:PORT=3001; npm start
```

### Dependencies Issues
Clear cache and reinstall:
```powershell
Remove-Item node_modules -Recurse -Force
Remove-Item package-lock.json
npm install
```

### Build Errors
Ensure you're using the correct Node.js version:
```powershell
node --version  # Should be 16.x or higher
```

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [Chart.js Documentation](https://www.chartjs.org)

## 🤝 Support

For issues or questions, please check the project README or contact the development team.

## 📄 License

MIT License - See LICENSE file for details
