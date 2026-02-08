# 🌌 Cosmic Watch

**Interstellar Asteroid Tracker & Risk Analyzer** – A real-time planetary defense system for monitoring Near-Earth Objects (NEOs)

![Mission Control](https://img.shields.io/badge/Status-Operational-green)
![Python](https://img.shields.io/badge/Python-3.13-blue)
![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![Oracle](https://img.shields.io/badge/Database-Oracle-red)

## 🎯 Overview

Cosmic Watch is a comprehensive web application designed to track and analyze Near-Earth Objects using real-time data from NASA's NeoWs API. The system provides advanced risk analysis, real-time alerts, and an immersive 3D visualization interface for planetary defense operations.

## ✨ Features

### 🔭 Real-Time Tracking
- Live asteroid feed from NASA's NeoWs API
- Automated data updates every 6 hours
- WebSocket-based real-time updates

### 🛡️ Risk Analysis
- Automated threat assessment algorithms
- Risk scoring based on size, velocity, and miss distance
- Hazardous asteroid identification

### 📊 Mission Control Dashboard
- Real-time telemetry and statistics
- 3D orbital visualization engine
- NEO database with 18+ tracked objects

### 🔐 Secure Authentication
- JWT-based user authentication
- Role-based access control
- Encrypted communication channels

### 🚨 Alert System
- Automated alerts for high-risk asteroids
- Real-time notifications via WebSocket
- Configurable alert thresholds

### 📡 Live Communications
- Secure chat channels for researchers
- Real-time collaboration features
- Encrypted messaging

## 🏗️ Architecture

### Backend (Flask + Python)
- **Framework**: Flask with Flask-SocketIO
- **Database**: Oracle Database (XE)
- **Authentication**: JWT tokens
- **Scheduler**: APScheduler for automated jobs
- **API Integration**: NASA NeoWs API

### Frontend (Next.js + React)
- **Framework**: Next.js 16.1.6 with React 19
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js with React Three Fiber
- **Real-time**: Socket.IO client
- **UI Components**: Custom components with Lucide icons

## 📁 Project Structure

```
cosmic-watch/
├── backend/                 # Flask backend server
│   ├── app.py              # Main application entry
│   ├── auth.py             # Authentication logic
│   ├── routes.py           # API endpoints
│   ├── db.py               # Database connection
│   ├── nasa.py             # NASA API integration
│   ├── scheduler_jobs.py   # Scheduled tasks
│   ├── socket_events.py    # WebSocket handlers
│   ├── middleware.py       # JWT middleware
│   ├── extensions.py       # Flask extensions
│   ├── init_db.py          # Database initialization
│   ├── requirements.txt    # Python dependencies
│   └── Dockerfile          # Backend container
│
├── frontend/               # Next.js frontend
│   ├── app/               # Next.js app directory
│   │   ├── page.tsx       # Landing page
│   │   ├── login/         # Login page
│   │   ├── register/      # Registration page
│   │   └── dashboard/     # Dashboard pages
│   ├── components/        # React components
│   │   ├── telescope-hero.tsx    # 3D hero animation
│   │   ├── solar-system.tsx      # 3D solar system
│   │   ├── chat-panel.tsx        # Chat interface
│   │   ├── watchlist-panel.tsx   # Watchlist UI
│   │   └── ui/                   # UI components
│   ├── lib/               # Utility libraries
│   │   ├── api.ts         # API client
│   │   └── auth-context.tsx      # Auth context
│   └── Dockerfile         # Frontend container
│
├── docker-compose.yml     # Docker orchestration
└── postman_collection.json # API testing collection
```

## 🚀 Getting Started

### Prerequisites

- **Python 3.13+**
- **Node.js 20+**
- **Oracle Database XE** (or access to Oracle DB)
- **NASA API Key** (free from [NASA API Portal](https://api.nasa.gov/))

### Environment Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/cosmic-watch.git
cd cosmic-watch
```

2. **Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. **Create backend/.env file**
```env
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_DSN=your_db_host:port/service_name

JWT_SECRET=your_secret_key_here
NASA_API_KEY=your_nasa_api_key
```

4. **Initialize Database**
```bash
python init_db.py
```

5. **Frontend Setup**
```bash
cd ../frontend
npm install
```

6. **Create frontend/.env.local file** (optional)
```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Running the Application

#### Option 1: Manual Start

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate
python app.py
```
Backend runs on: `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

#### Option 2: Docker Compose

```bash
docker-compose up --build
```

Access the application at `http://localhost:3000`

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - Register new user
- `POST /api/login` - User login (returns JWT)

### Asteroids
- `GET /api/asteroids` - Get asteroid feed
- `GET /api/stats` - Get NEO statistics
- `GET /api/fetch-asteroids` - Trigger NASA data update
- `GET /api/risk-analysis/:id` - Get risk analysis for asteroid

### Watchlist (Protected)
- `GET /api/watchlist` - Get user's watchlist
- `POST /api/watchlist` - Add asteroid to watchlist
- `DELETE /api/watchlist/:id` - Remove from watchlist

### Health
- `GET /health` - Backend health check

## 🧪 Testing

A comprehensive Postman collection is included in `postman_collection.json`.

**Import into Postman:**
1. Open Postman
2. Import → `postman_collection.json`
3. Set environment variable: `base_url = http://localhost:5001`
4. Run the collection

## 📊 Database Schema

The application uses Oracle Database with the following main tables:

- **users** - User accounts and authentication
- **asteroids** - NEO data from NASA
- **asteroid_approach** - Approach data and risk scores
- **watchlist** - User watchlist entries
- **messages** - Chat messages

See `backend/init_db.py` for complete schema.

## 🛠️ Tech Stack

**Backend:**
- Flask 3.x
- Flask-SocketIO
- Flask-CORS
- APScheduler
- PyJWT
- oracledb
- requests

**Frontend:**
- Next.js 16.1.6
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4
- Three.js
- React Three Fiber
- Socket.IO Client
- Lucide React

## 🔒 Security

- JWT-based authentication
- Password hashing with werkzeug
- Environment variable protection
- CORS configuration
- Secure WebSocket connections

## 📝 License

This project is created for educational purposes as part of a Web Hackathon.

## 🙏 Acknowledgments

- **NASA NeoWs API** for providing asteroid data
- **Oracle Database** for robust data storage
- **Three.js** for 3D visualization capabilities

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**⚠️ Note**: This is a hackathon project. For production deployment, additional security hardening and scalability improvements are recommended.
