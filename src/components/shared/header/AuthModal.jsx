import React from "react";

export default function AuthModal({ name }) {
  return (
    <div className={`modal ${name}`}>
      <div className="modal-background" />
      <div className="modal-content">
        {/* Any other Bulma elements you want */}
      </div>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
}
