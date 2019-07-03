import React from "react";

export default function Radio({ attributes, onClick, isColor = false }) {
  return (
    <>
      {attributes.map(attr => (
        <div className="column is-3 custom-radio">
          <li className="is-inline-block" key={attr.attribute_value_id}>
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
