import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "./SmartForm";
import "./SmartInput.css";

const SmartInput = ({
  label,
  name,
  placeholder,
  type = "text",
  value = "",
}) => {
  const { errors, validateInput } = useForm();
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="smart-input-container">
      {label && (
        <label className="smart-input-label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={name}
        value={inputValue || ""}
        onChange={(e) => setInputValue(e.target.value)}
        onBlur={(e) => {
          validateInput(e.target.name, inputValue, {
            password: e.target.form.password
              ? e.target.form.password.value
              : "",
          });
        }}
        className="smart-input-field"
      />
      {errors[name] && <div className="smart-input-error">{errors[name]}</div>}
    </div>
  );
};

SmartInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
};

export default SmartInput;
