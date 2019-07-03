import React from "react";

export default function ProductDisplayModal({ src }) {
  return (
    <div>
      <div className="modal product-display">
        <div className="modal-background" />
        <div className="modal-content">
          <p className="image is-4by3">
            <img src={src} alt="" />
          </p>
        </div>
        <button className="modal-close is-large" aria-label="close" />
      </div>
    </div>
  );
}
