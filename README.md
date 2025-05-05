# MERN AUTH - Authentication System

## 📌 Overview
MERN AUTH is a full-stack authentication system built using the **MERN** stack (**MongoDB, Express.js, React, Node.js**). This project provides user authentication, email verification, password reset, and session management.

## 🚀 Features
- User Registration & Login
- JWT-based Authentication
- Secure Password Hashing with bcrypt
- Email Verification via OTP
- Password Reset Functionality
- Protected Routes (for authorized users only)
- Logout functionality
- Responsive UI with React & TailwindCSS

## 🛠 Tech Stack
### **Frontend**
- React.js (Vite)
- React Router
- Context API
- TailwindCSS
- Axios
- React Toastify

### **Backend**
- Node.js
- Express.js
- MongoDB (Mongoose)
- bcrypt.js (Password Hashing)
- JSON Web Token (JWT)
- Nodemailer (Email Service)
- dotenv (Environment Variables)
- Cookie Parser


## 🔑 Authentication Flow
1. **Register** → User signs up, receives a verification OTP via email.
2. **Verify Email** → User enters OTP to verify the account.
3. **Login** → User logs in and receives a JWT token.
4. **Protected Routes** → JWT is used to access restricted routes.
5. **Logout** → Token is cleared from cookies.


## **Conclusion**
MERN AUTH provides a secure, scalable, and efficient authentication system for web applications. With its robust JWT-based authentication, email verification, and password reset features, it ensures user data security and a seamless user experience. Feel free to contribute and enhance the project further!
