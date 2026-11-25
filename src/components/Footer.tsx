import Link from "next/link";
import Logo from "./Logo";
import Year from "./Year";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand">
          <Logo light />
          <p>
            Thoughtful commercial interiors for offices, retail, showrooms and
            hospitality spaces.
          </p>
        </div>

        <div className="footer-links">
          <h3>Explore</h3>
          <Link href="/services">Services</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/estimate">Estimate</Link>
          <Link href="/about">About</Link>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>
            No:C12 Ambattur Estate,west Mogappair, chennai-600037
            <br />
            Phone:80122 38604
            <br />
            vrinteriorsvitz@gmail.com
          </p>
          <Link className="footer-contact-link" href="/contact">
            Book a consultation
          </Link>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © <Year /> VR Interiors. All rights reserved.
        </span>
        <span>Instagram </span>
      </div>
    </footer>
  );
}
