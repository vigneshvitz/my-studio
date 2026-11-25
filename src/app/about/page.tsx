import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "VR Interiors designs thoughtful interiors for homes, offices and commercial spaces.",
};

const values = [
  {
    title: "Purpose first",
    text: "Every decision starts with how the space needs to work for your people and customers.",
  },
  {
    title: "Honest communication",
    text: "Clear scope, clear timelines and clear conversations at every stage.",
  },
  {
    title: "Considered detail",
    text: "Materials, lighting and finishes chosen carefully so the whole space feels resolved.",
  },
  {
    title: "Long-term thinking",
    text: "Interiors that stay practical and presentable as your business grows.",
  },
];

const sectors = [
  "Villas and apartments",
  "Offices and workplaces",
  "Commercial fit-outs",
];

export default function AboutPage() {
  return (
    <>
      <Header />

      <main>
        {/* PAGE HERO */}
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">About VR Interiors</span>
            <h1>
              Interiors designed around
              <br />
              <span>how you live and work.</span>
            </h1>
            <p>
              VR Interiors is an interior design company for homes and
              commercial spaces. We create interiors that support the way people
              live and work.
            </p>
          </div>
        </section>

        {/* STORY */}
        <section className="section-padding about-story">
          <div className="container why-grid">
            <div className="why-visual">
              <img
                src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85"
                alt="Thoughtfully planned modern commercial interior"
                loading="lazy"
              />
              <div className="why-caption">
                <span>Our philosophy</span>
                <p>Purpose first. Details always.</p>
              </div>
            </div>

            <div className="why-copy">
              <span className="eyebrow">Who we are</span>
              <h2 className="section-heading">
                A considered approach to every square foot.
              </h2>
              <p className="why-description">
                The best interiors balance how a space looks with how it needs
                to perform. We bring the conversation back to your needs, your
                people and your long-term vision.
              </p>
              <p className="why-description">
                From the first consultation to the finished space, we keep the
                process collaborative and transparent, so you always know where
                your project stands.
              </p>

              <div className="check-list">
                {sectors.map((s) => (
                  <div key={s}>
                    <span className="check-dot" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* VALUES */}
        <section className="intro section-padding">
          <div className="container">
            <div className="section-topline">
              <div>
                <span className="eyebrow">What we value</span>
                <h2 className="section-heading">
                  The principles behind our work.
                </h2>
              </div>
              <p className="section-side-copy">
                These shape how we plan, communicate and deliver every project.
              </p>
            </div>

            <div className="principles principles-flat">
              {values.map((v) => (
                <div className="principle" key={v.title}>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="contact-cta">
          <div className="container contact-cta-inner">
            <div>
              <h2>
                Planning a new space?
                <br />
                <span>Let&apos;s start the conversation.</span>
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
