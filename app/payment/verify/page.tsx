"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyPayment() {
  const params = useSearchParams();
  const reference = params.get("reference");
  const [status, setStatus] = useState("Verifying payment...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reference) return;

    async function verify() {
      try {
        // Call your own API route to verify the transaction securely
        const res = await fetch(`/api/paystack/verify?reference=${reference}`);
        const data = await res.json();

        if (data.status === "success") {
          setStatus("Payment Successful! Your enrollment is confirmed.");
        } else {
          setStatus("Payment failed or could not be verified.");
        }
      } catch (err) {
        setStatus("An error occurred during verification.");
      } finally {
        setLoading(false);
      }
    }

    verify();
  }, [reference]);

  return (
    <main className="p-20 text-center text-gray-900">
      <h1 className="text-3xl font-bold text-green-700 mb-6">{status}</h1>

      {loading && (
        <p className="text-gray-600">Please wait...</p>
      )}

      {!loading && (
        <>
          <a
            href="https://wa.me/447446229840"
            className="mt-6 inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Contact Us on WhatsApp
          </a>

          <div className="mt-6">
            <a href="/" className="text-green-700 hover:underline">
              Return to Home
            </a>
          </div>
        </>
      )}
    </main>
  );
}
