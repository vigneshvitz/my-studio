import Link from "next/link";
import Logo from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/estimate", label: "Estimate" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Logo />

        <nav className="desktop-nav" aria-label="Primary">
          {links.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>

        <Link className="header-cta" href="/contact">
          Book a consultation
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Open menu">
            <span className="burger" />
          </summary>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
            <Link className="mobile-cta" href="/contact">
              Book a consultation
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
