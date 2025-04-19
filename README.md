# 🔐 Next.js Authentication with Supabase

This is a simple authentication system built with **Next.js** and **Supabase**. It includes a custom-built UI for login, protected routes, and a basic dashboard for authenticated users.

---

## 🚀 Demo

Live Demo: (https://next-auth-jet-beta.vercel.app/)

---

## 📌 Project Overview

This project implements a custom authentication system using **Supabase** for authentication, **Next.js** for the framework, and **Tailwind CSS** for styling. The application includes:

- **Custom Login Page**: No pre-built UI components used; fully custom design.
- **Protected Dashboard Page**: Accessible only after login.
- **Logout Functionality**: Users can log out, which clears their session.
- **Interactive Background Gradient**: Added mouse-responsive interactive background.

---

## 🛠️ Technologies Used

- **Frontend**: Next.js, Tailwind CSS
- **Authentication**: Supabase Auth
- **Deployment**: Vercel
- **Others**: JavaScript (ES6+), React

---

## 🚀 Installation Guide

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/tfkanhaiya/next-auth.git
cd next-auth
```

### 2️⃣ Install Dependencies

Make sure you have **Node.js** installed, then run:

```bash
npm install
```

### 3️⃣ Configure Environment Variables

Create a `.env.local` file and add your **Supabase credentials**:

```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4️⃣ Start the Development Server

```bash
npm run dev
```

Your app will be available at: [http://localhost:3000](http://localhost:3000)

### 5️⃣ Build for Production

```bash
npm run build
```

### 6️⃣ Run the Production Build

```bash
npm start
```

---

## 🔐 Authentication Flow

1. **Login Page**: Users input credentials (email/password).
2. **Supabase Auth**: Credentials are verified against Supabase's authentication service.
3. **Session Management**: Upon successful authentication, the session token is stored.
4. **Protected Routes**: Users are redirected to the `/dashboard` page after successful login. If no session exists, users are redirected to the login page.
5. **Logout**: Clicking the logout button clears the session and redirects to the homepage.

---

## 🎯 Features

- **Custom UI for Login**: Fully customizable UI for authentication.
- **Protected Routes**: Secure pages that are only accessible after login.
- **Interactive Background**: A dynamic background gradient that responds to mouse movement.
- **Logout Functionality**: Clear sessions and redirect users on logout.

---

## 💡 Contributing

We welcome contributions! To contribute:

1. **Fork** the repository
2. **Create** a new branch
   ```bash
   git checkout -b feature-name
   ```
3. **Commit** your changes
   ```bash
   git commit -m "Added new feature"
   ```
4. **Push** to your branch
   ```bash
   git push origin feature-name
   ```
5. **Open** a Pull Request

---

## 📜 License

This project is licensed under the **MIT License**.

---

## 🔗 Contact

For any queries or issues, feel free to reach out to:

👨‍💻 **Kanhaiya Kumar**  
🔗 [GitHub](https://github.com/tfkanhaiya)

