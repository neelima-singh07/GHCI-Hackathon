# Fiba Frontend - Component Documentation

## Architecture Overview

The Fiba frontend follows a component-based architecture built with React. The application is structured into pages, reusable components, services, and utilities.

## Core Components

### Layout Components

#### `Layout.js`
Main layout wrapper that includes the sidebar and header.
- **Location**: `src/components/layout/Layout.js`
- **Purpose**: Provides the overall structure for all pages
- **Features**: 
  - Fixed sidebar navigation
  - Top header with search and user info
  - Main content area with routing

#### `Header.js`
Top navigation bar with search and actions.
- **Location**: `src/components/layout/Header.js`
- **Features**:
  - Global search functionality
  - Refresh data button
  - Notification bell with indicator
  - User profile dropdown
  - WhatsApp connection status

#### `Sidebar.js`
Left navigation panel with menu items.
- **Location**: `src/components/layout/Sidebar.js`
- **Features**:
  - Brand logo and name
  - Main navigation links
  - Active route highlighting
  - WhatsApp connection status card

### Dashboard Components

#### `SpendingChart.js`
Line chart showing daily spending trends.
- **Location**: `src/components/dashboard/SpendingChart.js`
- **Props**:
  - `data` (array): Array of {date, amount} objects
- **Features**:
  - 30-day spending visualization
  - Smooth gradient fill
  - Interactive tooltips
  - Responsive design

#### `CategoryPieChart.js`
Donut chart displaying category-wise spending distribution.
- **Location**: `src/components/dashboard/CategoryPieChart.js`
- **Props**:
  - `data` (array): Array of {category, amount, color} objects
- **Features**:
  - Percentage breakdown
  - Color-coded categories
  - Interactive legend
  - Hover effects

#### `HealthScoreCard.js`
Visual representation of financial health score.
- **Location**: `src/components/dashboard/HealthScoreCard.js`
- **Props**:
  - `score` (number): Health score from 0-100
- **Features**:
  - Circular progress indicator
  - Color-coded by performance (green/yellow/red)
  - Month-over-month comparison
  - AI-powered insights

#### `StreakCard.js`
Gamified display of consecutive tracking days.
- **Location**: `src/components/dashboard/StreakCard.js`
- **Props**:
  - `streak` (number): Current streak count
- **Features**:
  - Flame icon animation
  - Progress to next milestone
  - Start date tracking
  - Motivational messaging

#### `BadgesCard.js`
Achievement badges and rewards display.
- **Location**: `src/components/dashboard/BadgesCard.js`
- **Props**:
  - `badges` (array): Array of badge objects
- **Features**:
  - Unlocked/locked badge states
  - Visual icons for each achievement
  - Progress tracking
  - Expandable view for all badges

#### `RecentTransactions.js`
List of latest financial transactions.
- **Location**: `src/components/dashboard/RecentTransactions.js`
- **Props**:
  - `transactions` (array): Array of transaction objects
- **Features**:
  - Multi-modal input indicators (text/audio/image)
  - Category badges
  - Relative timestamps
  - Quick navigation to full transaction list

## Page Components

### `Dashboard.js`
Main dashboard overview page.
- **Location**: `src/pages/Dashboard.js`
- **State**:
  - Uses `AppContext` for global state
  - Loading state management
- **Features**:
  - 4 key stat cards
  - Health score, streak, and badges
  - Spending and category charts
  - Recent transaction list
  - Month-over-month comparisons

### `Transactions.js`
Complete transaction history and management.
- **Location**: `src/pages/Transactions.js`
- **State**:
  - Search term
  - Selected category filter
  - Selected input type filter
  - Filter visibility toggle
- **Features**:
  - Advanced search and filtering
  - Category-based filtering
  - Input type filtering (text/audio/image)
  - Summary statistics
  - Export functionality
  - Responsive grid layout

### `Analytics.js`
Advanced analytics and insights page.
- **Location**: `src/pages/Analytics.js`
- **State**:
  - Time range selection
- **Features**:
  - Key insight cards
  - AI-powered anomaly detection
  - Category comparison charts
  - Weekly breakdown visualization
  - Top merchants analysis
  - Severity-based alert system
  - Time range filtering

### `Profile.js`
User profile and settings management.
- **Location**: `src/pages/Profile.js`
- **State**:
  - Active tab
  - Edit mode toggle
  - Form data for profile updates
- **Features**:
  - Tabbed interface (Profile, Notifications, WhatsApp, Privacy)
  - Personal information editing
  - Notification preferences
  - WhatsApp integration status
  - Privacy controls
  - Language selection
  - Quick command reference

## Service Layer

### `api.js`
Centralized API service for backend communication.
- **Location**: `src/services/api.js`
- **Features**:
  - Axios instance configuration
  - Request/response interceptors
  - Authentication token handling
  - Error handling and fallbacks
  - Mock data for development

**Available Functions**:
```javascript
// Dashboard
fetchDashboardData()

// Transactions
fetchTransactions(filters)
createTransaction(transactionData)
updateTransaction(id, transactionData)
deleteTransaction(id)

// Analytics
fetchAnalytics(timeRange)
fetchAnomalies()

// User Profile
fetchUserProfile()
updateUserProfile(profileData)

// WhatsApp
getWhatsAppStatus()
disconnectWhatsApp()
```

## Context & State Management

### `AppContext.js`
Global application state provider.
- **Location**: `src/contexts/AppContext.js`
- **Provides**:
  - `user`: User profile data
  - `dashboardData`: Dashboard statistics and charts
  - `transactions`: All transactions
  - `loading`: Loading state
  - `error`: Error state
  - `refreshData()`: Function to refresh all data

**Usage**:
```javascript
import { useApp } from '../contexts/AppContext';

const MyComponent = () => {
  const { user, dashboardData, loading } = useApp();
  // Use context values
};
```

## Utility Functions

### `helpers.js`
Common utility functions.
- **Location**: `src/utils/helpers.js`

**Key Functions**:
- `formatCurrency(amount)`: Format numbers as Indian Rupees
- `formatDate(date, format)`: Format dates in various formats
- `getRelativeTime(date)`: Get relative time strings (e.g., "2 hours ago")
- `getCategoryColor(category)`: Get Tailwind color classes for categories
- `calculatePercentageChange(current, previous)`: Calculate percentage changes
- `debounce(func, wait)`: Debounce function execution
- `groupBy(array, key)`: Group arrays by key
- `sortBy(array, key, order)`: Sort arrays

### `constants.js`
Application-wide constants and configurations.
- **Location**: `src/utils/constants.js`

**Exports**:
- `CATEGORIES`: List of spending categories
- `INPUT_TYPES`: Transaction input types
- `LANGUAGES`: Supported languages
- `TIME_RANGES`: Available time range filters
- `HEALTH_SCORE_LEVELS`: Health score thresholds
- `ANOMALY_TYPES`: Types of spending anomalies
- `BADGE_TYPES`: Available achievement badges
- `CHART_COLORS`: Color palette for charts

## Styling

### Tailwind CSS
The application uses Tailwind CSS for styling with custom configurations.

**Custom Classes** (defined in `src/index.css`):
```css
.card                 /* White card with shadow */
.btn-primary          /* Primary action button */
.btn-secondary        /* Secondary button */
.badge                /* Badge/tag base style */
.badge-success        /* Success badge (green) */
.badge-warning        /* Warning badge (yellow) */
.badge-danger         /* Danger badge (red) */
.badge-primary        /* Primary badge (blue) */
.input-field          /* Form input styling */
.stat-card            /* Statistic card with gradient */
```

**Custom Colors**:
- `primary`: Blue theme (customizable)
- `success`: Green for positive actions
- `warning`: Yellow for cautions
- `danger`: Red for alerts

## Routing

The application uses React Router v6 for navigation.

**Route Structure**:
```
/                          → Redirects to /dashboard
├── /dashboard             → Dashboard page
├── /transactions          → Transactions page
├── /analytics             → Analytics page
└── /profile               → Profile & Settings page
```

## Icons

The application uses `lucide-react` for icons. Common icons:
- `LayoutDashboard`, `Receipt`, `TrendingUp`, `User` for navigation
- `MessageSquare`, `Mic`, `Image` for input types
- `Bell`, `Search`, `Settings` for actions
- `Award`, `Flame`, `Trophy` for achievements

## Best Practices

### Component Organization
1. Keep components small and focused
2. Use functional components with hooks
3. Extract reusable logic into custom hooks
4. Props should be clearly defined

### State Management
1. Use Context for global state
2. Use local state for component-specific data
3. Avoid prop drilling

### Performance
1. Use React.memo for expensive components
2. Implement proper loading states
3. Lazy load routes if needed
4. Optimize images and assets

### Accessibility
1. Use semantic HTML
2. Provide alt text for images
3. Ensure keyboard navigation works
4. Use proper ARIA labels

## Testing Recommendations

### Unit Tests
- Test utility functions in `helpers.js`
- Test API service functions with mocked responses
- Test component rendering with React Testing Library

### Integration Tests
- Test user flows (viewing dashboard, filtering transactions)
- Test form submissions
- Test navigation between pages

### E2E Tests
- Use Cypress or Playwright for end-to-end testing
- Test critical user journeys
- Test responsive behavior

## Future Enhancements

Potential improvements for the frontend:

1. **Real-time Updates**: WebSocket integration for live transaction updates
2. **Offline Support**: Service workers for offline functionality
3. **Advanced Charts**: More visualization options (heatmaps, sankey diagrams)
4. **Budget Management**: Budget creation and tracking features
5. **Export Reports**: PDF/Excel report generation
6. **Dark Mode**: Theme switching capability
7. **Accessibility**: Enhanced screen reader support
8. **Animations**: Smooth transitions and micro-interactions
9. **Mobile App**: React Native version
10. **PWA Features**: Install prompts, push notifications

## Support

For component-specific questions or issues, refer to:
- Component source code and inline comments
- React documentation: https://react.dev
- Tailwind documentation: https://tailwindcss.com
- Chart.js documentation: https://www.chartjs.org
