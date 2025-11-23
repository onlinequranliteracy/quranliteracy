"use client";

import { useState, useEffect } from "react";

export default function AdminPage() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [students, setStudents] = useState([]);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classLink, setClassLink] = useState("");

  // ------------------------------
  // SECURE LOGIN + COOKIE SESSION
  // ------------------------------
  async function login() {
    const correctPass = process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim() ?? "";
    const entered = password.trim();

    if (entered === correctPass) {
      document.cookie = "admin_auth=1; path=/; max-age=86400;";
      setAuth(true);
      setError("");
    } else {
      setError("Incorrect password.");
    }
  }

  // ------------------------------
  // LOAD DATA AFTER AUTH SUCCESS
  // ------------------------------
  useEffect(() => {
    if (!auth) return;

    async function loadData() {
      const headers = {
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_PASSWORD!,
      };

      const s = await fetch("/api/admin/students", { headers }).then((r) =>
        r.json()
      );
      const p = await fetch("/api/admin/payments", { headers }).then((r) =>
        r.json()
      );

      setStudents(s.data || []);
      setPayments(p.data || []);
      
      setLoading(false);
    }

    loadData();
  }, [auth]);

  // ------------------------------
  // ADMIN — RENEW PAYMENT BUTTON
  // ------------------------------
  async function renewPayment(student: any) {
    const res = await fetch("/api/admin/renew", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_PASSWORD!,
      },
      body: JSON.stringify({ student }),
    });

    const data = await res.json();

    if (data.status === true && data.data.authorization_url) {
      window.open(data.data.authorization_url, "_blank");
    } else {
      alert("Failed to generate renewal payment link.");
    }
  }

  // ------------------------------
  // LOGIN PAGE (NO AUTH)
  // ------------------------------
  if (!auth) {
    return (
      <main className="p-10 max-w-md mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Admin Login</h1>

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

  // ------------------------------
  // ADMIN DASHBOARD
  // ------------------------------
  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* SUMMARY CARDS */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow rounded p-6">
              <h2 className="text-xl font-bold">Total Students</h2>
              <p className="text-3xl mt-2">{students.length}</p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-xl font-bold">Total Payments</h2>
              <p className="text-3xl mt-2">{payments.length}</p>
            </div>

            <div className="bg-white shadow rounded p-6">
              <h2 className="text-xl font-bold">Revenue (GHS)</h2>
              <p className="text-3xl mt-2">
                {payments.reduce((sum, p: any) => sum + Number(p.amount || 0), 0)}
              </p>
            </div>
          </section>

          {/* STUDENTS TABLE */}
          <h2 className="text-2xl font-bold mb-4">Students</h2>
          <table className="w-full mb-10 border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Course</th>
                <th className="p-3 border">Class</th>
                <th className="p-3 border">Days</th>
                <th className="p-3 border">Next Billing</th>
                <th className="p-3 border">Renew</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s: any) => (
                <tr key={s.id} className="border">
                  <td className="p-2">{s.full_name}</td>
                  <td className="p-2">{s.email}</td>
                  <td className="p-2">{s.course}</td>
                  <td className="p-2">{s.class_type}</td>
                  <td className="p-2">{s.days_per_week}</td>

                  <td
                    className={`p-2 ${
                      new Date(s.next_billing_date) < new Date()
                        ? "text-red-600 font-bold"
                        : ""
                    }`}
                  >
                    {s.next_billing_date
                      ? new Date(s.next_billing_date).toLocaleDateString()
                      : "—"}
                  </td>

                  <td className="p-2">
                    <button
                      onClick={() => renewPayment(s)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                    >
                      Renew
                    </button>
                  </td>
                  <td className="p-2">
  <button 
    onClick={() => renewPayment(s)} 
    className="text-blue-600 underline"
  >
    Renew
  </button>
</td>

<td className="p-2">
  <button 
    onClick={() => setClassLink(s)} 
    className="text-green-600 underline"
  >
    Set Link
  </button>
</td>

                </tr>
              ))}
            </tbody>
          </table>

          {/* PAYMENTS TABLE */}
          <h2 className="text-2xl font-bold mb-4">Payments</h2>
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Amount</th>
                <th className="p-3 border">Reference</th>
                <th className="p-3 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p: any) => (
                <tr key={p.id} className="border">
                  <td className="p-2">{p.amount}</td>
                  <td className="p-2">{p.reference}</td>
                  <td className="p-2">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </main>
  );
}
