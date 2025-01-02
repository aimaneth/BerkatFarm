# Berkat Farm Management System

A modern, full-stack farm management application commissioned by Berkat Farm Trading. Built with Next.js, TypeScript, and MongoDB, this system helps farmers manage their livestock, team members, and distribution operations efficiently.

![Berkat Farm Management System](public/images/hero-bg.jpg)

> This project is a commissioned work developed for Berkat Farm Trading by Aiman Asyraf.

## Features

- 🌾 **Modern Dashboard**
  - Clean and intuitive interface
  - Real-time data updates
  - Responsive design for all devices

- 🐮 **Livestock Management**
  - Track health records
  - Monitor breeding cycles
  - Manage inventory
  - Record medical history

- 👥 **Team Management**
  - Staff scheduling
  - Task assignment
  - Performance monitoring
  - Role-based access control

- 🚛 **Distribution Tracking**
  - Order management
  - Real-time delivery tracking
  - Customer database
  - Inventory control

- 📊 **Analytics & Reports**
  - Custom report generation
  - Performance metrics
  - Financial insights
  - Trend analysis

## Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- React Query
- NextAuth.js
- Socket.io Client
- Heroicons

### Backend
- Node.js
- Express
- MongoDB
- Socket.io
- JWT Authentication

### DevOps
- Docker
- Docker Compose
- GitHub Actions (CI/CD)

## Getting Started

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/berkat-farm.git
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
```bash
# Client (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-uri

# Server (.env)
PORT=3001
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
```

4. Run with Docker:
```bash
docker-compose up --build
```

Or run locally:
```bash
# Start the client (in client directory)
npm run dev

# Start the server (in server directory)
npm run dev
```

### Project Structure

```
berkat-farm/
├── client/                 # Frontend application
│   ├── app/               # Next.js app directory
│   ├── components/        # Reusable components
│   ├── shared/           # Shared types and utilities
│   └── public/           # Static assets
├── server/                # Backend application
│   ├── src/              # Source code
│   ├── controllers/      # Route controllers
│   ├── models/          # Database models
│   └── services/        # Business logic
└── shared/               # Shared code between client and server
```

## Development

### Code Style
- ESLint for code linting
- Prettier for code formatting
- Husky for pre-commit hooks

### Testing
```bash
# Run frontend tests
cd client
npm test

# Run backend tests
cd server
npm test
```

### Building for Production
```bash
# Build frontend
cd client
npm run build

# Build backend
cd server
npm run build
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the reliable database
- All contributors who have helped shape this project

## Contact

**Client**: 
Berkat Farm Trading
- Website: [https://berkatfarm.com](https://berkatfarm.com)

**Developer**:
Aiman Asyraf - [@aimaneth](https://x.com/aimaneth)

Project Link: [https://github.com/aimaneth/berkat-farm](https://github.com/aimaneth/berkat-farm)

---

Commissioned by Berkat Farm Trading. Developed with ❤️ by [Aiman Asyraf]
