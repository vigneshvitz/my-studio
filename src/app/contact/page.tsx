import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ContactForm from "../../components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Book a consultation with VR Interiors and tell us about your space.",
};

const next = [
  {
    number: "01",
    title: "We review your enquiry",
    text: "We read your details and prepare a few questions about your space.",
  },
  {
    number: "02",
    title: "We get in touch",
    text: "We contact you to discuss your goals, timeline and budget.",
  },
  {
    number: "03",
    title: "We propose next steps",
    text: "You receive a clear outline of how the project could move forward.",
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />

      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Contact</span>
            <h1>
              Tell us about
              <br />
              <span>your space.</span>
            </h1>
            <p>
              Share a few details and we will get back to you to discuss your
              project and arrange a consultation.
            </p>
          </div>
        </section>

        <section className="section-padding contact-section">
          <div className="container contact-grid">
            <div className="form-card">
              <h2>Book a consultation</h2>
              <ContactForm />
            </div>

            <aside className="info-card">
              <h2>Contact details</h2>

              <div className="info-row">
                <span>Address</span>
                <p>Your address</p>
              </div>
              <div className="info-row">
                <span>Phone</span>
                <p>
                  <a href="tel:+910000000000">Your number</a>
                </p>
              </div>
              <div className="info-row">
                <span>Email</span>
                <p>
                  <a href="mailto:vrinteriorsvitz@gmail.com">
                    vrinteriorsvitz@gmail.com
                  </a>
                </p>
              </div>
              <div className="info-row">
                <span>Working hours</span>
                <p>Mon – Sat, 10:00 – 18:00</p>
              </div>
            </aside>
          </div>
        </section>

        <section className="process section-padding">
          <div className="container">
            <div className="process-heading">
              <span className="eyebrow">What happens next</span>
              <h2 className="section-heading">A simple, clear start.</h2>
            </div>

            <div className="process-grid process-grid-3">
              {next.map((s) => (
                <article className="process-card" key={s.number}>
                  <span className="process-number">{s.number}</span>
                  <div className="process-line" />
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
