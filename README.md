# Berkat Farm Management System

A comprehensive farm management system built with Next.js and Node.js. This system helps manage livestock, team members, distribution operations, financial transactions, and farm activities efficiently.

![Screenshot_20-1-2025_13335_localhost](https://github.com/user-attachments/assets/13dd4bc1-544a-47c5-921e-c3db9a58c1a8)

## Project Structure

```
berkat-farm/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js 13+ app directory
│   │   ├── (auth)/       # Authentication related pages
│   │   ├── dashboard/    # Dashboard and protected pages
│   │   │   ├── finance/  # Financial management
│   │   │   ├── profile/  # User profile management
│   │   │   ├── settings/ # System settings
│   │   │   ├── team/     # Team management
│   │   │   └── livestock/# Livestock management
│   │   └── (marketing)/  # Public marketing pages
│   ├── components/        # Reusable React components
│   │   ├── ui/           # UI components (buttons, cards, etc.)
│   │   ├── forms/        # Form components
│   │   └── shared/       # Shared components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configs
│   ├── public/           # Static assets and images
│   ├── services/         # API and external services
│   └── types/            # TypeScript type definitions
│
├── server/                # Node.js/Express backend
│   ├── src/             
│   │   ├── controllers/  # Business logic
│   │   ├── routes/       # API routes
│   │   ├── models/       # MongoDB models
│   │   ├── middleware/   # Express middleware
│   │   └── utils/        # Utility functions
│   └── types/            # TypeScript type definitions
│
├── shared/                # Shared code between client and server
│   ├── constants/        # Shared constants
│   └── types/           # Shared TypeScript types
│
└── docker/                # Docker configuration files
```

## Features

### 🌾 Dashboard
- Modern, responsive interface
- Real-time data updates
- Role-based access control
- Interactive analytics and charts
- Quick access to key features

### 💰 Finance Management
- Transaction tracking
- Financial analytics and reports
- Budget management
- Invoice generation
- Payment processing
- Tax management
- Export capabilities

### 🐮 Livestock Management
- Health record tracking
- Breeding cycle monitoring
- Inventory management
- Medical history tracking
- Feed management
- Growth tracking
- Vaccination schedules

### 👥 Team Management
- Staff scheduling
- Task assignment
- Performance monitoring
- Role-based permissions
- Time tracking
- Document sharing
- Team communication

### 🚛 Distribution System
- Order management
- Delivery tracking
- Route optimization
- Customer database
- Inventory control
- Delivery scheduling
- Real-time tracking

### ⚙️ Settings & Configuration
- System preferences
- User preferences
- Notification settings
- Security settings
- Data management
- Backup and restore
- Integration settings

### 👤 Profile Management
- Personal information
- Professional details
- Contact information
- Preferences management
- Activity history
- Security settings
- Profile customization

## Technologies Used

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- Shadcn UI Components
- NextAuth.js for authentication
- React Hook Form for forms
- Zod for validation
- Mapbox for mapping features
- Socket.IO client for real-time updates
- Chart.js for analytics

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Socket.IO for real-time features
- Redis for caching
- Bull for job queues

### DevOps & Tools
- Docker and Docker Compose
- GitHub Actions for CI/CD
- ESLint and Prettier
- Jest for testing
- Husky for git hooks
- Environment-based configuration

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- Redis (optional, for caching)
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/berkat-farm.git
cd berkat-farm
```

2. Install dependencies:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

3. Set up environment variables:

Create `.env.local` in the client directory:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
```

Create `.env` in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_url
```

### Development

#### Using Docker
```bash
# Build and start all services
docker-compose up --build

# Start specific service
docker-compose up client
```

#### Local Development
```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm run dev
```

The frontend will be available at `http://localhost:3001` and the backend at `http://localhost:5000`.

### Testing
```bash
# Run frontend tests
cd client
npm run test

# Run backend tests
cd server
npm run test
```

## API Documentation

API documentation is available at `/api/docs` when running the server. It includes:
- Authentication endpoints
- CRUD operations
- WebSocket events
- Rate limiting information
- Response formats

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your PR:
- Follows the existing code style
- Includes appropriate tests
- Updates documentation as needed
- Passes all CI checks

## Security

- All endpoints are protected with JWT authentication
- Input validation on all forms
- XSS protection
- CSRF protection
- Rate limiting
- Secure password hashing
- Regular security audits

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Support

For support, please:
1. Check the [documentation](docs/)
2. Search existing [issues](issues/)
3. Create a new issue if needed

## Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- MongoDB for database solutions
- All contributors who have helped shape this project
