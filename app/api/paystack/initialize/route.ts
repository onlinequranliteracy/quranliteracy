import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { full_name, email, phone, course, class_type, days, amount } = body;

  // Detect if running locally
  const isLocal =
    process.env.NODE_ENV !== "production" ||
    process.env.SITE_URL?.includes("localhost");

  // Dynamically set callback URL
  const callbackUrl = isLocal
    ? "http://localhost:3000/payment/verify"
    : `${process.env.SITE_URL}/payment/verify`;

  // Convert GBP → GHS
  const convertedAmount = amount * 19;

  try {
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: convertedAmount * 100, // Paystack uses pesewas
        currency: "GHS",
        metadata: {
          full_name,
          email,
          phone,
          course,
          class_type,
          days,
        },
        callback_url: callbackUrl,
      }),
    });

    const data = await response.json();
    console.log("PAYSTACK RAW RESPONSE:", data);

    return NextResponse.json(data);
  } catch (err: any) {
    console.error("PAYSTACK INIT ERROR:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
