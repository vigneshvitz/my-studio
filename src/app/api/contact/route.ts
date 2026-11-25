import { NextResponse } from "next/server";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Bots fill hidden fields. Pretend success and send nothing.
  if (body.website) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const phone = clean(body.phone, 30) || "Not given";
  const email = clean(body.email, 120);
  const type = clean(body.type, 40);
  const budget = clean(body.budget, 40);
  const message = clean(body.message, 3000);

  if (
    name.length < 2 ||
    message.length < 2 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  ) {
    return NextResponse.json(
      { error: "Please fill in your name, a valid email and a message." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_TO_EMAIL;
  const from =
    process.env.RESEND_FROM || "VR Interiors <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Contact email: missing RESEND_API_KEY or ESTIMATE_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  const text = [
    "New consultation enquiry from the website",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone}`,
    `Space type: ${type}`,
    `Budget: ${budget}`,
    "",
    message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#222">
      <h2>New consultation enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
         <strong>Email:</strong> ${escapeHtml(email)}<br/>
         <strong>Phone:</strong> ${escapeHtml(phone)}<br/>
         <strong>Space type:</strong> ${escapeHtml(type)}<br/>
         <strong>Budget:</strong> ${escapeHtml(budget)}</p>
      <h3>About the project</h3>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email, // Reply goes straight to the customer
        subject: `Consultation enquiry from ${name}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        "Contact email failed:",
        response.status,
        await response.text(),
      );
      return NextResponse.json(
        { error: "Could not send email." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact email failed:", error);
    return NextResponse.json(
      { error: "Could not send email." },
      { status: 502 },
    );
  }
}
