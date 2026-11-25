import Header from "../components/Header";
import Footer from "../components/Footer";

const services = [
  {
    title: "Office interiors",
    tag: "Workplaces",
    description:
      "Workplaces planned around how your team actually works, from open areas to meeting rooms and quiet zones.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
    alt: "Contemporary office workspace with natural light",
  },
  {
    title: "Home interiors",
    tag: "Homes",
    description:
      "Living rooms, bedrooms, kitchens and more, designed to feel comfortable, personal and made for everyday life.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
    alt: "Elegant modern living room interior",
  },
  {
    title: "Commercial fit-outs",
    tag: "Fit-outs",
    description:
      "Space planning, finishes, furniture and services coordinated into one clear scope.",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
    alt: "Modern commercial workspace with desks and meeting areas",
  },
];

const concepts = [
  {
    title: "The contemporary workplace",
    type: "Office concept",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "The calm, modern home",
    type: "Home concept",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "The bright living space",
    type: "Home concept",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85",
  },
];

const principles = [
  {
    title: "Purpose-led planning",
    text: "Layouts developed around how you use the space, not just appearance.",
  },
  {
    title: "Considered materials",
    text: "Finishes chosen to suit the design, the brief and the budget.",
  },
  {
    title: "Clear communication",
    text: "A collaborative process with agreed scope and expectations.",
  },
  {
    title: "Attention to detail",
    text: "The small decisions that make a finished space feel complete.",
  },
];

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "We learn about you, your space, requirements, priorities and budget.",
  },
  {
    number: "02",
    title: "Plan and design",
    description:
      "We develop the design direction, space plan, material palette and proposal.",
  },
  {
    number: "03",
    title: "Refine and execute",
    description:
      "Once approved, the project moves into the agreed implementation phase.",
  },
  {
    number: "04",
    title: "Complete",
    description:
      "We coordinate the final details and review the finished scope with you.",
  },
];

const faqs = [
  {
    q: "How does a project start?",
    a: "Book a consultation. We discuss your space, goals, timeline and budget, then outline the next steps.",
  },
  {
    q: "Can I get an idea of cost early on?",
    a: "Yes. Our estimate page gives you an initial range, which we refine once we understand the scope.",
  },
  {
    q: "What types of spaces do you design?",
    a: "Homes, offices and other commercial spaces.",
  },
  {
    q: "Do you manage the work on site?",
    a: "We coordinate the agreed implementation phase and review the completed scope with you. Details are confirmed in your proposal.",
  },
];

export default function Home() {
  return (
    <>
      <Header />

      <main>
        {/* HERO */}
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Interior design</span>

              <h1>
                Spaces that work.
                <br />
                <span>Experiences that last.</span>
              </h1>

              <p className="hero-description">
                We design homes and commercial spaces that reflect who you are,
                make better use of space and improve everyday life.
              </p>

              <div className="hero-actions">
                <a className="button button-dark" href="/contact">
                  Book a consultation
                </a>
                <a className="button button-outline" href="/estimate">
                  Get an estimate
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <img
                className="hero-image"
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=90"
                alt="Warm contemporary commercial workspace"
                fetchPriority="high"
              />
              <div className="hero-image-label">
                <span className="label-dot" />
                <span>Designing for the way you work</span>
              </div>
            </div>
          </div>

          <div
            className="container sector-strip"
            aria-label="Sectors we design for"
          >
            <span>Homes</span>
            <span>Offices</span>
            <span>Commercial spaces</span>
          </div>
        </section>

        {/* APPROACH */}
        <section className="intro section-padding">
          <div className="container">
            <div className="intro-grid">
              <div>
                <span className="eyebrow">Our approach</span>
                <h2 className="section-heading">
                  Good design is more than what you see.
                </h2>
              </div>

              <div className="intro-copy">
                <p>
                  A well-designed space supports the people who use it, feels
                  right to be in and reflects who you are.
                </p>
                <p>
                  At VR Interiors, we approach every space with curiosity,
                  careful planning and an eye for the details that matter.
                </p>
                <a className="text-link" href="/about">
                  About VR Interiors
                </a>
              </div>
            </div>

            <div className="principles">
              {principles.map((p) => (
                <div className="principle" key={p.title}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="services section-padding" id="services">
          <div className="container">
            <div className="section-topline">
              <div>
                <span className="eyebrow">Services</span>
                <h2 className="section-heading">
                  Designed around how you live and work.
                </h2>
              </div>
              <p className="section-side-copy">
                Every space has a different purpose. Our work starts with
                understanding yours.
              </p>
            </div>

            <div className="service-grid service-grid-3">
              {services.map((s) => (
                <article className="service-card" key={s.title}>
                  <div className="service-image-wrap">
                    <img src={s.image} alt={s.alt} loading="lazy" />
                    <span className="service-tag">{s.tag}</span>
                  </div>
                  <div className="service-card-content">
                    <h3>{s.title}</h3>
                    <p>{s.description}</p>
                    <a className="card-link" href="/contact">
                      Discuss this service
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* INSPIRATION */}
        <section className="inspiration section-padding" id="inspiration">
          <div className="container">
            <div className="section-topline inspiration-heading">
              <div>
                <span className="eyebrow">Design inspiration</span>
                <h2 className="section-heading">
                  Ideas that shape better spaces.
                </h2>
              </div>
              <p className="section-side-copy">
                Visual directions for homes, workspaces and commercial spaces.
              </p>
            </div>

            <div className="concept-disclaimer">
              Illustrative imagery. These are not completed VR Interiors
              projects.
            </div>

            <div className="concept-grid">
              {concepts.map((c, i) => (
                <article className="concept-card" key={c.title}>
                  <div className="concept-image-wrap">
                    <img src={c.image} alt={c.title} loading="lazy" />
                  </div>
                  <div className="concept-meta">{c.type}</div>
                  <h3>{c.title}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section className="process section-padding" id="approach">
          <div className="container">
            <div className="process-heading">
              <span className="eyebrow">How we work</span>
              <h2 className="section-heading">
                A clear path from idea to space.
              </h2>
              <p>
                A collaborative process that keeps decisions clear and your
                project moving in the right direction.
              </p>
            </div>

            <div className="process-grid">
              {steps.map((s) => (
                <article className="process-card" key={s.number}>
                  <span className="process-number">{s.number}</span>
                  <div className="process-line" />
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="faq section-padding">
          <div className="container faq-grid">
            <div>
              <span className="eyebrow">Questions</span>
              <h2 className="section-heading">Before you get in touch.</h2>
            </div>
            <div className="faq-list">
              {faqs.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="contact-cta">
          <div className="container contact-cta-inner">
            <div>
              <h2>
                Have a space in mind?
                <br />
                <span>Let&apos;s talk about it.</span>
              </h2>
              <p>Tell us about your space and what you would like to create.</p>
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
