import React, { useState } from "react";
import PropTypes from "prop-types";

const SmartFormValidation = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});

  const validateInput = (name, value) => {
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [name]: "Campo não pode estar vazio!" }));
    } else if (
      name === "email" &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
    ) {
      setErrors((prev) => ({ ...prev, [name]: "Email inválido!" }));
    } else if (name === "password" && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        [name]: "Senha deve ter no mínimo 8 caracteres!",
      }));
    } else if (name === "passconf" && value !== formValues.password) {
      setErrors((prev) => ({ ...prev, [name]: "As senhas não coincidem!" }));
    } else {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }

    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        error: errors[child.props.name],
        validateInput,
      });
    }
    return child;
  });

  return <div>{childrenWithProps}</div>;
};

SmartFormValidation.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmartFormValidation;
