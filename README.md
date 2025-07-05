# 💇 Parlour Admin Dashboard – Full Stack Role-Based App

A powerful full-stack admin dashboard for managing salon/parlour operations with real-time attendance, task assignment, and role-based access control.

---

## 🚀 Features

✅ Role-Based Login (Superadmin, Admin, Employee)  
✅ Unified Login System  
✅ Token-Based Auth (JWT)  
✅ Employee & Task Management  
✅ Real-Time Attendance Tracking  
✅ Punch In/Out for Employees  
✅ Clean UI with Tabs (using ShadCN + TailwindCSS)  
✅ Protected Routes  
✅ MongoDB Integration  
✅ RESTful API (Node.js + Express + TypeScript)

---

## 🧠 Roles & Access

| Role        | Dashboard Access | Can Add/Edit Users | Can Punch In/Out |
|-------------|------------------|---------------------|------------------|
| Superadmin  | ✅ Yes           | ✅ Yes              | ❌ No            |
| Admin       | ✅ Yes           | ❌ No               | ❌ No            |
| Employee    | ❌ No            | ❌ No               | ✅ Yes           |

---

## 📁 Project Structure

parlour-project/
├── backend-parlour-api/ # Express + MongoDB + JWT + TS
│ ├── models/ # User, Task, Attendance
│ ├── routes/ # Auth, Task, Employee, Attendance
│ ├── controllers/
│ └── config/
└── frontend-parlour-ui/ # Next.js 15 + Tailwind + ShadCN
├── app/
├── components/
├── layouts/
└── pages/

yaml
Copy
Edit

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 App Router, TypeScript, Tailwind CSS, ShadCN UI
- **Backend:** Node.js, Express, MongoDB, JWT, Bcrypt
- **Database:** MongoDB Atlas
- **Auth:** JWT + Role-Based
- **Optional:** Socket.IO (for live attendance updates)

---

## 🧪 Local Setup Instructions

### 1️⃣ Clone the project

```bash
git clone https://github.com/your-username/parlour-admin-dashboard.git
cd parlour-admin-dashboard
2️⃣ Setup Backend
bash
Copy
Edit
cd backend-parlour-api
npm install
Create a .env file:

env
Copy
Edit
PORT=8000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
Start the backend server:

bash
Copy
Edit
npm run dev
3️⃣ Setup Frontend
bash
Copy
Edit
cd frontend-parlour-ui
npm install
Create a .env.local file:

env
Copy
Edit
NEXT_PUBLIC_API_URL=http://localhost:8000
Start the frontend app:

bash
Copy
Edit
npm run dev
🧑‍💻 Test Credentials
bash
Copy
Edit
# Superadmin
Email: super@admin.com
Password: admin123

# Admin
Email: admin@site.com
Password: admin123

# Employee
Email: emp@site.com
Password: admin123
