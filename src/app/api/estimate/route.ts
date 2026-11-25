import { NextResponse } from "next/server";

type Line = { label: string; qty: number; unit: string };

type Payload = {
  name: string;
  contact: string;
  projectType: string;
  items: Line[];
  services: Line[];
  location: string;
  timeline: string;
  min: number;
  max: number;
  website?: string; // honeypot, real users leave this empty
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const cleanLines = (value: unknown): Line[] =>
  Array.isArray(value)
    ? value.slice(0, 30).map((line) => ({
        label: clean(line?.label, 120),
        qty: Number(line?.qty) || 0,
        unit: clean(line?.unit, 20),
      }))
    : [];

const inr = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export async function POST(request: Request) {
  let body: Partial<Payload>;

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
  const contact = clean(body.contact, 120);
  const projectType = clean(body.projectType, 40);
  const location = clean(body.location, 100) || "Not specified";
  const timeline = clean(body.timeline, 60);
  const items = cleanLines(body.items);
  const services = cleanLines(body.services);
  const min = Number(body.min) || 0;
  const max = Number(body.max) || 0;

  if (name.length < 2 || contact.length < 5) {
    return NextResponse.json(
      { error: "Name and contact details are required." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ESTIMATE_TO_EMAIL;
  const from =
    process.env.RESEND_FROM || "VR Interiors <onboarding@resend.dev>";

  if (!apiKey || !to) {
    console.error(
      "Estimate email: missing RESEND_API_KEY or ESTIMATE_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "Email is not configured." },
      { status: 500 },
    );
  }

  const lineText = (lines: Line[]) =>
    lines.length
      ? lines.map((l) => `- ${l.label}: ${l.qty} ${l.unit}`).join("\n")
      : "None selected";

  const lineHtml = (lines: Line[]) =>
    lines.length
      ? `<ul>${lines
          .map(
            (l) =>
              `<li>${escapeHtml(l.label)}: <strong>${l.qty} ${escapeHtml(l.unit)}</strong></li>`,
          )
          .join("")}</ul>`
      : "<p>None selected</p>";

  const text = [
    "New estimate enquiry from the website",
    "",
    `Name: ${name}`,
    `Contact: ${contact}`,
    `Project type: ${projectType}`,
    `Location: ${location}`,
    `Timeline: ${timeline}`,
    "",
    "Items:",
    lineText(items),
    "",
    "Services:",
    lineText(services),
    "",
    `Indicative range: ${inr(min)} to ${inr(max)}`,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;font-size:14px;color:#222">
      <h2>New estimate enquiry</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}<br/>
         <strong>Contact:</strong> ${escapeHtml(contact)}<br/>
         <strong>Project type:</strong> ${escapeHtml(projectType)}<br/>
         <strong>Location:</strong> ${escapeHtml(location)}<br/>
         <strong>Timeline:</strong> ${escapeHtml(timeline)}</p>
      <h3>Items</h3>${lineHtml(items)}
      <h3>Services</h3>${lineHtml(services)}
      <h3>Indicative range</h3>
      <p style="font-size:16px"><strong>${inr(min)}</strong> to <strong>${inr(max)}</strong></p>
    </div>`;

  const looksLikeEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact);

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
        // Lets you hit "Reply" to answer the customer directly.
        ...(looksLikeEmail ? { reply_to: contact } : {}),
        subject: `New estimate enquiry: ${name} (${projectType})`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      console.error(
        "Estimate email failed:",
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
    console.error("Estimate email failed:", error);
    return NextResponse.json(
      { error: "Could not send email." },
      { status: 502 },
    );
  }
}
