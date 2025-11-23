"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function EnrollPage() {
  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Qaaidatu Nooraniya");
  const [classType, setClassType] = useState("");
  const [days, setDays] = useState(1);

  // pricing logic
  const pricePerLesson =
    classType === "group" ? 5 : classType === "one" ? 10 : 0;

  const total = pricePerLesson * days * 4;

  async function handlePayment() {
    if (!fullName || !email || !phone || !classType) {
      alert("Please fill all fields before proceeding.");
      return;
    }

    const payload = {
      full_name: fullName,
      email,
      phone,
      course,
      class_type: classType,
      days,
      amount: total,
    };

    const res = await fetch("/api/paystack/initialize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then((r) => r.json());

    if (res?.data?.authorization_url) {
      window.location.href = res.data.authorization_url;
    } else {
      alert("Payment initialization failed.");
    }
  }

  return (
    <main className="px-6 md:px-16 py-20">
      <h1 className="text-4xl font-bold text-green-700 text-center">
        Enroll Now
      </h1>
      <p className="text-center text-gray-600 mt-2 max-w-xl mx-auto">
        Fill in your details to proceed with your enrollment and secure payment.
      </p>

      <div className="max-w-2xl mx-auto mt-12 border rounded-2xl shadow-sm p-10">

        {/* Full Name */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Full Name
          </label>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Email
          </label>
          <input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="example@email.com"
          />
        </div>

        {/* WhatsApp Number */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            WhatsApp Number
          </label>
          <input
            type="tel"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border rounded-lg p-3"
            placeholder="+4474..."
          />
        </div>

        {/* Course */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Course
          </label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full border rounded-lg p-3"
          >
            <option>Qaaidatu Nooraniya</option>
            <option>Tajweed</option>
            <option>Hifz (Memorization)</option>
            <option>Salah Training</option>
            <option>Dua & Adhkar</option>
          </select>
        </div>

        {/* CLASS TYPE */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">
            Class Type
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setClassType("group")}
              className={`border rounded-lg p-4 ${
                classType === "group"
                  ? "bg-green-600 text-white"
                  : "hover:bg-green-50"
              }`}
            >
              Group (£5)
            </button>

            <button
              onClick={() => setClassType("one")}
              className={`border rounded-lg p-4 ${
                classType === "one"
                  ? "bg-green-600 text-white"
                  : "hover:bg-green-50"
              }`}
            >
              One-on-One (£10)
            </button>
          </div>
        </div>

        {/* DAYS */}
        <div className="mb-8">
          <label className="block mb-2 font-semibold text-gray-700">
            Days per Week
          </label>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="w-full border rounded-lg p-3"
          >
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d}>{d}</option>
            ))}
          </select>
        </div>

        {/* PRICE RESULT */}
        <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-md mb-10">
          <h3 className="text-xl font-bold text-green-700">Total Monthly Fee</h3>
          <p className="mt-2 text-3xl font-bold">£{total}</p>
          <p className="text-gray-600 mt-1">
            Based on £{pricePerLesson} × {days} day(s) × 4 weeks.
          </p>
        </div>

        {/* PAYMENT BUTTON */}
        <Button
          onClick={handlePayment}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
        >
          Proceed to Payment
        </Button>
      </div>
    </main>
  );
}
