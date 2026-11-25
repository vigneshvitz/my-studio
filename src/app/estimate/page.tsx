"use client";

import { useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

type ProjectType = "home" | "office" | "commercial";
type FinishLevel = "essential" | "refined" | "luxury";
type Unit = "sq. ft." | "nos" | "seats" | "r. ft.";
type SendStatus = "idle" | "sending" | "sent" | "failed";

type Option = {
  value: string;
  label: string;
  description: string;
  unit: Unit;
  min: number; // ₹ per unit
  max: number; // ₹ per unit
  defaultQty: number;
};

const projectTypes: {
  value: ProjectType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "home",
    label: "Home",
    description: "Apartments & houses",
    icon: "01",
  },
  {
    value: "office",
    label: "Office",
    description: "Workspaces & meeting rooms",
    icon: "02",
  },
  {
    value: "commercial",
    label: "Commercial",
    description: "Fit-outs & other business spaces",
    icon: "03",
  },
];

const finishLevels: {
  value: FinishLevel;
  label: string;
  description: string;
  multiplier: number;
}[] = [
  {
    value: "essential",
    label: "Essential",
    description: "Practical finishes and functional planning",
    multiplier: 0.8,
  },
  {
    value: "refined",
    label: "Refined",
    description: "Balanced materials, lighting and detailing",
    multiplier: 1,
  },
  {
    value: "luxury",
    label: "Luxury",
    description: "Premium materials and bespoke detailing",
    multiplier: 1.4,
  },
];

// Illustrative planning rates only. Replace these with your actual rates.
// STEP 2: items depend on the project type (quantity × rate per unit).
const itemsByProject: Record<ProjectType, Option[]> = {
  home: [
    {
      value: "wardrobe",
      label: "Wardrobe",
      description: "Full-height wardrobe with shutters",
      unit: "sq. ft.",
      min: 1200,
      max: 1800,
      defaultQty: 40,
    },
    {
      value: "tvunit",
      label: "TV unit with paneling",
      description: "Wall paneling, storage and display",
      unit: "sq. ft.",
      min: 1300,
      max: 2000,
      defaultQty: 30,
    },
    {
      value: "kitchen",
      label: "Modular kitchen",
      description: "Base and wall units with finish",
      unit: "sq. ft.",
      min: 1500,
      max: 2400,
      defaultQty: 60,
    },
    {
      value: "pooja",
      label: "Pooja unit",
      description: "Wall-mounted or standing unit",
      unit: "nos",
      min: 25000,
      max: 60000,
      defaultQty: 1,
    },
    {
      value: "loft",
      label: "Loft frame & shutter",
      description: "Overhead storage with shutters",
      unit: "sq. ft.",
      min: 800,
      max: 1200,
      defaultQty: 20,
    },
  ],
  office: [
    {
      value: "workstations",
      label: "Workstations",
      description: "Desks, partitions and storage per seat",
      unit: "seats",
      min: 12000,
      max: 22000,
      defaultQty: 10,
    },
    {
      value: "cabins",
      label: "Manager / founder cabin",
      description: "Enclosed cabin with desk and storage",
      unit: "nos",
      min: 120000,
      max: 220000,
      defaultQty: 1,
    },
    {
      value: "meeting",
      label: "Meeting / conference room",
      description: "Table, seating, glass partition, AV points",
      unit: "nos",
      min: 200000,
      max: 400000,
      defaultQty: 1,
    },
    {
      value: "reception",
      label: "Reception & waiting area",
      description: "Reception desk, backdrop and seating",
      unit: "nos",
      min: 150000,
      max: 350000,
      defaultQty: 1,
    },
    {
      value: "pantry",
      label: "Pantry / breakout area",
      description: "Counter, storage and casual seating",
      unit: "nos",
      min: 80000,
      max: 180000,
      defaultQty: 1,
    },
    {
      value: "glass",
      label: "Glass partitions",
      description: "Fixed or sliding glass partitions",
      unit: "sq. ft.",
      min: 700,
      max: 1200,
      defaultQty: 100,
    },
    {
      value: "storage",
      label: "Storage & file units",
      description: "Wall-mounted or floor storage",
      unit: "r. ft.",
      min: 3000,
      max: 5500,
      defaultQty: 10,
    },
  ],
  commercial: [
    {
      value: "counter",
      label: "Reception / billing counter",
      description: "Custom counter with finish and storage",
      unit: "nos",
      min: 80000,
      max: 200000,
      defaultQty: 1,
    },
    {
      value: "display",
      label: "Display units & shelving",
      description: "Product display and wall shelving",
      unit: "sq. ft.",
      min: 1200,
      max: 2200,
      defaultQty: 100,
    },
    {
      value: "feature",
      label: "Feature wall / brand backdrop",
      description: "Paneling, logo and accent lighting",
      unit: "sq. ft.",
      min: 1000,
      max: 1800,
      defaultQty: 50,
    },
    {
      value: "seating",
      label: "Customer seating area",
      description: "Built-in or loose seating zone",
      unit: "nos",
      min: 60000,
      max: 150000,
      defaultQty: 1,
    },
    {
      value: "cabin",
      label: "Back office / manager cabin",
      description: "Enclosed cabin with desk and storage",
      unit: "nos",
      min: 100000,
      max: 200000,
      defaultQty: 1,
    },
    {
      value: "storeroom",
      label: "Storage / stock room",
      description: "Racks, shelving and partitions",
      unit: "sq. ft.",
      min: 500,
      max: 900,
      defaultQty: 100,
    },
    {
      value: "signage",
      label: "Signage & branding",
      description: "Fascia, interior signage and graphics",
      unit: "nos",
      min: 50000,
      max: 150000,
      defaultQty: 1,
    },
  ],
};

// STEP 3: services. Each one has its own sq. ft. entry (₹ per sq. ft.).
const serviceOptions: Option[] = [
  {
    value: "design",
    label: "Interior design & space planning",
    description: "Layouts, design direction and material selection",
    unit: "sq. ft.",
    min: 100,
    max: 200,
    defaultQty: 100,
  },
  {
    value: "fitout",
    label: "Civil work & interior fit-out",
    description: "Finishes, partitions and agreed installation work",
    unit: "sq. ft.",
    min: 600,
    max: 1000,
    defaultQty: 100,
  },
  {
    value: "furniture",
    label: "Furniture & storage",
    description: "Workstations, seating and built-in storage",
    unit: "sq. ft.",
    min: 300,
    max: 500,
    defaultQty: 100,
  },
  {
    value: "lighting",
    label: "Lighting & electrical",
    description: "Lighting fixtures and agreed electrical scope",
    unit: "sq. ft.",
    min: 150,
    max: 250,
    defaultQty: 100,
  },
  {
    value: "ceiling",
    label: "False ceiling work",
    description: "Gypsum or POP ceilings with cove detailing",
    unit: "sq. ft.",
    min: 120,
    max: 200,
    defaultQty: 100,
  },
  {
    value: "wallpaper",
    label: "Wallpapers",
    description: "Feature walls and full-room wallpaper",
    unit: "sq. ft.",
    min: 60,
    max: 120,
    defaultQty: 100,
  },
  {
    value: "curtains",
    label: "Curtains",
    description: "Curtains, blinds and tracks",
    unit: "sq. ft.",
    min: 80,
    max: 150,
    defaultQty: 100,
  },
  {
    value: "painting",
    label: "Painting & texture",
    description: "Interior paint and texture finishes",
    unit: "sq. ft.",
    min: 70,
    max: 140,
    defaultQty: 100,
  },
];

const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

// Sums quantity × rate for every selected option in a quantity map.
const sumSelected = (options: Option[], qty: Record<string, number>) =>
  options
    .filter((option) => option.value in qty)
    .reduce(
      (sum, option) => ({
        min: sum.min + qty[option.value] * option.min,
        max: sum.max + qty[option.value] * option.max,
      }),
      { min: 0, max: 0 },
    );

const toLines = (options: Option[], qty: Record<string, number>) =>
  options
    .filter((option) => option.value in qty)
    .map((option) => ({
      label: option.label,
      qty: qty[option.value],
      unit: option.unit,
    }));

const describeSelected = (options: Option[], qty: Record<string, number>) =>
  toLines(options, qty)
    .map((line) => `${line.label} (${line.qty} ${line.unit})`)
    .join(", ") || "To be discussed";

// Accepts an email address or an Indian mobile number (10 digits, optional +91).
const isValidContact = (value: string) => {
  const trimmed = value.trim();
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return true;
  const digits = trimmed.replace(/[\s-]/g, "");
  return /^(\+91|91|0)?[6-9]\d{9}$/.test(digits);
};

export default function EstimatePage() {
  const [projectType, setProjectType] = useState<ProjectType>("home");
  // Finish step is hidden for now, so this stays "refined" (multiplier 1).
  const [finish, setFinish] = useState<FinishLevel>("refined");
  // key present = selected, value = quantity entered by the visitor
  const [itemQty, setItemQty] = useState<Record<string, number>>({});
  const [serviceQty, setServiceQty] = useState<Record<string, number>>({});
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [location, setLocation] = useState("");
  const [timeline, setTimeline] = useState("1-3 months");
  const [showEstimate, setShowEstimate] = useState(false);
  const [sendStatus, setSendStatus] = useState<SendStatus>("idle");
  const [formError, setFormError] = useState("");

  const finishMultiplier =
    finishLevels.find((item) => item.value === finish)?.multiplier ?? 1;

  const currentItems = itemsByProject[projectType];

  const estimate = useMemo(() => {
    const items = sumSelected(currentItems, itemQty);
    const services = sumSelected(serviceOptions, serviceQty);

    return {
      min: (items.min + services.min) * finishMultiplier,
      max: (items.max + services.max) * finishMultiplier,
    };
  }, [currentItems, itemQty, serviceQty, finishMultiplier]);

  const hasSelection = estimate.max > 0;
  const isSending = sendStatus === "sending";

  const resetResult = () => {
    setShowEstimate(false);
    setSendStatus("idle");
    setFormError("");
  };

  const toggleOption = (
    option: Option,
    setter: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  ) => {
    setter((current) => {
      const next = { ...current };
      if (option.value in next) {
        delete next[option.value];
      } else {
        next[option.value] = option.defaultQty;
      }
      return next;
    });
    resetResult();
  };

  const changeQty = (
    value: string,
    qty: number,
    setter: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  ) => {
    setter((current) => ({
      ...current,
      [value]: Math.max(0, qty || 0),
    }));
    resetResult();
  };

  const projectLabel =
    projectTypes.find((item) => item.value === projectType)?.label ?? "Home";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!hasSelection || isSending) return;

    const trimmedName = name.trim();
    const trimmedContact = contact.trim();

    if (trimmedName.length < 2) {
      setFormError("Please enter your name.");
      return;
    }

    if (!isValidContact(trimmedContact)) {
      setFormError("Please enter a valid mobile number or email address.");
      return;
    }

    setFormError("");
    setSendStatus("sending");
    // Show the estimate straight away; the email is sent in the background.
    setShowEstimate(true);

    try {
      const response = await fetch("/api/estimate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          projectType: projectLabel,
          items: toLines(currentItems, itemQty),
          services: toLines(serviceOptions, serviceQty),
          location: location.trim(),
          timeline,
          min: Math.round(estimate.min),
          max: Math.round(estimate.max),
          website: honeypot,
        }),
      });

      if (!response.ok) throw new Error("Request failed");
      setSendStatus("sent");
    } catch {
      setSendStatus("failed");
    }
  };

  const step2Title =
    projectType === "home"
      ? "Which areas would you like designed?"
      : projectType === "office"
        ? "What does your office need?"
        : "What does your business space need?";

  // One row: checkbox + details + quantity box once selected.
  const renderOption = (
    option: Option,
    qty: Record<string, number>,
    setter: React.Dispatch<React.SetStateAction<Record<string, number>>>,
  ) => {
    const checked = option.value in qty;

    return (
      <div
        key={option.value}
        className={`estimate-service-option ${checked ? "is-checked" : ""}`}
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flex: "1 1 260px",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => toggleOption(option, setter)}
          />
          <span className="custom-checkbox">{checked ? "✓" : ""}</span>
          <span className="estimate-service-copy">
            <strong>{option.label}</strong>
            <span>
              {option.description} · {formatINR(option.min)}–
              {formatINR(option.max)} / {option.unit}
            </span>
          </span>
        </label>

        {checked && (
          <div className="area-input-wrap" style={{ maxWidth: 180 }}>
            <input
              type="number"
              min="0"
              step="1"
              value={qty[option.value]}
              onChange={(event) =>
                changeQty(option.value, Number(event.target.value), setter)
              }
              aria-label={`${option.label} quantity`}
            />
            <span>{option.unit}</span>
          </div>
        )}
      </div>
    );
  };

  const enquiryMessage = [
    `Hello VR Interiors, I would like to discuss a ${projectLabel.toLowerCase()} interior project.`,
    "",
    `Name: ${name.trim() || "Not specified"}`,
    `Contact: ${contact.trim() || "Not specified"}`,
    `Project type: ${projectLabel}`,
    `Items: ${describeSelected(currentItems, itemQty)}`,
    `Services: ${describeSelected(serviceOptions, serviceQty)}`,
    `Location: ${location || "Not specified"}`,
    `Preferred timeline: ${timeline}`,
    `Indicative planning range: ${formatINR(estimate.min)} - ${formatINR(estimate.max)}`,
    "",
    "Please contact me to discuss the project scope and quotation.",
  ].join("\n");

  return (
    <>
      <Header />

      <main className="estimate-page">
        {/* HERO */}
        <section className="estimate-hero">
          <div className="container estimate-hero-grid">
            <div className="estimate-hero-copy">
              <span className="eyebrow">YOUR PROJECT STARTS HERE</span>

              <h1>
                Great spaces begin
                <br />
                with <span>a clear plan.</span>
              </h1>

              <p>
                Tell us a little about your space. Explore an initial budget
                range and discover the right starting point for your project.
              </p>

              <div className="estimate-hero-points">
                <span>
                  <b>01</b> Define your space
                </span>
                <span>
                  <b>02</b> Choose your scope
                </span>
                <span>
                  <b>03</b> Explore your budget
                </span>
              </div>
            </div>

            <div className="estimate-hero-image">
              <img
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85"
                alt="Warm contemporary commercial office interior"
                fetchPriority="high"
              />

              <div className="estimate-image-caption">
                <span className="estimate-caption-mark">VR.</span>
                <div>
                  <strong>Designed around your vision.</strong>
                  <span>Interiors, thoughtfully planned.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ESTIMATOR */}
        <section className="estimate-workspace section-padding">
          <div className="container">
            <div className="estimate-intro">
              <span className="eyebrow">PROJECT ESTIMATOR</span>
              <h2 className="section-heading">
                Let&apos;s shape your estimate.
              </h2>
              <p>
                Select what you need and enter the quantity for each. Your
                planning range updates from your own numbers.
              </p>
            </div>

            <div className="estimate-layout">
              <form className="estimate-form" onSubmit={handleSubmit}>
                {/* STEP 1 — PROJECT TYPE */}
                <div className="estimate-step">
                  <div className="estimate-step-heading">
                    <span className="estimate-step-number">01</span>
                    <div>
                      <h3>What kind of space are you creating?</h3>
                      <p>Choose the option that best describes your project.</p>
                    </div>
                  </div>

                  <div className="project-type-grid">
                    {projectTypes.map((project) => (
                      <button
                        type="button"
                        key={project.value}
                        className={`project-type-card ${
                          projectType === project.value ? "is-selected" : ""
                        }`}
                        onClick={() => {
                          setProjectType(project.value);
                          setItemQty({});
                          resetResult();
                        }}
                        aria-pressed={projectType === project.value}
                      >
                        <span className="project-type-number">
                          {project.icon}
                        </span>
                        <strong>{project.label}</strong>
                        <span className="project-type-description">
                          {project.description}
                        </span>
                        <span className="project-type-check">
                          {projectType === project.value ? "✓" : "+"}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* STEP 2 — ITEMS (change with project type) */}
                <div className="estimate-step">
                  <div className="estimate-step-heading">
                    <span className="estimate-step-number">02</span>
                    <div>
                      <h3>{step2Title}</h3>
                      <p>Select items and enter the quantity for each.</p>
                    </div>
                  </div>

                  <div className="estimate-services-list">
                    {currentItems.map((item) =>
                      renderOption(item, itemQty, setItemQty),
                    )}
                  </div>
                </div>

                {/* FINISH STEP (hidden for now)
                <div className="estimate-step">
                  <div className="estimate-step-heading">
                    <span className="estimate-step-number">--</span>
                    <div>
                      <h3>Choose your finish preference.</h3>
                      <p>
                        Your material and detailing choices influence the
                        budget.
                      </p>
                    </div>
                  </div>

                  <div className="finish-grid">
                    {finishLevels.map((level) => (
                      <button
                        type="button"
                        key={level.value}
                        className={`finish-card ${
                          finish === level.value ? "is-selected" : ""
                        }`}
                        onClick={() => {
                          setFinish(level.value);
                          resetResult();
                        }}
                        aria-pressed={finish === level.value}
                      >
                        <span
                          className={`finish-swatch swatch-${level.value}`}
                        />
                        <strong>{level.label}</strong>
                        <span>{level.description}</span>
                        <span className="finish-radio">
                          {finish === level.value ? "✓" : ""}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                */}

                {/* STEP 3 — SERVICES, EACH WITH ITS OWN SQ. FT. */}
                <div className="estimate-step">
                  <div className="estimate-step-heading">
                    <span className="estimate-step-number">03</span>
                    <div>
                      <h3>What would you like us to include?</h3>
                      <p>
                        Select the services you need and enter the area in sq.
                        ft. for each.
                      </p>
                    </div>
                  </div>

                  <div className="estimate-services-list">
                    {serviceOptions.map((service) =>
                      renderOption(service, serviceQty, setServiceQty),
                    )}
                  </div>
                </div>

                {/* STEP 4 — YOUR DETAILS */}
                <div className="estimate-step">
                  <div className="estimate-step-heading">
                    <span className="estimate-step-number">04</span>
                    <div>
                      <h3>Your details</h3>
                      <p>
                        So our team can reach you with your estimate and next
                        steps.
                      </p>
                    </div>
                  </div>

                  <div className="estimate-extra-fields">
                    <div className="estimate-field">
                      <label htmlFor="customer-name">Your name</label>
                      <input
                        id="customer-name"
                        type="text"
                        required
                        autoComplete="name"
                        value={name}
                        onChange={(event) => {
                          setName(event.target.value);
                          setFormError("");
                        }}
                        placeholder="Full name"
                        maxLength={100}
                      />
                    </div>

                    <div className="estimate-field">
                      <label htmlFor="customer-contact">
                        Mobile number or email
                      </label>
                      <input
                        id="customer-contact"
                        type="text"
                        required
                        autoComplete="email"
                        value={contact}
                        onChange={(event) => {
                          setContact(event.target.value);
                          setFormError("");
                        }}
                        placeholder="98765 43210 or you@example.com"
                        maxLength={120}
                      />
                    </div>

                    <div className="estimate-field">
                      <label htmlFor="project-location">Project location</label>
                      <input
                        id="project-location"
                        type="text"
                        value={location}
                        onChange={(event) => setLocation(event.target.value)}
                        placeholder="City or area"
                        maxLength={100}
                      />
                    </div>

                    <div className="estimate-field">
                      <label htmlFor="project-timeline">
                        Preferred timeline
                      </label>
                      <select
                        id="project-timeline"
                        value={timeline}
                        onChange={(event) => setTimeline(event.target.value)}
                      >
                        <option value="As soon as possible">
                          As soon as possible
                        </option>
                        <option value="1-3 months">Within 1–3 months</option>
                        <option value="3-6 months">Within 3–6 months</option>
                        <option value="6+ months">6+ months</option>
                        <option value="Flexible">Flexible</option>
                      </select>
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
                      <input
                        id="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(event) => setHoneypot(event.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="button button-dark estimate-submit"
                  disabled={!hasSelection || isSending}
                >
                  {isSending ? "Sending…" : "Calculate My Estimate"}{" "}
                  <span>↗</span>
                </button>

                {formError && (
                  <p className="estimate-form-note" role="alert">
                    {formError}
                  </p>
                )}

                {!hasSelection && (
                  <p className="estimate-form-note" role="status">
                    Select at least one item or service with a quantity above
                    zero to see your estimate.
                  </p>
                )}

                <p className="estimate-form-note">
                  This tool provides an initial planning range, not a binding
                  quotation or a guarantee of final project cost. Your details
                  are shared with VR Interiors only to respond to your enquiry.
                </p>
              </form>

              {/* SUMMARY PANEL */}
              <aside className="estimate-summary">
                <div className="estimate-summary-top">
                  <span className="eyebrow eyebrow-light">
                    YOUR PROJECT OVERVIEW
                  </span>
                  <div className="estimate-summary-logo">VR.</div>

                  <h3>
                    A space designed
                    <br />
                    around you.
                  </h3>

                  <p>
                    Your selections help us understand the direction of your
                    project.
                  </p>
                </div>

                <div className="estimate-summary-body">
                  <div className="summary-detail">
                    <span>Project type</span>
                    <strong>{projectLabel}</strong>
                  </div>
                  <div className="summary-detail">
                    <span>Items selected</span>
                    <strong>{Object.keys(itemQty).length}</strong>
                  </div>
                  <div className="summary-detail">
                    <span>Services selected</span>
                    <strong>
                      {Object.keys(serviceQty).length} of{" "}
                      {serviceOptions.length}
                    </strong>
                  </div>

                  <div className="summary-divider" />

                  {showEstimate ? (
                    <div className="estimate-result" aria-live="polite">
                      <span className="estimate-result-label">
                        INDICATIVE BUDGET RANGE
                      </span>
                      <div className="estimate-result-amount">
                        {formatINR(estimate.min)}
                      </div>
                      <div className="estimate-result-to">to</div>
                      <div className="estimate-result-amount">
                        {formatINR(estimate.max)}
                      </div>
                      <p>
                        A preliminary planning estimate based on your current
                        selections.
                      </p>

                      {sendStatus === "sent" && (
                        <p role="status">
                          Thank you, {name.trim()}. Your details have reached
                          our team and we will contact you soon.
                        </p>
                      )}

                      {sendStatus === "failed" && (
                        <p role="alert">
                          We could not send your details automatically. Please
                          use the button below to contact us directly.
                        </p>
                      )}

                      <a
                        className="button button-light estimate-contact-button"
                        href={`/contact?message=${encodeURIComponent(enquiryMessage)}`}
                      >
                        Discuss This Estimate <span>↗</span>
                      </a>
                    </div>
                  ) : (
                    <div className="estimate-placeholder">
                      <span className="estimate-placeholder-icon">↗</span>
                      <h4>Your estimate starts here.</h4>
                      <p>
                        Complete the details and select Calculate My Estimate to
                        view your indicative planning range.
                      </p>
                    </div>
                  )}
                </div>

                <div className="estimate-summary-footer">
                  <span className="summary-footer-dot" />
                  <p>
                    Every project is different. Your final quotation will depend
                    on the agreed scope, site conditions, specifications and
                    taxes.
                  </p>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* BOTTOM CTA */}
        <section className="estimate-bottom-cta">
          <div className="container estimate-bottom-inner">
            <div>
              <span className="eyebrow">LET&apos;S MAKE IT PERSONAL</span>
              <h2>
                Your vision deserves
                <br />
                <span>a thoughtful plan.</span>
              </h2>
              <p>
                Speak with us about your space, priorities and the right next
                step for your business.
              </p>
            </div>

            <a className="button button-dark" href="/contact">
              Talk to VR Interiors <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
