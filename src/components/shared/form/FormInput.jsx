import React from "react";
import styles from "./form.module.scss";

export default function FormInput({
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  required,
  value = ""
}) {
  return (
    <>
      <label htmlFor={id}>
        {label} {required && <span className="has-text-danger">*</span>}
      </label>
      <div className="control">
        <input
          type={type}
          name={name}
          id={id}
          className={`input ${styles.form_input}`}
          placeholder={placeholder}
          required={required}
          onChange={onChange}
          value={value}
        />
      </div>
    </>
  );
}
