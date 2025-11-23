"use client";

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");

    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      // Save session
      localStorage.setItem("admin-auth", "true");

      window.location.href = "/admin";
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <main className="p-10 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <div className="mb-4">
        <input
          type="password"
          placeholder="Enter admin password"
          className="border px-4 py-3 rounded w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="button" // 👈 THIS FIXES THE ISSUE
        onClick={login}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
