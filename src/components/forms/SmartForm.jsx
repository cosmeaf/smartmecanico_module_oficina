import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const FormContext = createContext();

const SmartForm = ({ children, onSubmit }) => {
  const [errors, setErrors] = useState({});

  const validateInput = (type, value, allValues) => {
    switch (type) {
      case "text":
        if (!value || !value.trim()) {
          setErrors((prev) => ({ ...prev, type: "Field cannot be empty." }));
        } else {
          setErrors((prev) => ({ ...prev, type: null }));
        }
        break;

      case "email":
        if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)) {
          setErrors((prev) => ({ ...prev, type: "Invalid email." }));
        } else {
          setErrors((prev) => ({ ...prev, type: null }));
        }
        break;

      case "password":
        if (value.length < 8) {
          setErrors((prev) => ({
            ...prev,
            type: "Password must be at least 8 characters.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, type: null }));
        }
        break;

      case "passconf":
        if (value !== allValues.password) {
          setErrors((prev) => ({ ...prev, type: "Passwords do not match." }));
        } else {
          setErrors((prev) => ({ ...prev, type: null }));
        }
        break;

      case "phone": {
        const phoneRegex = /^\+55 \(\d{2}\) 9\d{4}-\d{4}$/;
        if (!phoneRegex.test(value)) {
          setErrors((prev) => ({
            ...prev,
            [type]: "Número de telefone inválido.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, [type]: null }));
        }
        break;
      }

      case "number":
        if (isNaN(value)) {
          setErrors((prev) => ({
            ...prev,
            type: "Por favor, insira um número válido.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, type: null }));
        }
        break;

      default:
        setErrors((prev) => ({ ...prev, type: null }));
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
