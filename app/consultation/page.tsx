"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConsultationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="px-6 md:px-16 py-20 text-center">
        <h1 className="text-4xl font-bold text-green-700">
          Thank You!
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          Your consultation request has been received.  
          We will contact you soon via WhatsApp or email.
        </p>

        <a
          href="https://wa.me/447446229840"
          target="_blank"
          className="inline-block mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          Message Us on WhatsApp
        </a>
      </main>
    );
  }

  return (
    <main className="bg-white px-6 md:px-16 py-20 text-gray-900">
      <section className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-green-700 text-center">
          Book a Free Consultation
        </h1>
        <p className="text-center text-gray-600 mt-3">
          Tell us a few details and we will contact you shortly.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-6">

          {/* Name */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              required
              className="w-full border rounded-lg p-3"
              placeholder="Enter your name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full border rounded-lg p-3"
              placeholder="example@email.com"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              WhatsApp Number
            </label>
            <input
              type="tel"
              required
              className="w-full border rounded-lg p-3"
              placeholder="+4474..."
            />
          </div>

          {/* Course */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Course of Interest
            </label>
            <select className="w-full border rounded-lg p-3">
              <option>Qaaidatu Nooraniya</option>
              <option>Tajweed</option>
              <option>Hifz (Memorization)</option>
              <option>Salah Training</option>
              <option>Dua & Adhkar</option>
            </select>
          </div>

          {/* Preferred Time */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Preferred Days / Time
            </label>
            <textarea
              rows={3}
              className="w-full border rounded-lg p-3"
              placeholder="Example: Weekdays • 6pm UK time"
            ></textarea>
          </div>

          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 text-lg"
          >
            Submit
          </Button>

        </form>
      </section>
    </main>
  );
}
