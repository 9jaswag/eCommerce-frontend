import React from "react";

export default function GroupHero({ name, description }) {
  return (
    <section className="hero is-medium is-primary is-bold">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">{name} Wears</h1>
          <h2 className="subtitle">{description}</h2>
        </div>
      </div>
    </section>
  );
}
