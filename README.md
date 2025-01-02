# Berkat Farm Management System

A comprehensive farm management system built with Next.js and Node.js.

## Project Structure

The project is divided into two main parts:

- `client/`: Next.js frontend application
- `server/`: Node.js/Express backend API
- `shared/`: Shared types and constants between frontend and backend

## Technologies Used

### Frontend
- Next.js 13+ with App Router
- TypeScript
- Tailwind CSS
- NextAuth.js for authentication
- Mapbox for mapping features

### Backend
- Node.js with Express
- TypeScript
- MongoDB with Mongoose
- Socket.IO for real-time features

## Getting Started

### Prerequisites
- Node.js 16+
- MongoDB
- Git

### Installation

1. Clone the repository:
```bash
git clone <your-repository-url>
cd Berkat-Farm
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

Create `.env.local` in the client directory with:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=your_secret_key
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token
NEXT_PUBLIC_MAPBOX_STYLE_URL=your_mapbox_style_url
```

4. Start the development servers:

```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend
cd client
npm run dev
```

The frontend will be available at `http://localhost:3001` and the backend at `http://localhost:5000`.

## Features

- User authentication and authorization
- Farm activity tracking
- Livestock management
- Distribution tracking
- Team management
- Real-time updates
- Interactive maps

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
