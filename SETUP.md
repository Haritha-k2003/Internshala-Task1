# 🚀 Complete Setup Guide for InternPortal

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Local Development](#local-development)
3. [GitHub Repository Setup](#github-repository-setup)
4. [Deployment Options](#deployment-options)
5. [Screenshots & Features](#screenshots--features)
6. [Troubleshooting](#troubleshooting)

## ⚡ Quick Start

### Option 1: Run on Replit (Recommended)
1. Open [Replit](https://replit.com)
2. Click "Import from GitHub"
3. Paste your repository URL
4. Click "Import and Run"
5. The app will start automatically at your Replit URL

### Option 2: Local Development
```bash
# Clone the repository
git clone https://github.com/yourusername/intern-portal.git
cd intern-portal

# Install dependencies
npm install

# Start the application
npm run dev

# Open browser to http://localhost:5000
```

## 💻 Local Development Setup

### Prerequisites
- Node.js 18+ ([Download here](https://nodejs.org/))
- Git ([Download here](https://git-scm.com/))
- Code editor (VS Code recommended)

### Step-by-Step Setup

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/intern-portal.git
   cd intern-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration (Optional)**
   Create `.env` file in root directory:
   ```env
   NODE_ENV=development
   PORT=5000
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

5. **Open Application**
   Navigate to `http://localhost:5000`

## 📂 GitHub Repository Setup

### Method 1: Command Line (Recommended)

1. **Create GitHub Repository**
   - Go to [github.com](https://github.com)
   - Click "New repository"
   - Name it "intern-portal"
   - Don't initialize with README
   - Click "Create repository"

2. **Upload Code**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: InternPortal application"
   git remote add origin https://github.com/yourusername/intern-portal.git
   git push -u origin main
   ```

### Method 2: GitHub Desktop
1. Download [GitHub Desktop](https://desktop.github.com/)
2. Sign in to GitHub
3. Click "Add Existing Repository"
4. Select your project folder
5. Click "Publish repository"

### Method 3: Web Upload
1. Create repository on GitHub
2. Click "uploading an existing file"
3. Drag and drop project files
4. Commit changes

## 🌐 Deployment Options

### Deploy to Netlify (Frontend)
1. Connect GitHub repository to [Netlify](https://netlify.com)
2. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. Deploy automatically on every push

### Deploy to Render (Backend)
1. Connect repository to [Render](https://render.com)
2. Create new Web Service
3. Settings:
   - Build command: `npm install`
   - Start command: `npm start`
4. Add environment variables if needed

### Deploy to Railway
1. Connect to [Railway](https://railway.app)
2. Deploy from GitHub
3. Automatic deployment on push

## 📱 Screenshots & Features

### 🔐 Authentication System
- **Login Page**: Clean, responsive login form
- **Signup Page**: User registration with validation
- **Session Management**: Secure authentication

### 📊 Dashboard Features
- **Personal Stats**: Donations raised, referrals made
- **Referral Code**: Unique shareable code
- **Activity Feed**: Recent actions and updates
- **Progress Tracking**: Visual progress indicators

### 🏆 Leaderboard
- **Rankings**: Top performers list
- **Statistics**: Detailed performance metrics
- **Achievements**: Reward system tracking

### 🎯 Key Functionality
- ✅ User registration and login
- ✅ Real-time statistics
- ✅ Referral code generation
- ✅ Activity tracking
- ✅ Responsive design
- ✅ Mobile optimization

## 🔧 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5000
npx kill-port 5000
npm run dev
```

**Dependencies Issues**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Errors**
```bash
# Check Node.js version
node --version  # Should be 18+

# Update dependencies
npm update
```

### Getting Help
1. Check [Issues](https://github.com/yourusername/intern-portal/issues)
2. Create new issue with:
   - Error message
   - Steps to reproduce
   - System information

## 📊 Project Structure
```
intern-portal/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/         # Application pages
│   │   ├── hooks/         # Custom hooks
│   │   └── lib/           # Utilities
├── server/                # Express backend
│   ├── index.ts          # Server entry
│   ├── routes.ts         # API routes
│   └── storage.ts        # Data layer
├── shared/               # Shared types
├── README.md            # Main documentation
├── SETUP.md            # This file
└── package.json        # Dependencies
```

## 🎉 Success Checklist
- [ ] Repository created on GitHub
- [ ] Code uploaded successfully
- [ ] Application runs locally
- [ ] All features working
- [ ] README updated with your info
- [ ] Screenshots added (optional)
- [ ] Deployed to hosting platform

## 🔗 Useful Links
- [Node.js Downloads](https://nodejs.org/)
- [Git Downloads](https://git-scm.com/)
- [VS Code](https://code.visualstudio.com/)
- [GitHub Desktop](https://desktop.github.com/)
- [Netlify](https://netlify.com)
- [Render](https://render.com)
- [Railway](https://railway.app)
