# 🏦 NexaBank — Full-Stack Banking Practice App

> ⚠️ **Disclaimer**
> This project was built **only for learning purposes** to practice building a full-stack application using a modern web stack.
> It is **not a real banking system** and **must not be used in production environments**.

---

# 📌 Overview

**NexaBank** is a simple full-stack banking practice application designed to explore how a frontend application communicates with a backend API and database.

The project demonstrates how to build a small system that supports:

* User authentication
* Account management
* Money transfers
* Transaction history

while learning how different technologies work together in a modern web stack.

---

# 🛠 Tech Stack

### Frontend

* React (with Vite)
* React Router — client-side routing
* Axios — API requests
* React Toastify — notifications

### Backend

* Node.js
* Express.js — REST API
* PostgreSQL — relational database
* bcrypt — password hashing
* JSON Web Token — authentication
* dotenv — environment configuration
* nodemon — development server auto-reload

---

# 📁 Project Structure

```
banking-practice-app
│
├── banking-backend
│   ├── server.js
│   ├── db.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── accounts.js
│   │   └── transactions.js
│   └── middleware
│       └── auth.js
│
└── banking-frontend
    ├── src
    │   ├── main.jsx
    │   ├── App.jsx
    │   ├── api
    │   │   └── axios.js
    │   ├── context
    │   │   └── AuthContext.jsx
    │   └── pages
    │       ├── Login.jsx
    │       ├── Register.jsx
    │       ├── Dashboard.jsx
    │       └── Transfer.jsx
    └── vite.config.js
```

---

# ✨ Features

* User registration and login
* Secure password hashing
* JWT-based authentication
* Protected API routes
* Automatic bank account creation on registration
* View account balance
* Transfer money between accounts
* Transaction history (sent & received)
* Database transactions to ensure safe money transfers

---

# ⚙️ Getting Started

## Prerequisites

You should have the following installed:

* Node.js (v18+ recommended)
* PostgreSQL
* npm or yarn

---

# 1️⃣ Clone the Repository

```bash
git clone https://github.com/BilalKalyar-200/nexabank.git
cd nexabank
```

---

# 2️⃣ Database Setup

Create the database in PostgreSQL:

```sql
CREATE DATABASE banking_db;
```

Then create the required tables:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(200) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  account_number VARCHAR(20) UNIQUE NOT NULL,
  balance DECIMAL(12,2) DEFAULT 1000.00,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  sender_account VARCHAR(20),
  receiver_account VARCHAR(20),
  amount DECIMAL(12,2),
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

# 3️⃣ Environment Configuration

Inside `banking-backend/`, create a `.env` file.

Example configuration:

```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=banking_db
JWT_SECRET=your_jwt_secret
```

⚠️ **Never commit `.env` files to GitHub.**

---

# 4️⃣ Run the Backend

```
cd banking-backend
npm install
npm run dev
```

Backend will start at:

```
http://localhost:5000
```

---

# 5️⃣ Run the Frontend

Open another terminal:

```
cd banking-frontend
npm install
npm run dev
```

Frontend will start at:

```
http://localhost:5173
```

---

# 🔗 API Endpoints

| Method | Endpoint                     | Description              | Auth |
| ------ | ---------------------------- | ------------------------ | ---- |
| POST   | `/api/auth/register`         | Register new user        | ❌    |
| POST   | `/api/auth/login`            | Login user               | ❌    |
| GET    | `/api/accounts/me`           | Get current account info | ✅    |
| POST   | `/api/transactions/transfer` | Transfer money           | ✅    |
| GET    | `/api/transactions/history`  | Transaction history      | ✅    |

---

# 🔐 Security Concepts Demonstrated

* Password hashing using **bcrypt**
* JWT authentication for secure sessions
* Database transactions for safe money transfers
* Protected routes using authentication middleware

---

# 🚀 Learning Outcomes

While building this project I learned:

* Structuring a **full-stack application**
* Connecting **React frontend with a REST API**
* Implementing **JWT authentication**
* Managing authentication state using **React Context**
* Handling secure database operations
* Using **environment variables** for sensitive configuration

---

# ⚠️ Limitations

This project intentionally keeps the architecture simple.
A real banking application would require additional features such as:

* HTTPS enforcement
* Advanced input validation
* Rate limiting
* Fraud detection
* Detailed audit logs
* Multi-factor authentication
* Secure infrastructure deployment
