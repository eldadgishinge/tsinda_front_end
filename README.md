# Tsinda Frontend

## Description
Tsinda is a comprehensive driving theory learning platform designed to help users prepare for their driving tests in Rwanda. The application provides interactive lessons, assessments, and quizzes in both English and Kinyarwanda, making it accessible to both local and foreign residents. The frontend is built with Next.js 13+ using the App Router, featuring a modern, responsive design with TypeScript and Tailwind CSS.

## Figma mockups Designs 
[Figma mockups Designs ](https://www.figma.com/design/kWFcPt7KHLj4x8RpGrmE1B/Tsindacyane-design?node-id=137-1540&t=xxx4bHJQMv6MQDoL-1)

## DEMO Video ||  Tsinda Initial software product/solution demonstration
[Demo Video ](https://youtu.be/5EhafmftfNw)

## GitHub Repository || The Reason why I created two separate repository is to facilitate in the deploymentof the web application
[Link to Frontend Repository](https://github.com/eldadgishinge/tsinda_front_end)

[Link to Backend Repository](https://github.com/eldadgishinge/tsinda---backend)

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Environment Configuration](#environment-configuration)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Component Library](#component-library)
- [State Management](#state-management)
- [API Integration](#api-integration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Performance Optimization](#performance-optimization)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [Contact](#contact)

## Features
- **Interactive Learning**: Video-based lessons with progress tracking
- **Multi-language Support**: English and Kinyarwanda interface
- **Assessment System**: Comprehensive quizzes and exams
- **User Authentication**: JWT-based auth with Google OAuth
- **Admin Dashboard**: Content and user management interface
- **Mobile Responsive**: Optimized for all device sizes
- **Real-time Updates**: Live progress and notification system
- **Accessibility**: WCAG compliant design
- **Offline Support**: Progressive Web App capabilities
- **Analytics**: User progress and performance tracking

## Tech Stack

### Core Framework
- **Next.js 13+** - React framework with App Router
- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe JavaScript development

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icon library
- **next-themes** - Dark/light mode support

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation

### Authentication & Security
- **NextAuth.js** - Authentication framework
- **JWT** - Token-based authentication
- **Google OAuth** - Social login integration

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **PostCSS** - CSS processing

### Performance & Optimization
- **Next.js Image** - Optimized image handling
- **React Query DevTools** - Development debugging
- **Bundle Analyzer** - Bundle size optimization

## Prerequisites

Before setting up the frontend, ensure you have the following installed:

### Required Software
- **Node.js** (v18.0.0 or higher)
  ```bash
  # Check Node.js version
  node --version
  ```
- **npm** (v8.0.0 or higher) or **yarn** (v1.22.0 or higher)
  ```bash
  # Check npm version
  npm --version
  
  # Or check yarn version
  yarn --version
  ```
- **Git** - Version control
  ```bash
  # Check Git version
  git --version
  ```

### Recommended Tools
- **VS Code** - Code editor with extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript and JavaScript Language Features
- **Postman** or **Insomnia** - API testing
- **Chrome DevTools** - Browser debugging
- **React Developer Tools** - React debugging

### Backend Requirements
- **Backend API** running on `http://localhost:5000`
- **MongoDB** database configured
- **Environment variables** properly set

## Installation & Setup

### Step 1: Clone the Repository
```bash
# Clone the frontend repository
git clone https://github.com/eldadgishinge/tsinda_front_end.git

# Navigate to the project directory
cd tsinda_front_end
```

### Step 2: Install Dependencies
```bash
# Install all dependencies using npm
npm install

# Or using yarn
yarn install

# Or using pnpm (recommended for better performance)
pnpm install
```

### Step 3: Environment Configuration
```bash
# Copy the environment example file
cp .env.example .env.local

# Edit the environment file with your configuration
nano .env.local
```

### Step 4: Start the Development Server
```bash
# Start the development server
npm run dev

# Or using yarn
yarn dev

# Or using pnpm
pnpm dev
```

The application will be available at `http://localhost:3000`

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Authentication
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXTAUTH_SECRET=your_nextauth_secret_key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (Optional)
GOOGLE_CLIENT_SECRET=your_google_client_secret

# File Upload (Optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Analytics (Optional)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your_google_analytics_id

# Feature Flags (Optional)
NEXT_PUBLIC_ENABLE_ANALYTICS=true
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

### Environment Variables Explanation:

- **NEXT_PUBLIC_API_URL**: Backend API base URL
- **NEXT_PUBLIC_GOOGLE_CLIENT_ID**: Google OAuth client ID
- **NEXTAUTH_SECRET**: Secret key for NextAuth.js
- **NEXTAUTH_URL**: Your application URL
- **GOOGLE_CLIENT_SECRET**: Google OAuth client secret (server-side)
- **NEXT_PUBLIC_CLOUDINARY_***: Cloudinary configuration for file uploads
- **NEXT_PUBLIC_GA_MEASUREMENT_ID**: Google Analytics tracking ID
- **NEXT_PUBLIC_ENABLE_***: Feature flags for optional features

## Project Structure

```
tsinda_front_end/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   ├── signup/        # Signup page
│   │   ├── forgot-password/ # Password recovery
│   │   └── layout.tsx     # Auth layout
│   ├── (marketing)/       # Marketing/public pages
│   │   ├── page.tsx       # Landing page
│   │   └── terms/         # Terms of service
│   ├── admin/             # Admin dashboard
│   │   ├── analytics/     # Analytics page
│   │   ├── categories/    # Category management
│   │   ├── content/       # Content management
│   │   ├── exams/         # Exam management
│   │   ├── payments/      # Payment management
│   │   ├── questions/     # Question management
│   │   ├── users/         # User management
│   │   └── layout.tsx     # Admin layout
│   ├── dashboard/         # User dashboard
│   │   ├── assessments/   # Assessment pages
│   │   ├── lessons/       # Lesson pages
│   │   ├── profile/       # User profile
│   │   ├── settings/      # User settings
│   │   └── layout.tsx     # Dashboard layout
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── ui/               # shadcn/ui components
│   ├── add-*-dialog.tsx  # Dialog components
│   ├── sidebar-nav-item.tsx # Navigation items
│   ├── theme-provider.tsx # Theme provider
│   └── video-player.tsx  # Video player component
├── contexts/             # React contexts
│   └── language-context.tsx # Language switching
├── hooks/               # Custom React hooks
│   ├── use-auth.ts      # Authentication hook
│   ├── use-courses.ts   # Course management hook
│   ├── use-exams.ts     # Exam management hook
│   └── use-*.ts         # Other custom hooks
├── lib/                 # Utility libraries
│   ├── axios.ts         # HTTP client configuration
│   ├── utils.ts         # Utility functions
│   ├── validations/     # Form validation schemas
│   └── countries.ts     # Country data
├── providers/           # App providers
│   ├── query-provider.tsx # React Query provider
│   └── toast-provider.tsx # Toast notifications
├── public/              # Static assets
│   ├── images/          # Image assets
│   ├── icons/           # Icon assets
│   └── fonts/           # Font files
├── styles/              # Additional styles
│   └── globals.css      # Global CSS
├── types/               # TypeScript type definitions
├── next.config.mjs      # Next.js configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types

# Testing (if configured)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code quality
npm run format       # Format code with Prettier
npm run lint:fix     # Fix ESLint errors
```

### Development Guidelines

#### 1. Code Style
- Use TypeScript for all new components
- Follow ESLint and Prettier configurations
- Use meaningful component and variable names
- Add JSDoc comments for complex functions

#### 2. Component Structure
```typescript
// Example component structure
import React from 'react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'

interface ComponentProps {
  title: string
  onAction?: () => void
}

export function ExampleComponent({ title, onAction }: ComponentProps) {
  const { user } = useAuth()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

#### 3. File Naming Conventions
- Components: `PascalCase` (e.g., `UserProfile.tsx`)
- Pages: `kebab-case` (e.g., `user-profile/page.tsx`)
- Hooks: `camelCase` with `use` prefix (e.g., `useAuth.ts`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)

#### 4. Git Workflow
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature description"

# Push and create PR
git push origin feature/new-feature
```

## Component Library

### shadcn/ui Components

The project uses shadcn/ui components for consistent design:

```bash
# Add new components
npx shadcn@latest add button
npx shadcn@latest add dialog
npx shadcn@latest add form
```

### Available Components

- **Layout**: Card, Container, Grid, Stack
- **Navigation**: Breadcrumb, Menu, Pagination, Tabs
- **Forms**: Button, Checkbox, Input, Select, Textarea
- **Feedback**: Alert, Badge, Progress, Toast
- **Data Display**: Avatar, Badge, Table, Timeline
- **Overlay**: Dialog, Drawer, Popover, Tooltip
- **Media**: AspectRatio, Image, Video

### Custom Components

#### Dialog Components
- `add-category-dialog.tsx` - Category creation
- `add-course-dialog.tsx` - Course creation
- `add-exam-dialog.tsx` - Exam creation
- `add-question-dialog.tsx` - Question creation
- `add-user-dialog.tsx` - User creation

#### Navigation Components
- `sidebar-nav-item.tsx` - Sidebar navigation items
- `user-nav.tsx` - User navigation menu
- `help-menu.tsx` - Help and support menu

#### Specialized Components
- `video-player.tsx` - Custom video player
- `language-switcher.tsx` - Language switching
- `theme-provider.tsx` - Theme management

## State Management

### React Query (TanStack Query)

For server state management:

```typescript
// Example query hook
import { useQuery } from '@tanstack/react-query'
import { getCourses } from '@/lib/api'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: getCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
```

### React Context

For global state:

```typescript
// Example context
import { createContext, useContext, useState } from 'react'

interface LanguageContextType {
  language: 'en' | 'rw'
  setLanguage: (lang: 'en' | 'rw') => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'rw'>('en')

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
```

### Custom Hooks

Organized by feature:

- `use-auth.ts` - Authentication state
- `use-courses.ts` - Course management
- `use-exams.ts` - Exam management
- `use-questions.ts` - Question management
- `use-users.ts` - User management
- `use-settings.ts` - User settings
- `use-upload.ts` - File upload functionality

## API Integration

### Axios Configuration

```typescript
// lib/axios.ts
import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
})

// Request interceptor for auth
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
```

### API Hooks Pattern

```typescript
// hooks/use-courses.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from '@/lib/axios'

export function useCourses() {
  return useQuery({
    queryKey: ['courses'],
    queryFn: () => api.get('/courses').then(res => res.data),
  })
}

export function useCreateCourse() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: (data: CreateCourseData) => 
      api.post('/courses', data).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] })
    },
  })
}
```

## Testing

### Testing Setup

```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom jest jest-environment-jsdom

# Run tests
npm test
```

### Test Structure

```
__tests__/
├── components/          # Component tests
├── hooks/              # Hook tests
├── pages/              # Page tests
└── utils/              # Utility tests
```

### Example Test

```typescript
// __tests__/components/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

## Deployment

### Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

### Vercel Deployment (Recommended)

1. **Connect Repository**
   - Push code to GitHub
   - Connect repository to Vercel

2. **Environment Variables**
   - Add environment variables in Vercel dashboard
   - Set `NEXT_PUBLIC_API_URL` to production backend URL

3. **Deploy**
   - Vercel will automatically deploy on push to main branch
   - Custom domains can be configured

### Other Deployment Options

#### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables in Netlify dashboard
```

#### Docker Deployment
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

#### Static Export (Optional)
```bash
# Add to next.config.mjs
const nextConfig = {
  output: 'export',
  trailingSlash: true,
}

# Build static files
npm run build
```

## Performance Optimization

### Next.js Optimizations

1. **Image Optimization**
   ```typescript
   import Image from 'next/image'
   
   <Image
     src="/logo.png"
     alt="Logo"
     width={200}
     height={100}
     priority
   />
   ```

2. **Code Splitting**
   ```typescript
   // Dynamic imports
   const DynamicComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <p>Loading...</p>,
     ssr: false
   })
   ```

3. **Bundle Analysis**
   ```bash
   # Analyze bundle size
   npm install --save-dev @next/bundle-analyzer
   
   # Add to next.config.mjs
   const withBundleAnalyzer = require('@next/bundle-analyzer')({
     enabled: process.env.ANALYZE === 'true'
   })
   ```

### React Optimizations

1. **Memoization**
   ```typescript
   import { memo, useMemo, useCallback } from 'react'
   
   const ExpensiveComponent = memo(({ data }) => {
     const processedData = useMemo(() => {
       return data.map(item => item.process())
     }, [data])
   
     const handleClick = useCallback(() => {
       // Handle click
     }, [])
   
     return <div onClick={handleClick}>{processedData}</div>
   })
   ```

2. **Lazy Loading**
   ```typescript
   // Lazy load components
   const LazyComponent = lazy(() => import('./LazyComponent'))
   
   <Suspense fallback={<Spinner />}>
     <LazyComponent />
   </Suspense>
   ```

### Caching Strategies

1. **React Query Caching**
   ```typescript
   const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 5 * 60 * 1000, // 5 minutes
         cacheTime: 10 * 60 * 1000, // 10 minutes
       },
     },
   })
   ```

2. **Service Worker (PWA)**
   ```typescript
   // next.config.mjs
   const withPWA = require('next-pwa')({
     dest: 'public',
     register: true,
     skipWaiting: true,
   })
   ```

## Troubleshooting

### Common Issues

#### 1. Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build

# Clear npm cache
npm cache clean --force
```

#### 2. TypeScript Errors
```bash
# Check TypeScript
npm run type-check

# Fix auto-fixable issues
npx tsc --noEmit
```

#### 3. Styling Issues
```bash
# Rebuild Tailwind CSS
npm run build:css

# Check Tailwind configuration
npx tailwindcss --help
```

#### 4. API Connection Issues
```bash
# Check backend is running
curl http://localhost:5000/api/health

# Check environment variables
echo $NEXT_PUBLIC_API_URL
```

#### 5. Performance Issues
```bash
# Analyze bundle
ANALYZE=true npm run build

# Check lighthouse score
npx lighthouse http://localhost:3000
```

### Debug Mode

```bash
# Start with debug logging
DEBUG=* npm run dev

# Or specific debug namespaces
DEBUG=next:* npm run dev
```

### Development Tools

1. **React Developer Tools**
   - Install browser extension
   - Use Profiler for performance analysis

2. **Next.js Debug**
   ```bash
   # Enable Next.js debug
   NODE_OPTIONS='--inspect' npm run dev
   ```

3. **Network Tab**
   - Monitor API calls
   - Check for failed requests
   - Analyze response times

## Contributing

### Development Setup

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/tsinda_front_end.git
   cd tsinda_front_end
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```
5. **Start development server**
   ```bash
   npm run dev
   ```

### Code Quality Standards

1. **TypeScript**
   - Use strict mode
   - Define proper interfaces
   - Avoid `any` type

2. **ESLint & Prettier**
   ```bash
   # Check code style
   npm run lint
   
   # Fix auto-fixable issues
   npm run lint:fix
   
   # Format code
   npm run format
   ```

3. **Testing**
   - Write unit tests for components
   - Test user interactions
   - Maintain good test coverage

### Pull Request Process

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make changes and commit**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

4. **PR Guidelines**
   - Clear description of changes
   - Screenshots for UI changes
   - Test coverage for new features
   - Update documentation if needed

### Issue Reporting

When reporting issues, include:
- Browser and version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Console errors (if any)
- Screenshots (if applicable)

## Contact

For questions, support, or contributions:

- **Email**: e.gishinge@alustudent.com
- **GitHub Issues**: [Create an issue](https://github.com/eldadgishinge/tsinda_front_end/issues)
- **Project Repository**: [Frontend Repository](https://github.com/eldadgishinge/tsinda_front_end)

---

**Note**: This is a comprehensive guide for setting up and maintaining the Tsinda Frontend. For the most up-to-date information, always refer to the latest documentation and release notes.