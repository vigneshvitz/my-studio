"use client";

import { useState } from "react";

// Shown only if sending fails.
const EMAIL = "vrinteriorsvitz@gmail.com";

type Status = "idle" | "sending" | "sent" | "failed";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const d = new FormData(form);
    const get = (k: string) => String(d.get(k) ?? "").trim();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: get("name"),
          phone: get("phone"),
          email: get("email"),
          type: get("type"),
          budget: get("budget"),
          message: get("message"),
          website: get("website"), // honeypot
        }),
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      setStatus("sent");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="field-row">
        <div className="field">
          <label htmlFor="type">Type of space</label>
          <select id="type" name="type" defaultValue="Home">
            <option value="Home">Home / apartment</option>
            <option value="Office">Office</option>
            <option value="Commercial space">Commercial space</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="budget">Approximate budget</label>
          <select id="budget" name="budget" defaultValue="Not sure yet">
            <option>Not sure yet</option>
            <option>Under ₹5 lakh</option>
            <option>₹5 – 10 lakh</option>
            <option>₹10 – 25 lakh</option>
            <option>₹25 – 50 lakh</option>
            <option>₹50 lakh and above</option>
          </select>
        </div>
      </div>

      <div className="field">
        <label htmlFor="message">About your project</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          placeholder="Location, size of the space, timeline and what you would like to achieve."
        />
      </div>

      {/* Honeypot: hidden from people, filled in by bots. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        className="button button-dark"
        type="submit"
        disabled={status === "sending"}
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>

      {status === "sent" && (
        <p className="form-note" role="status">
          Thank you. Your enquiry has been sent and we will get back to you
          soon.
        </p>
      )}

      {status === "failed" && (
        <p className="form-note" role="alert">
          Sorry, we could not send your enquiry. Please try again, or email us
          at {EMAIL}.
        </p>
      )}
    </form>
  );
}
