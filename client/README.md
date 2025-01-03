# Berkat Farm Management System - Frontend

This is the frontend application for the Berkat Farm Management System, built with Next.js 13+ and modern web technologies.

![Screenshot_3-1-2025_14382_localhost](https://github.com/user-attachments/assets/ce3d08f8-c2a9-4c90-8910-c3951252a64d)

## Features

- 📱 Responsive design for all devices
- 🎨 Modern UI with Tailwind CSS and Shadcn UI
- 🔒 Secure authentication with NextAuth.js
- 📊 Interactive charts and analytics
- 🗺️ Integrated mapping features
- 🔄 Real-time updates with WebSocket
- 📝 Form handling with React Hook Form
- ✅ Input validation with Zod
- 🌐 API integration with Axios
- 🎯 Type safety with TypeScript

## Directory Structure

```
client/
├── app/                    # Next.js 13+ app directory
│   ├── (auth)/            # Authentication pages
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── dashboard/         # Dashboard and features
│   │   ├── finance/       # Financial management
│   │   ├── profile/       # User profile
│   │   ├── settings/      # System settings
│   │   ├── team/          # Team management
│   │   └── livestock/     # Livestock management
│   └── (marketing)/       # Public pages
├── components/            # React components
│   ├── ui/               # UI components
│   │   ├── Button/       # Button components
│   │   ├── Card/         # Card components
│   │   └── ...          # Other UI components
│   ├── forms/            # Form components
│   └── shared/           # Shared components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/              # Static assets
├── services/            # API services
└── types/               # TypeScript types
```

## Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn
- Git

### Installation

1. Clone the repository and navigate to the client directory:
```bash
git clone https://github.com/yourusername/berkat-farm.git
cd berkat-farm/client
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the client directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

4. Start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3001`.

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Run linter
npm run lint

# Format code
npm run format
```

## Development Guidelines

### Component Structure
- Use functional components with TypeScript
- Implement proper prop typing
- Follow the container/presenter pattern
- Keep components focused and reusable

### Styling
- Use Tailwind CSS for styling
- Follow the design system
- Maintain responsive design principles
- Use CSS modules for component-specific styles

### State Management
- Use React hooks for local state
- Implement context for shared state
- Follow immutability principles
- Handle side effects properly

### Form Handling
- Use React Hook Form for forms
- Implement Zod schemas for validation
- Handle errors gracefully
- Show appropriate loading states

### API Integration
- Use Axios for API calls
- Implement proper error handling
- Cache responses when appropriate
- Handle loading and error states

### Testing
- Write unit tests for components
- Test custom hooks
- Implement integration tests
- Maintain good test coverage

## Building for Production

1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

## Deployment

The application can be deployed to various platforms:

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t berkat-farm-client .
docker run -p 3001:3001 berkat-farm-client
```

## Contributing

1. Follow the coding standards
2. Write meaningful commit messages
3. Add tests for new features
4. Update documentation as needed
5. Create detailed pull requests

## Troubleshooting

Common issues and solutions:

### Build Errors
- Clear `.next` directory
- Remove `node_modules` and reinstall
- Check environment variables

### Runtime Errors
- Check API connectivity
- Verify environment variables
- Check browser console
- Review network requests

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [React Hook Form Documentation](https://react-hook-form.com/get-started)
- [NextAuth.js Documentation](https://next-auth.js.org)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
