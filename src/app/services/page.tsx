import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Home interiors, office interiors and commercial fit-outs by VR Interiors.",
};

const services = [
  {
    id: "homes",
    tag: "Homes",
    title: "Home interiors",
    text: "Interiors for apartments and houses, designed around the way you live. Comfortable, personal and made to last.",
    points: [
      "Living rooms and bedrooms",
      "Kitchens and wardrobes",
      "Lighting, furniture and decor planning",
      "Material and colour selection",
    ],
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    alt: "Elegant modern living room interior",
  },
  {
    id: "offices",
    tag: "Workplaces",
    title: "Office interiors",
    text: "Workplaces planned around how your team actually works, balancing collaboration, focus and comfort while reflecting your company's identity.",
    points: [
      "Space planning and layout",
      "Workstations, meeting rooms and breakout areas",
      "Lighting, acoustics and material selection",
      "Furniture planning",
    ],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary office workspace with natural light",
  },
  {
    id: "fit-outs",
    tag: "Fit-outs",
    title: "Commercial fit-outs",
    text: "Interior planning, finishes, furniture and services brought together into one clear and coordinated scope.",
    points: [
      "Detailed design and material palette",
      "Scope and specification coordination",
      "Joinery, ceiling and flooring planning",
      "Review of the completed scope",
    ],
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern commercial workspace with desks and meeting areas",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    text: "We learn about your business, space and priorities.",
  },
  {
    number: "02",
    title: "Plan and design",
    text: "We develop the layout, direction and material palette.",
  },
  {
    number: "03",
    title: "Refine and execute",
    text: "Once approved, the project moves into implementation.",
  },
  {
    number: "04",
    title: "Complete",
    text: "We review the finished scope together with you.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <Header />

      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Services</span>
            <h1>
              Interior design for
              <br />
              <span>every kind of space.</span>
            </h1>
            <p>
              From homes to offices, we plan and design interiors that work as
              well as they look.
            </p>
          </div>
        </section>

        {services.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            className={`section-padding service-detail ${
              i % 2 === 0 ? "" : "service-detail-alt"
            }`}
          >
            <div
              className={`container why-grid ${i % 2 === 1 ? "reverse" : ""}`}
            >
              <div className="why-visual service-visual">
                <img src={s.image} alt={s.alt} loading="lazy" />
              </div>

              <div className="why-copy">
                <span className="eyebrow">{s.tag}</span>
                <h2 className="section-heading">{s.title}</h2>
                <p className="why-description">{s.text}</p>

                <div className="check-list">
                  {s.points.map((p) => (
                    <div key={p}>
                      <span className="check-dot" />
                      {p}
                    </div>
                  ))}
                </div>

                <a className="text-link service-link" href="/contact">
                  Discuss this service
                </a>
              </div>
            </div>
          </section>
        ))}

        <section className="process section-padding">
          <div className="container">
            <div className="process-heading">
              <span className="eyebrow">How we work</span>
              <h2 className="section-heading">
                The same clear process, every time.
              </h2>
            </div>
            <div className="process-grid">
              {steps.map((s) => (
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

        <section className="contact-cta">
          <div className="container contact-cta-inner">
            <div>
              <h2>
                Not sure which service you need?
                <br />
                <span>We&apos;ll help you decide.</span>
              </h2>
              <p>
                Tell us about your space and we will suggest the right approach.
              </p>
            </div>
            <a className="button button-light" href="/contact">
              Book a consultation
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
