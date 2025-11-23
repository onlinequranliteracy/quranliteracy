import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();
  const { student } = body;

  // Convert GBP → GHS
  const amount = student.amount * 19;
  const callbackUrl = `${process.env.SITE_URL}/payment/verify`;

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: student.email,
      amount: amount * 100,
      currency: "GHS",
      metadata: {
        full_name: student.full_name,
        email: student.email,
        phone: student.phone,
        course: student.course,
        class_type: student.class_type,
        days: student.days_per_week,
      },
      callback_url: callbackUrl,
    }),
  });

  const data = await res.json();
  return NextResponse.json(data);
}
