# 💻 DevTinder

DevTinder is a social matchmaking platform built specifically for developers. Similar to popular dating apps, it allows developers to connect, network, swipe through cards, ignore or send interest requests, and build a network of peer connections.

---

## 🚀 Key Features

* **Tinder-style Stack Feed**: A stacked deck of developer cards. Swiping or clicking **Ignore** or **Interested** shifts cards dynamically using a premium card stack UI with smooth depth-scaling transitions.
* **Profile Management**: A dedicated edit profile page with a live card preview that displays changes (avatar, name, gender, age, bio, skills) in real time. Includes dropdown radio buttons for gender selection and comma-separated skills formatting.
* **Connections List**: Shows all accepted peers. Clean side-by-side cards displaying connections' details, avatars, and bios.
* **Incoming Connection Requests**: A central hub to review incoming interests. Accept or decline requests with instant updates.
* **Global State Management**: Redux-powered store keeping client states (user profiles, feed stacks, requests, connections) updated dynamically.
* **State Verification & Safety**: Integrated Axios credentials passing to maintain secure JWT-based sessions.

---

## 🛠️ Technology Stack

### Frontend (`DT-Web`)
* **Core**: React 19, Vite (HMR enabled)
* **Styling**: Tailwind CSS v4 + DaisyUI v5 (harmonious dark/light theme tokens and layout components)
* **Routing**: React Router Dom v7
* **State**: Redux Toolkit + React Redux

### Backend (`DT-BE`)
* **Runtime**: Node.js
* **Framework**: Express.js
* **Database**: MongoDB (Object data modeling via Mongoose)
* **Security**: JSON Web Token (JWT) cookies, CORS integration, bcrypt hashing

---

## 📁 Directory Structure

```text
DevTinder/
├── DT-BE/                    # Backend API Service
│   ├── src/
│   │   ├── config/           # Database configuration
│   │   ├── middlewares/      # Express middlewares (auth checks)
│   │   ├── models/           # Mongoose schemas (User, ConnectionRequest)
│   │   ├── routes/           # Router modules (auth, profile, connection, user)
│   │   └── app.js            # Express application entry point
│   ├── package.json
│   └── readme.md
│
└── DT-Web/                   # React Frontend App
    ├── src/
    │   ├── components/       # UI Components (Body, NavBar, Feed, EditProfile, Connections, Requests)
    │   ├── utils/            # Utilities (Redux slices, appStore, constants)
    │   ├── App.jsx           # Routing & Redux provider configuration
    │   └── main.jsx
    ├── package.json
    └── README.md
```

---

## ⚙️ Local Development Setup

Follow these steps to run both backend and frontend applications locally:

### 1. Backend Setup (`DT-BE`)
1. Navigate to the backend directory:
   ```bash
   cd DT-BE
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   * Ensure your local MongoDB database instance is running.
   * Verify/configure database connections inside [database.js](file:///Users/saikrishnamuthukuru/Working/Programming/NamasteDev/DevTinder/DT-BE/src/config/database.js).
4. Run the development server (uses `nodemon` for auto-reloading):
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:7777`.

### 2. Frontend Setup (`DT-Web`)
1. Navigate to the frontend directory:
   ```bash
   cd DT-Web
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server (uses `vite`):
   ```bash
   npm run dev
   ```
   Open the browser at `http://localhost:5173`.

---

## 🔌 API Endpoints Summary

Below is the list of available API routes configured on the backend server:

### Authentication
* `POST /signup` - Register a new user
* `POST /login` - Log in an existing user
* `POST /logout` - Log out current user (clears session cookie)

### Profile Management
* `GET /profile/view` - Fetch the authenticated user's profile
* `PATCH /profile/edit` - Edit profile details (firstName, lastName, gender, age, skills, about, photoURL)

### Connections & Network
* `GET /user/feed` - Fetch the recommendation feed (excluding yourself, connections, and ignored profiles)
* `POST /connection/request/send/:status/:userId` - Send connection request (`interested` or `ignored`)
* `GET /requests/received` - Fetch incoming connection requests
* `POST /connection/request/review/:status/:requestId` - Review an incoming request (`accepted` or `rejected`)
* `GET /user/connections` - Fetch all active accepted connections