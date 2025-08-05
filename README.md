# InternPortal 🎯

A full-stack web application for managing an intern referral and fundraising program. The platform allows interns to track their fundraising progress, manage referrals, earn rewards, and compete on leaderboards.

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://your-app-url.replit.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/yourusername/intern-portal)

## 📱 Screenshots

### Login & Signup
The application features a clean authentication system with form validation.

*Note: Add screenshots of your login and signup pages here*

### Dashboard
Real-time dashboard showing key metrics, recent activity, and referral tracking.

*Note: Add screenshot of the dashboard here*

### Leaderboard
Competitive rankings with detailed statistics and achievement tracking.

*Note: Add screenshot of the leaderboard here*

## ✨ Features

- **🔐 User Authentication**: Secure signup and login system with session management
- **📊 Dashboard**: Real-time statistics and activity tracking
- **🔗 Referral System**: Unique referral codes with progress tracking
- **💰 Fundraising Tracking**: Monitor donation progress and goals
- **🏆 Rewards System**: Achievement unlocking based on performance milestones
- **🥇 Leaderboards**: Competitive rankings with filtering capabilities
- **📱 Mobile Responsive**: Optimized for all devices and screen sizes

## Tech Stack

### Frontend
- React 18 with TypeScript
- Wouter for routing
- TanStack Query for state management
- Shadcn/ui components with Tailwind CSS
- Vite for build tooling

### Backend
- Node.js with Express.js
- PostgreSQL with Drizzle ORM
- Session-based authentication
- RESTful API design

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database (optional - uses in-memory storage by default)

### 📥 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/yourusername/intern-portal.git
cd intern-portal
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm run dev
```

4. **Open your browser:**
Navigate to `http://localhost:5000`

### 🎮 Quick Test

1. Click "Sign Up" to create a new account
2. Fill in your details (First Name, Last Name, Email, Password)
3. After signup, you'll be automatically logged in
4. Explore the dashboard with your stats and referral code
5. Check the leaderboard to see rankings
6. View your rewards progress

## 🛠️ Development Setup

### Environment Configuration

Create a `.env` file in the root directory (optional):
```env
NODE_ENV=development
PORT=5000
DATABASE_URL=your_postgresql_connection_string
```

### Database Setup (Optional)

By default, the application uses in-memory storage. To use PostgreSQL:

1. Install PostgreSQL on your system
2. Create a new database
3. Update the `DATABASE_URL` in your `.env` file
4. Run database migrations:
```bash
npm run db:migrate
```

## Project Structure

```
├── client/          # React frontend
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── pages/       # Application pages
│   │   ├── hooks/       # Custom React hooks
│   │   └── lib/         # Utilities and configuration
├── server/          # Express backend
│   ├── index.ts     # Server entry point
│   ├── routes.ts    # API routes
│   └── storage.ts   # Data storage layer
├── shared/          # Shared types and schemas
└── package.json     # Dependencies and scripts
```

## API Endpoints

- `POST /api/auth/signup` - Create new account
- `POST /api/auth/login` - User login
- `GET /api/interns` - Get all interns
- `GET /api/interns/:id` - Get specific intern
- `POST /api/interns/:id/referrals` - Add referral
- `POST /api/interns/:id/donations` - Record donation

## 🌐 Deployment

### Deploy to Replit
1. Import this repository to Replit
2. Click "Run" - the application will start automatically
3. The app will be available at your Replit URL

### Deploy Frontend to Netlify
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Set environment variables if needed

### Deploy Backend to Render
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Build command: `npm install`
4. Start command: `npm start`
5. Set environment variables for production

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Create new user account
- `POST /api/auth/login` - User login

### Intern Management
- `GET /api/interns` - Get all interns for leaderboard
- `GET /api/interns/:id` - Get specific intern details
- `POST /api/interns/:id/referrals` - Add new referral
- `POST /api/interns/:id/donations` - Record donation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🆘 Support

If you encounter any issues:
1. Check the [Issues](https://github.com/yourusername/intern-portal/issues) page
2. Create a new issue with detailed description
3. Include screenshots and error messages
