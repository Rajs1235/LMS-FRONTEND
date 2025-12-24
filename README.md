# 🚀 1Fi LMS – Loan Management System

A full‑stack **Loan Management System (LMS)** built as part of the **1Fi SDE Assignment**.  
This project demonstrates backend API design, admin workflows, authentication, and frontend integration.

---

## ✨ Features

### 🔐 Admin Features
- Admin authentication using **JWT**
- Protected admin dashboard
- View all loan applications
- Update loan status & KYC verification
- Create and manage loan products

### 📄 Loan Management
- Public loan product listing
- Loan application submission with collateral
- LTV validation based on product rules
- Status lifecycle: `Pending → Ongoing → Approved / Rejected`

### 📧 Email Notification Logic (Demo Mode)
- Email notifications are implemented using **Resend Email API**
- Emails are triggered automatically **when loan status is updated**
- ⚠️ **Important Note (Demo Limitation):**
  - Resend allows **free testing emails only to the account owner’s email**
  - Sending emails to arbitrary users requires **domain verification (paid plan)**
  - For this demo, email delivery can be observed **only on the primary account email**
  - Logic is production‑ready and can be enabled fully by verifying a domain

This limitation is **provider‑side**, not a code limitation.

---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Resend (Email API)

### Frontend
- React + Vite
- React Router
- Axios
- Tailwind CSS

---

## 📁 Repository Structure

```
LMS/
├── Backend/
│   ├── app.js
│   ├── index.js
│   ├── Controllers/
│   ├── Routes/
│   ├── Models/
│   ├── middleware/
│   └── .env
│
├── Frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
│
└── README.md
```

---

## 🔑 Environment Variables

### Backend (`Backend/.env`)
```
PORT=8000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
RESEND_API_KEY=your_resend_api_key (optional – demo mode)
```

### Frontend (`Frontend/.env` or Vercel env)
```
VITE_API_URL=https://lms-backend-thkb.onrender.com/api/v1
```

---

## ▶️ Running Locally

### Backend
```bash
cd Backend
npm install
npm run dev
```

### Frontend
```bash
cd Frontend
npm install
npm run dev
```

---

## 🌐 Deployed URLs

- **Backend (Render):**  
  https://lms-backend-thkb.onrender.com

- **Frontend (Vercel):**  
  https://lms-frontend-bm49.vercel.app

---

## 🧪 API Overview

Base URL:
```
/api/v1
```

### Public
- `GET /loans/product` – Get loan products
- `POST /loans/apply` – Submit loan application

### Admin (JWT Protected)
- `POST /admin/login`
- `POST /admin/register`
- `GET /loans/list`
- `PATCH /loans/update-status/:id`
- `POST /loans/product`

---

## 📝 Notes for Reviewers

- Email notifications are **fully implemented and tested**
- Demo limitation exists due to **free tier restrictions of email provider**
- All core requirements from the assignment PDF are implemented
- Focus was on **clean architecture, validations, and real‑world readiness**

---

 
Thank you for reviewing 🙌
