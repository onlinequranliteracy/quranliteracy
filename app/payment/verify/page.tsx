"use client";

import { Suspense } from "react";
import VerifyPaymentContent from "./verify-content";

export default function VerifyPage() {
  return (
    <Suspense fallback={<p className="p-20 text-center">Loading payment status...</p>}>
      <VerifyPaymentContent />
    </Suspense>
  );
}
