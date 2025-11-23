"use client";

import { useState } from "react";

export default function StudentLogin() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function login() {
    setError("");

    const res = await fetch("/api/student/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).then((r) => r.json());

    if (res.error) {
      setError(res.error);
      return;
    }

    // Save student ID
    localStorage.setItem("student_id", res.id);

    // Redirect to dashboard
    window.location.href = "/student/dashboard";
  }

  return (
    <main className="p-10 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Student Login
      </h1>

      <p className="text-gray-600 text-center mb-6">
        Enter the email you used during enrollment.
      </p>

      <input
        type="email"
        placeholder="example@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-3 rounded w-full mb-4"
      />

      <button
        onClick={login}
        className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded w-full"
      >
        Login
      </button>

      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
    </main>
  );
}
