import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const authHeader = req.headers.get("x-admin-key");

  if (authHeader !== process.env.NEXT_PUBLIC_ADMIN_PASSWORD?.trim()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE!
  );

  const { data } = await supabase.from("students").select("*");
  return NextResponse.json({ data });
}
