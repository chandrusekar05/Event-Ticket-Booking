# CampusPass — Event Ticket Booking App

Modern event booking platform for colleges — students can discover and book events, and admins can manage everything seamlessly.

## Features

- **Student Dashboard**: Browse events, book tickets
- **Event Management**: Admins can create, edit, delete events
- **Ticket System**: QR code tickets, instant download, email delivery
- **Attendance Tracking**: Scan tickets to verify and mark attendance
- **Admin Analytics**: Real-time stats (total events, bookings, attendance)
- **Responsive Design**: Smooth UI on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Express.js, MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Ticket Generation**: html2canvas, jsPDF
- **Deployment**: Render (Backend), Vercel (Frontend)

## Installation

### 1. Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit variables inside .env

# Start server
npm run dev
```

### 2. Frontend Setup

```bash
# Navigate to frontend
cd client

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

### Default Credentials

**Admin**: `[EMAIL_ADDRESS]` / `password123`  
**Student**: `[EMAIL_ADDRESS]` / `student123`

### Access Points

- **Student Dashboard**: `http://localhost:5173`  
- **Admin Dashboard**: `http://localhost:5173/admin`

## Tech Stack Details

### Frontend

- **React 18**: Component-based architecture
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first styling
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client
- **JWT Decode**: Token utilities

### Backend

- **Express.js**: Web framework
- **MySQL**: Database
- **JWT**: Authentication
- **Bcrypt**: Password hashing
- **Multer**: File uploads
- **Dotenv**: Environment variables

## Deployment

### Backend (Render)

1. Create a new Web Service on Render
2. Connect GitHub repository
3. Set build command: `npm install`
4. Set start command: `npm run dev`
5. Configure environment variables (DB, JWT_SECRET, etc.)

### Frontend (Vercel)

1. Import project to Vercel
2. Framework preset: React
3. Build command: `npm run build`
4. Install command: `npm install`
5. Output directory: `dist`
6. Environment variables (optional)

## License

ISC