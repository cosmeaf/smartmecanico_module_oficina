import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";
import SmartFormValidate from "./SmartFormValidate";

const FormContext = createContext();

const SmartForm = ({ children, onSubmit }) => {
  const { errors = {}, validateInput, validateOtp } = SmartFormValidate();

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
        if (child.props.type === "otp") {
          validateOtp(child.props.type, child.props.value, child.props.label);
        } else {
          validateInput(
            child.props.name,
            formValues[child.props.name],
            child.props.label
          );
        }
      }
    }

    if (Object.values(errors).every((error) => !error)) {
      onSubmit(e);
    }
  };

  return (
    <FormContext.Provider value={{ errors, validateInput, validateOtp }}>
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
