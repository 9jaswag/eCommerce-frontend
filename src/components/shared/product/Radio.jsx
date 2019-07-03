import React from "react";

export default function Radio({ attributes, onClick, isColor = false }) {
  return (
    <>
      {attributes.map(attr => (
        <div className="column is-3 custom-radio" key={attr.attribute_value_id}>
          <li className="is-inline-block">
            <label className="swatch-label body-font has-text-weight-bold">
              <input
                type="radio"
                name={attr.attribute_name}
                className={`check-custom ${isColor ? "color-radio" : ""}`}
                onClick={onClick}
                hidden
              />
              <span
                className="check-toggle"
                style={{ backgroundColor: attr.attribute_value }}
              />
              {attr.attribute_value}
            </label>
          </li>
        </div>
      ))}
    </>
  );
}
