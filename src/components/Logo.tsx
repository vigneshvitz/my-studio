import Link from "next/link";

/* VR monogram: a plan-view room with a door opening (bottom-right),
   the door swing drawn as an arc, and the letters V and R set inside. */
export function LogoMark({ size = 46 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden="true"
    >
      <path d="M44 28V4H4V44H28" strokeWidth="2" />
      <path d="M28 44A16 16 0 0 0 44 28" strokeWidth="1" opacity="0.55" />
      <path d="M9 11L16 31L23 11" strokeWidth="2.4" />
      <path d="M28 31V11H32A5 5 0 0 1 32 21H28M32 21L37 31" strokeWidth="2.4" />
    </svg>
  );
}

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className={`brand${light ? " brand-light" : ""}`}
      aria-label="VR Interiors home"
    >
      <LogoMark />
      <span className="brand-copy">
        <span className="brand-name">VR Interiors</span>
        <span className="brand-tagline">Interior design</span>
      </span>
    </Link>
  );
}
