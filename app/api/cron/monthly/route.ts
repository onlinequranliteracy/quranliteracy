import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function GET() {
  const today = new Date().toISOString().split("T")[0];

  const { data: students } = await supabase
    .from("students")
    .select("*")
    .lte("next_billing_date", today)
    .eq("status", "active");

  if (!students || students.length === 0)
    return NextResponse.json({ message: "No billing due today" });

  for (const s of students) {
    await resend.emails.send({
      from: "Quran Literacy Academy <billing@quranliteracy.academy>",
      to: s.email,
      subject: "Monthly Tuition Payment Due",
      html: `
        <p>As-salaam alaikum ${s.full_name},</p>
        <p>Your monthly Qur'an class fee is due.</p>
        <p>Please click below to make your payment:</p>
        <a href="https://quranliteracy.academy/enroll?email=${s.email}">
          Pay Now
        </a>
        <p>JazakAllah Khair.</p>
      `,
    });
  }

  return NextResponse.json({ message: "Invoices sent", count: students.length });
}
