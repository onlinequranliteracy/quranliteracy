"use client";

import { useState } from "react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");

    const res = await fetch("/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email.toLowerCase(),
        pin,
      }),
    });

    const data = await res.json();

    if (data.student) {
  // Save student ID so dashboard knows who is logged in
  localStorage.setItem("student_id", data.student.id);

  window.location.href = "/student/dashboard";
} else {
  setError("Invalid email or PIN.");
}

  }

  return (
    <main className="p-10 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold text-green-700 mb-6">Student Login</h1>

      <p className="text-gray-600 mb-6">Enter your email and PIN.</p>

      <input
        type="email"
        placeholder="Your email"
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="6-digit PIN"
        className="w-full border p-3 rounded mb-4"
        onChange={(e) => setPin(e.target.value)}
      />

      <button
        onClick={login}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
