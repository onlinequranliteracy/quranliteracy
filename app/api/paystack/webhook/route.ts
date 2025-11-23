import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!
);

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  const rawBody = await req.text();
  const signature = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(rawBody)
    .digest("hex");

  if (signature !== req.headers.get("x-paystack-signature")) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const event = JSON.parse(rawBody);

  if (event.event === "charge.success") {
    const data = event.data;
    const md = data.metadata;

    const pin = Math.floor(100000 + Math.random() * 900000).toString();

    // save student
    const { data: student } = await supabase
      .from("students")
      .insert({
        full_name: md.full_name,
        email: md.email,
        phone: md.phone,
        course: md.course,
        class_type: md.class_type,
        days_per_week: md.days,
        amount: data.amount / 100,
        payment_reference: data.reference,
        next_billing_date: new Date(Date.now() + 30 * 86400 * 1000).toISOString(),
        status: "active",
        login_pin: pin,
      })
      .select()
      .single();

    // save payment record
    await supabase.from("payments").insert({
      student_id: student?.id,
      amount: data.amount / 100,
      currency: data.currency,
      reference: data.reference,
      status: "success",
    });

    // send confirmation email
    await resend.emails.send({
      from: "Quran Literacy <support@quranliteracy.academy>",
      to: md.email,
      subject: "Your Enrollment is Confirmed!",
      html: `
        <h2>Assalamu Alaikum ${md.full_name},</h2>
        <p>Thank you for enrolling in Quran Literacy Academy!</p>
        <p>Your next monthly payment will be due in 30 days.</p>
        <p>We will contact you soon to set your lesson schedule.</p>
      `,
    });

    // ⭐ send PIN email separately
    await resend.emails.send({
      from: "Quran Literacy <support@quranliteracy.academy>",
      to: md.email,
      subject: "Your Student Login PIN",
      html: `
        <h2>Assalamu Alaikum ${md.full_name},</h2>
        <p>Your Quran Literacy student portal PIN is:</p>
        <h1 style="font-size: 32px; color: green;">${pin}</h1>
        <p>Please keep this safe. You will use this PIN to log in to your student dashboard.</p>

        <br />
        <p>Student Login Page:</p>
        <a href="https://quranliteracy.academy/student" 
           style="color: green; font-weight: bold;">
          https://quranliteracy.academy/student
        </a>

        <br /><br />
        <p>If you need any help, reply to this email.</p>
        <p>JazakAllahu Khairan,<br/>Quran Literacy Academy</p>
      `,
    });
  }

  return NextResponse.json({ status: "ok" });
}
