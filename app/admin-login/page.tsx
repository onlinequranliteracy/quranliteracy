"use client";

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || ""; // compile-time constant

import { useState } from "react";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function login() {
    setError("");

    if (password.trim() === ADMIN_PASSWORD.trim()) {
      localStorage.setItem("admin-auth", "true");
      window.location.href = "/admin";
    } else {
      setError("Incorrect password.");
    }
  }

  return (
    <main className="p-10 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <input
        type="password"
        placeholder="Enter admin password"
        className="border px-4 py-3 rounded w-full mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="button"
        onClick={login}
        className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
