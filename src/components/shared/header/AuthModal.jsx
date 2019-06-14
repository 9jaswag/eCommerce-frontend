import React from "react";

export default function AuthModal({ name, children }) {
  return (
    <div className={`modal ${name}`}>
      <div className="modal-background" />
      <div className="modal-content">{children}</div>
      <button className="modal-close is-large" aria-label="close" />
    </div>
  );
}
