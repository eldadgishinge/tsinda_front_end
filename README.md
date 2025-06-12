# Tsinda  Frontend

## Description
Tsinda is a comprehensive driving theory learning platform designed to help users prepare for their driving tests in Rwanda. The application provides interactive lessons, assessments, and quizzes in both English and Kinyarwanda, making it accessible to both local and foreign residents.

## Figma mockups Designs 
[Figma mockups Designs ](https://www.figma.com/design/kWFcPt7KHLj4x8RpGrmE1B/Tsindacyane-design?node-id=137-1540&t=xxx4bHJQMv6MQDoL-1)

## DEMO Video ||  Tsinda Initial software product/solution demonstration
[Demo Video ](https://youtu.be/5EhafmftfNw)

## GitHub Repository || The Reason why I created two separate repository is to facilitate in the deploymentof the web application
[Link to Frontend Repository](https://github.com/eldadgishinge/tsinda_front_end)

[Link to Backend Repository](https://github.com/eldadgishinge/Tsinda-backend)

## Features
- Interactive driving lessons with video content
- Multi-language support (English and Kinyarwanda)
- Assessment and quiz system with progress tracking
- User authentication with multiple methods
- Admin dashboard for content and user management
- Mobile-responsive design

## Tech Stack
- Framework: Next.js 13+ with App Router
- UI Library: React 18
- Styling: Tailwind CSS with shadcn/ui components
- State Management: Redux Toolkit
- Authentication: JWT-based auth with Google OAuth support
- Form Handling: Native React forms
- API Communication: Native fetch API
- Internationalization: Custom language context

## Project Structure
```
tsindacyane/
├── app/ # Next.js App Router pages
│ ├── (auth)/ # Authentication-related pages
│ ├── (marketing)/ # Marketing/public pages
│ ├── admin/ # Admin dashboard pages
│ ├── auth/ # Auth callback handlers
│ ├── dashboard/ # User dashboard pages
│ ├── forgot-password/ # Password recovery flow
│ └── layout.tsx # Root layout
├── components/ # Reusable UI components
├── contexts/ # React context providers
├── hooks/ # Custom React hooks
├── lib/ # Utility functions and constants
├── middleware/ # Next.js middleware
├── public/ # Static assets
└── store/ # Redux state management
```

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/your-username/tsinda-frontend.git
cd tsinda-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_API_URL=your_backend_url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment
The frontend is currently hosted on GoDaddy. To deploy:

1. Build the production version:
```bash
npm run build
```

2. Configure your GoDaddy hosting settings:
   - Set up your domain
   - Configure SSL certificate
   - Set up environment variables
   - Deploy the built files

## Designs
- [Figma Mockups](link-to-figma)
- [UI Screenshots](link-to-screenshots)

## Development Guidelines
- Use TypeScript for all new components
- Follow the established project structure
- Use shadcn/ui components for consistency
- Implement responsive design using Tailwind CSS
- Write tests for new features
- Follow the Git workflow:
  - Create feature branches
  - Submit PRs for review
  - Keep commits atomic and well-documented

## Testing
- Unit tests: Jest
- Integration tests: API tests
- E2E tests: Cypress

## Performance Considerations
- Use Next.js Image component for optimized images
- Implement code splitting
- Use memoization where appropriate
- Leverage server components
- Implement proper caching strategies

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request


## Contact
e.gishinge@alustudent.com