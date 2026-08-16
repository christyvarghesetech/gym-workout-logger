# 🏋️ Gym Workout Logger

A premium, full-stack fitness logging application built with **React**, **Django REST Framework**, and **JWT Authentication**. It features a modern, responsive **Black & Gold theme** with detailed workout tracking, exercise logging, and real-time validation.

---

## 🌟 Features

*   **Premium Theme**: State-of-the-art dark theme with gold accents, micro-animations, and fluid responsive layouts.
*   **Secure Authentication**: JWT-based user sign-up, login, and protected routes using `django-rest-framework-simplejwt`.
*   **Workout Dashboard**: Create and view workout sessions filtered by date.
*   **Interactive Session Logs**: Add, update, and delete exercises (sets, reps, weight) inside active sessions in a clean desktop table or mobile card layout.
*   **Dark Mode Native Inputs**: Full integration of native browser controls (such as calendars and forms) aligned to the dark color scheme.
*   **Clean Database Separations**: Seamless migrations between developer SQLite databases and production-ready PostgreSQL configurations.

---

## 🛠️ Tech Stack

### Frontend
*   **React (JS)**: Interactive single-page application structure.
*   **Axios**: API communication client with interceptors to handle automatic bearer token authentication.
*   **React Router DOM**: Client-side navigation, element routing, and route guards.
*   **Vanilla CSS**: Flexible, custom-designed dark-and-gold styling sheets.

### Backend
*   **Django 6.x & Django REST Framework (DRF)**: High-performance RESTful API endpoints.
*   **SimpleJWT**: Stateless JSON Web Token generation, verification, and rotation.
*   **Django CORS Headers**: Domain allowance config for cross-origin client requests.
*   **dj-database-url & Psycopg**: Database adapter parsing for dynamic environment database variables (SQLite / PostgreSQL).
*   **WhiteNoise**: Direct static asset collection and serving in production.

---

## 📂 Project Structure

```
GymLogger/
├── backend/            # Django REST API
│   ├── accounts/       # User auth endpoints and serialization
│   ├── workouts/       # Session & Exercise models, views, and urls
│   ├── config/         # Django settings, CORS config, and root URLs
│   ├── db.sqlite3      # Local database
│   ├── manage.py
│   ├── requirements.txt
│   └── build.sh        # Production deployment build script
│
├── frontend/           # React Frontend Application
│   ├── public/         # Static assets and index.html
│   ├── src/
│   │   ├── api/        # Axios client instance config
│   │   ├── components/ # Navbar, protected routes, and spinner
│   │   ├── context/    # Global Auth State context providers
│   │   ├── pages/      # LandingPage, Login, Register, Dashboard, Details
│   │   └── styles/     # global.css premium theme rules
│   ├── package.json
│   └── README.md
│
└── README.md           # Project Documentation (This File)
```

---

## 🚀 Local Installation & Setup

### Prerequisites
*   **Node.js** (v18 or higher)
*   **Python** (v3.10 or higher)

---

### 1. Backend Setup

Navigate to the `backend/` directory:
```bash
cd backend
```

Create and activate a virtual environment:
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS / Linux
python3 -m venv venv
source venv/bin/activate
```

Install requirements:
```bash
pip install -r requirements.txt
```

Run database migrations:
```bash
python manage.py migrate
```

*(Optional)* Create an admin superuser account:
```bash
python manage.py createsuperuser
```

Start the local development server:
```bash
python manage.py runserver
```
The backend server will run at: **`http://127.0.0.1:8000/`**

---

### 2. Frontend Setup

Navigate to the `frontend/` directory:
```bash
cd ../frontend
```

Install the node dependencies:
```bash
npm install
```

Start the React development server:
```bash
npm start
```
The app will open automatically in your browser at: **`http://localhost:3000/`**

---

## 🌐 Production Deployment

The project is preconfigured to be deployed easily on the cloud:

### Backend (e.g. Render / Heroku)
1. Set the **Build Command** on your platform to:
   ```bash
   bash build.sh
   ```
2. Set the **Start Command** to:
   ```bash
   gunicorn config.wsgi:application
   ```
3. Set your production environment variables:
   *   `DATABASE_URL`: PostgreSQL connection string (Render handles this automatically when linking a PostgreSQL database service).
   *   `DEBUG`: Set to `False`.

### Frontend (e.g. Vercel)
1. Add an environment variable during the frontend build:
   *   `REACT_APP_API_URL`: `https://your-backend-subdomain.onrender.com/api` (points Axios directly to your live API instance instead of defaulting to localhost).
