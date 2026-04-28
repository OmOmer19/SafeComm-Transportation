# 🚌 SafeComm Transportation

![React](https://img.shields.io/badge/React-17.0.2-blue)
![Vite](https://img.shields.io/badge/Vite-4.0.0-green)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.3.2-blueviolet)
![Node.js](https://img.shields.io/badge/Node.js-18.0.0-green)
![Express](https://img.shields.io/badge/Express-4.18.2-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.0-brightgreen)
![License](https://img.shields.io/badge/License-MIT-yellow)

A community-based safety platform for public transportation in Kanpur. SafeComm helps users make informed decisions about their daily commutes through real-time vehicle tracking, crowdsourced safety ratings, and incident reporting.

---

## 🌟 Features

### Core Features
- 🔐 **JWT Authentication** — Secure user registration and login
- 🗺️ **Real-Time Vehicle Tracking** — Live tracking of buses, metros and autos on Google Maps via Socket.io
- ⭐ **Route Safety Ratings** — Users can rate routes based on personal experiences
- 🚨 **Incident Reporting** — Report unsafe situations on routes in real-time
- 🔒 **Role-Based Access Control** — Separate access for users and admins

### Unique Feature
- 🔍 **Initial Route Safety Consultation** — When selecting a route, the system suggests similar routes ranked by safety score

### Challenging Features
- 📊 **Admin Dashboard** — Data visualizations with charts showing safety scores and incident statistics
- ⚡ **Real-Time Updates** — Live vehicle location updates using Socket.io

---

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- Socket.io
- JWT + bcryptjs
- Google Maps Platform

### Frontend
- React + Vite
- Tailwind CSS
- Framer Motion
- Google Maps JavaScript API
- Recharts
- Axios + Socket.io-client

---

## 📁 Project Structure

```
SafeComm-Transportation/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handler logic
│   ├── middleware/      # Auth and RBAC middleware
│   ├── models/          # Mongoose schemas
│   ├── routes/          # Express routers
│   ├── sockets/         # Socket.io handlers
│   ├── seed.js          # Database seeder
│   └── server.js        # Entry point
├── frontend/
│   ├── src/
│   │   ├── api/         # Axios configuration
│   │   ├── components/  # Reusable components
│   │   └── pages/       # Page components
│   └── index.html
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Google Maps API Key

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file in backend:
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Run the server:
```bash
npm run dev
```

Seed the database:
```bash
npm run seed
```

### Frontend Setup
```bash
cd frontend
npm install
```

Create `.env` file in frontend:
```env
VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

Run the frontend:
```bash
npm run dev
```

---

## 👥 Roles

| Role | Access |
|------|--------|
| **User** | View map, rate routes, report incidents, view similar routes |
| **Admin** | All user access + dashboard with charts and stats |

---

## 📸 Pages

- `/` — Home page with live Google Maps vehicle tracking
- `/routes` — All transit routes with safety scores
- `/routes/:id` — Route details, ratings, similar routes and incident reporting
- `/admin` — Admin dashboard with data visualizations
- `/login` — User login
- `/register` — User registration

---

## 🌐 Environment Variables

### Backend `.env`
| Variable | Description |
|----------|-------------|
| `PORT` | Server port (default: 5000) |
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for JWT tokens |

### Frontend `.env`
| Variable | Description |
|----------|-------------|
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps JavaScript API key |

---

## 👨‍💻 Developer

Made by **Om Omer**
