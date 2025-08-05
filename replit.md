# Overview

InternPortal is a full-stack web application for managing an intern referral and fundraising program. The platform allows interns to track their fundraising progress, manage referrals, earn rewards, and compete on leaderboards. Built with a modern React frontend and Express.js backend, the application provides a comprehensive dashboard for monitoring performance metrics and engagement activities.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern component patterns
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS
- **Build Tool**: Vite for fast development and optimized production builds
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Authentication**: Session-based authentication with password validation
- **API Design**: RESTful API endpoints with structured error handling
- **Development**: Hot reloading with Vite integration for seamless development experience

## Data Storage
- **Primary Database**: PostgreSQL hosted on Neon Database
- **ORM**: Drizzle ORM with schema-first approach for type safety
- **Session Storage**: PostgreSQL-based session storage using connect-pg-simple
- **Migration Strategy**: Drizzle Kit for database schema migrations

## Core Data Models
- **Interns**: User profiles with referral codes, fundraising totals, and rankings
- **Referrals**: Tracking referred users and their status (pending/completed)
- **Donations**: Financial contributions linked to interns and referral sources
- **Rewards**: Achievement system with unlockable rewards based on performance
- **Activities**: Activity feed tracking user actions and milestones

## Authentication & Authorization
- **Strategy**: Traditional email/password authentication with hashed passwords
- **Session Management**: Server-side sessions stored in PostgreSQL
- **Protection**: Route-level protection with authentication context
- **Security**: Input validation using Zod schemas and SQL injection prevention via ORM

## Key Features
- **Dashboard**: Real-time statistics, recent activity feed, and performance metrics
- **Referral System**: Unique referral codes with tracking and status management
- **Fundraising Tracking**: Donation recording and progress visualization
- **Rewards System**: Achievement unlocking based on performance milestones
- **Leaderboards**: Competitive rankings with filtering capabilities
- **Responsive Design**: Mobile-first design with adaptive layouts

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting with serverless scaling
- **@neondatabase/serverless**: Database connection driver optimized for serverless environments

## UI and Styling
- **Radix UI**: Comprehensive component primitives for accessibility and customization
- **Tailwind CSS**: Utility-first CSS framework for rapid styling
- **Lucide React**: Modern icon library with consistent design language
- **Shadcn/ui**: Pre-built component library combining Radix UI and Tailwind CSS

## Development Tools
- **TypeScript**: Static type checking across the entire application stack
- **ESBuild**: Fast JavaScript bundling for production builds
- **Drizzle Kit**: Database migration and schema management tools
- **React Hook Form**: Performance-optimized form handling with minimal re-renders

## Validation and Utilities
- **Zod**: Runtime type validation for API inputs and form data
- **Date-fns**: Date manipulation and formatting utilities
- **Clsx**: Conditional CSS class name utilities
- **Class Variance Authority**: Type-safe component variant management
