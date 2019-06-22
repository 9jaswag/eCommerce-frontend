import React from "react";
import styles from "./form.module.scss";
import DisplayError from "../error/DisplayError";

export default function FormInput({
  label,
  type,
  name,
  id,
  placeholder,
  onChange,
  required,
  value = "",
  helpText,
  error,
  disabled
}) {
  return (
    <>
      <label htmlFor={id}>
        {label} {required && <span className="has-text-danger">*</span>}
      </label>
      <div className="">{error && <DisplayError message={error} />}</div>
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
          disabled={disabled}
        />
        {helpText && (
          <p className="help is-info has-text-weight-semibold">{helpText}</p>
        )}
      </div>
    </>
  );
}
