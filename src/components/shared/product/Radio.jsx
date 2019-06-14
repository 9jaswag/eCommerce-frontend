import React from "react";

export default function Radio({ attributes, onClick }) {
  return (
    <ul>
      {attributes.map(attr => (
        <li className="is-inline-block" key={attr.attribute_value_id}>
          <label className="swatch-label body-font has-text-weight-bold">
            <input
              type="radio"
              name={attr.attribute_name}
              className="check-custom"
              onClick={onClick}
              hidden
            />
            <span className="check-toggle" />
            {attr.attribute_value}
          </label>
        </li>
      ))}
    </ul>
  );
}
