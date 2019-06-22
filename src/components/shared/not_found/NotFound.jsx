import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="hero is-fullheight-with-navbar is-bold">
      <div className="hero-body">
        <div className="container has-text-centered">
          <h1 className="title">It's lonely out here</h1>
          <h2 className="subtitle">
            Here's the way <Link to="/">home</Link>
          </h2>
        </div>
      </div>
    </section>
  );
}
