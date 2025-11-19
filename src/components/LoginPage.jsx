import React, { useState } from 'react';
import image from "../assets/img.jpg";
import login from "../assets/login.jpg";

export default function LoginPage({ onLogin }) {
  const [userType, setUserType] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email && password) {
      onLogin(userType, email);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      
      {/* MAIN UNIFIED BOX */}
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

        {/* LEFT SIDE IMAGE */}
        <div className="w-full md:w-1/2 h-72 md:h-auto">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>

        {/* RIGHT SIDE LOGIN + LOGO */}
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          {/* Logo Section */}
          <div className="text-center mb-6">
            <div className="w-20 h-20 mx-auto mb-4 bg-linear-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
              <img src={image} alt="" className="rounded-full w-16 h-16 object-cover" />
            </div>
<h1 className="font-poppins text-4xl font-bold text-[#00A1DE]">
  MDDM Inter College
</h1>
          </div>

          {/* User Type Selection */}
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setUserType('student')}
              className={`flex-1 py-3 rounded-lg font-semibold focus:outline-none transition-all ${
                userType === 'student'
                  ? 'bg-green-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Student
            </button>

            <button
              onClick={() => setUserType('teacher')}
              className={`flex-1 py-3 rounded-lg font-semibold focus:outline-none transition-all ${
                userType === 'teacher'
                  ? 'bg-purple-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Teacher
            </button>
          </div>

          {/* Login Form */}
          <div className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition"
            />

            <button
              onClick={handleLogin}
              className="w-full bg-linear-to-r from-green-500 to-purple-500 text-white py-3 rounded-lg font-bold hover:shadow-lg focus:outline-none transition-all"
            >
              Sign In
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
