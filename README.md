
# 📦 TrackNGo - Parcel Management System

TrackNGo is a full-stack parcel management web application designed for booking, managing, and tracking parcel deliveries with ease. Built with the **MERN stack**, the platform features user role management, real-time delivery tracking, reviews, payment integration, and an advanced admin dashboard.

---

## 🔗 Live Website

> 🌐 [TrackNGo Live](https://trackngo-delivery-service.web.app)  

---

## 🚀 Features

### ✅ General
- Responsive and modern UI built with **React** + **TailwindCSS**
- Authentication with **Firebase**
- Role-based access control (User, Delivery Men, Admin)
- Image uploads via **imgbb API** 

### 🧑‍💼 User Functionality
- Register/login with email/password or social login
- Book parcels with relevant details
- View delivery status and history
- Give reviews and ratings for delivery men

### 🚚 Delivery Man
- See assigned parcels
- Mark parcels as delivered
- View ratings and parcel history

### 🛠️ Admin Panel
- Promote users to Delivery Man/Admin
- View total users, parcels, and revenue
- Manage all parcels, users, and reviews
- Add promotional banners or content

### 💳 Payments
- Stripe integration for parcel booking
- Secure and simple checkout

### 📊 Statistics & Visualization
- Dashboard with animated statistics using **react-countup**
- Top delivery men based on delivery count and average rating
- Data fetched from backend with **TanStack React Query**

---

## 🛠️ Tech Stack

### Frontend:
- React
- React Router
- Tailwind CSS
- Framer Motion
- React Hook Form
- React CountUp
- React Query (TanStack)

### Backend:
- Node.js
- Express.js
- MongoDB 
- JWT for authorization
- Stripe for payment processing

---


## 🧪 Installation & Setup

### 📦 Backend Setup

```bash
cd server
npm install
npm start
```

### 🌐 Frontend Setup

```bash
cd client
npm install
npm run dev
```

---

