# Berkat Farm Management System

A comprehensive farm management system built with Next.js and Node.js. This system helps manage livestock, team members, distribution operations, and farm activities efficiently.

## Project Structure

```
berkat-farm/
├── client/                 # Next.js frontend application
│   ├── app/               # Next.js 13+ app directory
│   │   ├── (auth)/       # Authentication related pages
│   │   ├── (dashboard)/  # Dashboard and protected pages
│   │   └── (marketing)/  # Public marketing pages
│   ├── components/        # Reusable React components
│   ├── public/           # Static assets and images
│   ├── hooks/            # Custom React hooks
│   ├── services/         # API and external services
│   ├── lib/             # Utility functions and configs
│   └── types/           # TypeScript type definitions
│
├── server/                # Node.js/Express backend
│   ├── src/             # Source code
│   │   ├── routes/      # API routes
│   │   ├── models/      # MongoDB models
│   │   └── middleware/  # Express middleware
│   └── types/           # TypeScript type definitions
│
├── shared/                # Shared code between client and server
│   ├── constants/       # Shared constants
│   └── types/          # Shared TypeScript types
│
└── docker/                # Docker configuration files
```

## Features

### 🌾 Dashboard
- Modern, responsive interface
- Real-time data updates
- Role-based access control
- Interactive analytics

### 🐮 Livestock Management
- Health record tracking
- Breeding cycle monitoring
- Inventory management
- Medical history tracking

### 👥 Team Management
- Staff scheduling
- Task assignment
- Performance monitoring
- Role-based permissions

### 🚛 Distribution System
- Order management
- Delivery tracking
- Customer database
- Inventory control

### 🗺️ Additional Features
- Interactive maps with Mapbox
- Real-time notifications
- File management
- Reporting system

## Technologies Used

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- Mapbox for mapping features
- Socket.IO client for real-time updates

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Socket.IO for real-time features
- Redis for caching

### DevOps
- Docker and Docker Compose
- Environment-based configuration
- Automated build process

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- Redis (optional, for caching)
- Docker and Docker Compose (optional)

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd berkat-farm
```

2. Install dependencies:
```bash
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
NEXT_PUBLIC_MAPBOX_STYLE_URL=your_mapbox_style_url
```

Create `.env` in the server directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

### Development

#### Using Docker
```bash
docker-compose up --build
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
