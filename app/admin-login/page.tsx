"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login() {
    const correct = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim();
    const entered = password.trim();

    if (entered === correct) {
      document.cookie = "admin_auth=1; path=/; max-age=86400;";
      window.location.href = "/admin";
    } else {
      setError("Incorrect password");
    }
  }

  return (
    <main className="p-10 max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-6">Admin Login</h1>

      <input
        type="password"
        placeholder="Enter admin password"
        className="border px-4 py-3 rounded w-full mb-4"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </main>
  );
}
