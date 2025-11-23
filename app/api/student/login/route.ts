import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(req: Request) {
  const { email, pin } = await req.json();

  const cleanEmail = email.trim().toLowerCase();
  const cleanPin = pin.trim();

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .ilike("email", cleanEmail) // <-- IGNORE CASE
    .eq("login_pin", cleanPin)
    .single();

  if (!student) {
    return NextResponse.json({ success: false, error: "Invalid email or PIN." });
  }

  return NextResponse.json({ success: true, student });
}
