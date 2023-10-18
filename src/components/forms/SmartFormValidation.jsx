import React, { useState } from "react";
import PropTypes from "prop-types";

const SmartFormValidation = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({});

  const validateInput = (type, value, allValues, label) => {
    if (value.trim() === "") {
      setErrors((prev) => ({ ...prev, [type]: "Campo não pode estar vazio!" }));
    } else if (
      type === "email" &&
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(value)
    ) {
      setErrors((prev) => ({ ...prev, [type]: "E-mail inválido!" }));
    } else if (type === "password" && value.length < 8) {
      setErrors((prev) => ({
        ...prev,
        [type]: "Senha deve ter no mínimo 8 caracteres!",
      }));
    } else if (type === "passconf" && value !== formValues.password) {
      setErrors((prev) => ({ ...prev, [type]: "As senhas não coincidem!" }));
    } else {
      setErrors((prev) => ({ ...prev, [type]: null }));
    }

    setFormValues((prev) => ({ ...prev, [type]: value }));
  };

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        error: errors[child.props.type],
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
