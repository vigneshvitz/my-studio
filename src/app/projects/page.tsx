import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import ProjectGallery from "../../components/ProjectGallery";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A selection of interior design work by VR Interiors across homes, offices and commercial spaces.",
};

export default function ProjectsPage() {
  return (
    <>
      <Header />

      <main>
        <section className="page-hero">
          <div className="container">
            <span className="eyebrow">Projects</span>
            <h1>
              Our work,
              <br />
              <span>space by space.</span>
            </h1>
            <p>
              A selection of interiors across homes, offices and commercial
              spaces.
            </p>
          </div>
        </section>

        <section className="section-padding projects-section">
          <div className="container">
            {/* Remove this notice once you add your own project photos */}
            <div className="concept-disclaimer projects-note">
              Illustrative imagery. Project photos will be replaced with
              completed VR Interiors work.
            </div>
            <ProjectGallery />
          </div>
        </section>

        <section className="contact-cta">
          <div className="container contact-cta-inner">
            <div>
              <h2>
                Have a project in mind?
                <br />
                <span>Let&apos;s plan it together.</span>
              </h2>
              <p>Tell us about your space and we will take it from there.</p>
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
