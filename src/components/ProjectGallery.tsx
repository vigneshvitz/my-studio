"use client";

import { useState } from "react";

/* Replace these with your real projects: name, category, location, photo.
   Category must be one of: Home, Office, Commercial. */
const projects = [
  {
    name: "Home project 1",
    category: "Home",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Office project 1",
    category: "Office",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Home project 2",
    category: "Home",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Commercial project 1",
    category: "Commercial",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Home project 3",
    category: "Home",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1400&q=85",
  },
  {
    name: "Office project 2",
    category: "Office",
    location: "City, State",
    image:
      "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1400&q=85",
  },
];

const filters = ["All", "Home", "Office", "Commercial"];

export default function ProjectGallery() {
  const [active, setActive] = useState("All");
  const shown =
    active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      <div className="filter-bar" role="tablist" aria-label="Filter projects">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            role="tab"
            aria-selected={active === f}
            className={`filter-btn${active === f ? " active" : ""}`}
            onClick={() => setActive(f)}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="project-grid">
        {shown.map((p) => (
          <article className="project-card" key={p.name}>
            <div className="project-image">
              <img src={p.image} alt={p.name} loading="lazy" />
            </div>
            <div className="concept-meta">{p.category}</div>
            <h3>{p.name}</h3>
            <p>{p.location}</p>
          </article>
        ))}
      </div>
    </>
  );
}
