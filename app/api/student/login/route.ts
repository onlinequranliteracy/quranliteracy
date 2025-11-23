import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

export async function POST(req: Request) {
  const { email, pin } = await req.json();

  const { data: student } = await supabase
    .from("students")
    .select("*")
    .eq("email", email)
    .eq("login_pin", pin)
    .single();

  if (!student) {
    return NextResponse.json({ error: "Invalid email or PIN." });
  }

  return NextResponse.json({ student });
}
