import React from "react";
import styles from "./form.module.scss";

export default function FormSelect({
  name,
  label,
  options,
  id,
  required,
  onChange,
  value
}) {
  return (
    <div className="control">
      <div className="w-100 mb-2">
        <label htmlFor={id}>
          {label} {required && <span className="has-text-danger">*</span>}
        </label>
        <select
          id={id}
          name={name}
          className={`input ${styles.form_select}`}
          required={required}
          onChange={onChange}
          value={value}
        >
          {options.map(option => (
            <option
              key={option.shipping_region_id}
              value={option.shipping_region_id}
            >
              {option.shipping_region}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
