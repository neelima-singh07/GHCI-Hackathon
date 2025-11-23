# 🚀 QUICK START - Fiba Frontend

## Installation (3 Simple Steps)

### Step 1: Install Dependencies
```powershell
npm install
```
*This will take 2-3 minutes*

### Step 2: Configure Environment
```powershell
# Create environment file
Copy-Item .env.example .env

# Edit .env and set your backend URL (optional for testing)
# notepad .env
```

### Step 3: Start the Application
```powershell
npm start
```

**That's it!** Your browser will open automatically at `http://localhost:3000` 🎉

---

## 📋 What You'll See

### Dashboard (`/dashboard`)
- Monthly spending: ₹12,450
- 47 transactions this month
- Financial Health Score: 75/100
- 12-day tracking streak
- 3 achievement badges unlocked
- Beautiful charts and graphs

### Transactions (`/transactions`)
- Filter by category or input type
- Search transactions
- View transaction history
- Export data

### Analytics (`/analytics`)
- AI anomaly detection
- Category comparisons
- Top merchants
- Weekly breakdown

### Profile (`/profile`)
- Edit personal info
- Notification settings
- WhatsApp integration
- Privacy controls

---

## 🎨 Mock Data Included

The app comes with realistic mock data, so you can test all features immediately without a backend!

---

## 🔧 Customize

### Change Colors
Edit `tailwind.config.js` line 8-19

### Update Backend URL
Edit `.env` file:
```
REACT_APP_API_URL=http://your-backend-url/api
```

### Add Categories
Edit `src/utils/constants.js` line 1-12

---

## 📚 Documentation

- **SETUP.md** - Detailed setup guide
- **COMPONENTS.md** - Component documentation
- **PROJECT_STRUCTURE.md** - File structure overview
- **README.md** - Project overview

---

## 🆘 Common Issues

**Port 3000 in use?**
```powershell
$env:PORT=3001; npm start
```

**Installation errors?**
```powershell
Remove-Item node_modules -Recurse -Force
npm install
```

**Node version issues?**
Ensure Node.js 16+ is installed:
```powershell
node --version
```

---

## ✨ Features

✅ Fully responsive (mobile, tablet, desktop)
✅ Real-time charts and visualizations
✅ Multi-language support
✅ WhatsApp integration indicators
✅ AI-powered insights
✅ Gamification (streaks, badges)
✅ Modern, clean UI

---

**Need help?** Check the documentation files or review the inline code comments!

**Happy coding! 🎉**
