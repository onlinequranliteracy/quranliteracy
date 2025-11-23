"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingWithCalculator() {
  // CALCULATOR STATE
  const [course, setCourse] = useState("Qaaidatu Nooraniya");
  const [classType, setClassType] = useState("");
  const [days, setDays] = useState(1);

  // PRICING LOGIC
  const pricePerLesson = classType === "group" ? 5 : classType === "one" ? 10 : 0;
  const total = pricePerLesson * days * 4;

  return (
    <main className="bg-white px-6 md:px-16 py-16 text-gray-900">

      {/* PAGE HEADER */}
      <section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-green-700">
          Pricing & Monthly Calculator
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Simple, flexible monthly Qur’an class pricing.  
          Choose a plan and calculate your exact monthly fee.
        </p>
      </section>

      {/* PRICING CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-16">

        {/* GROUP CLASS */}
        <div
          className="border p-10 rounded-2xl bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
          onClick={() => setClassType("group")}
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">
            Group Class
          </h2>
          <p className="text-center text-gray-500 mt-1">(Up to 4 students)</p>

          <p className="text-center mt-6 text-6xl font-bold">
            £5<span className="text-lg text-gray-500"> / lesson</span>
          </p>

          <ul className="mt-8 space-y-3 text-gray-700">
            <li>✔ Max 4 students per class</li>
            <li>✔ Suitable for beginners</li>
            <li>✔ Weekdays & weekends available</li>
            <li>✔ Billed monthly</li>
          </ul>

          <Button
            className="w-full mt-8 bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            onClick={() => setClassType("group")}
          >
            Use for Calculator
          </Button>
        </div>

        {/* ONE-ON-ONE CLASS */}
        <div
          className="border p-10 rounded-2xl bg-white shadow-sm hover:shadow-lg transition cursor-pointer"
          onClick={() => setClassType("one")}
        >
          <h2 className="text-3xl font-bold text-green-700 text-center">
            One-on-One
          </h2>

          <p className="text-center mt-6 text-6xl font-bold">
            £10<span className="text-lg text-gray-500"> / lesson</span>
          </p>

          <ul className="mt-8 space-y-3 text-gray-700">
            <li>✔ Personalised 1-to-1 learning</li>
            <li>✔ Faster progress</li>
            <li>✔ Flexible time options</li>
            <li>✔ Billed monthly</li>
          </ul>

          <Button
            className="w-full mt-8 bg-green-600 text-white hover:bg-green-700 py-3 text-lg"
            onClick={() => setClassType("one")}
          >
            Use for Calculator
          </Button>
        </div>

      </section>

      {/* CALCULATOR */}
      <section className="max-w-2xl mx-auto mt-28 border p-10 rounded-2xl shadow-sm">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Monthly Fee Calculator
        </h2>

        {/* COURSE */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Select Course</label>
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
          <label className="block mb-2 font-semibold text-gray-700">Class Type</label>
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
        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Days per Week</label>
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

        {/* RESULT */}
        <div className="bg-green-50 border-l-4 border-green-600 p-5 rounded-md mt-8">
          <h3 className="text-xl font-bold text-green-700">Estimated Monthly Fee</h3>
          <p className="mt-2 text-3xl font-bold">£{total}</p>
          <p className="text-gray-600 mt-1">
            Based on £{pricePerLesson} × {days} day(s) × 4 weeks
          </p>
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col md:flex-row gap-4">

  {/* Consultation Button */}
  <Link href="/consultation" className="w-full">
    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg">
      Book Free Consultation
    </Button>
  </Link>

  {/* Enroll Button - goes to payment */}
  <Button
    className="w-full bg-white text-green-700 border border-green-700 hover:bg-green-50 py-4 text-lg"
    onClick={async () => {
      if (!classType || pricePerLesson === 0) {
        alert("Please select Group or One-on-One first.");
        return;
      }

      const payload = {
        full_name: "New Student",     // You can change this to a form input later
        email: "student@example.com", // Will replace this with real email when you add the enrollment form
        phone: "not_provided",
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
    }}
  >
    Enroll Now
  </Button>

</div>



      </section>

    </main>
  );
}
