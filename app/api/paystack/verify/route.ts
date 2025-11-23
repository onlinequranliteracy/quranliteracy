import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json({ status: "error", message: "No reference provided" });
  }

  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const data = await res.json();

    if (data.data?.status === "success") {
      return NextResponse.json({ status: "success" });
    } else {
      return NextResponse.json({ status: "failed", message: data.data?.gateway_response });
    }
  } catch (err: any) {
    return NextResponse.json({ status: "error", message: err.message });
  }
}
