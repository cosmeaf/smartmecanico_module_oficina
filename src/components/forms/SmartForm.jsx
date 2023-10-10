import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const FormContext = createContext();

const SmartForm = ({ children, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateInput = (name, value, allValues) => {
    switch (name) {
      case "username":
      case "text":
        if (!value || !value.trim()) {
          setErrors((prev) => ({ ...prev, [name]: "Field cannot be empty." }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: null }));
        }
        break;

      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          setErrors((prev) => ({ ...prev, [name]: "Invalid email." }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: null }));
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            [name]: "Password must be at least 8 characters.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: null }));
        }
        break;

      case "passconf":
        if (value !== allValues.password) {
          setErrors((prev) => ({ ...prev, [name]: "Passwords do not match." }));
        } else {
          setErrors((prev) => ({ ...prev, [name]: null }));
        }
        break;

      default:
        setErrors((prev) => ({ ...prev, [name]: null }));
        break;
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formValues = {};
    for (let input of e.target.elements) {
      if (input.type !== "submit") {
        formValues[input.name] = input.value;
      }
    }

    for (let child of React.Children.toArray(children)) {
      if (React.isValidElement(child) && child.props.name) {
        validateInput(
          child.props.name,
          formValues[child.props.name],
          formValues
        );
      }
    }

    onSubmit(e);
  };

  return (
    <FormContext.Provider value={{ errors, validateInput }}>
      <form onSubmit={handleFormSubmit}>{children}</form>
    </FormContext.Provider>
  );
};

SmartForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export const useForm = () => {
  return useContext(FormContext);
};

export default SmartForm;
