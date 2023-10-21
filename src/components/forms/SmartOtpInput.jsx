import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "./SmartForm";
import "./SmartForm.css";

const SmartOtpInput = ({ label, name, onChange }) => {
  const { errors = {} } = useForm();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [inputChange, setInputChange] = useState(null);
  const [prevIndex, setPrevIndex] = useState(null);
  const inputs = useRef([]);

  useEffect(() => {
    if (inputChange !== null) {
      setOtp(inputChange);
      onChange(inputChange.join(""));
    }
    if (prevIndex !== null) {
      inputs.current[prevIndex].focus();
      setPrevIndex(null);
    }
  }, [inputChange, onChange, prevIndex]);

  const focusNext = (index, value) => {
    if (index < 5 && value) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.keyCode === 8) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setInputChange(newOtp);
      if (index > 0 && !otp[index]) {
        setPrevIndex(index - 1);
      }
    }
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setInputChange(newOtp);
    if (value) {
      focusNext(index, value);
    }
  };

  const handleKeyPress = (e, index) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }

    if (e.keyCode === 8) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setInputChange(newOtp);
      if (index > 0 && !otp[index]) {
        setPrevIndex(index - 1);
      }
    }
  };

  return (
    <div className="smart-input-container">
      <label className="smart-otp-label">{label}</label>
      <div className="smart-otp-field">
        <div className="smart-otp-card">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(ref) => inputs.current.push(ref)}
              type="tel"
              name={`${name}_${index + 1}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyPress(e, index)}
              maxLength="1"
              className="smart-otp-input"
            />
          ))}
        </div>
      </div>
      {errors[name] && <div className="smart-otp-error">{errors[name]}</div>}
    </div>
  );
};

SmartOtpInput.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SmartOtpInput;
