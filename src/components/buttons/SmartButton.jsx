import React from "react";
import PropTypes from "prop-types";
import "./SmartButton.css";

const SmartButton = ({
  variant = "btnPrimary",
  icon: IconComponent,
  title,
  onClick,
  type = "button", // valor padrão
  ...otherProps
}) => {
  const buttonClass = `smartButton ${variant}`;

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      {...otherProps}
    >
      {IconComponent && <IconComponent className="iconSpacing" size={20} />}
      {title}
    </button>
  );
};

SmartButton.propTypes = {
  variant: PropTypes.oneOf([
    "btnPrimary",
    "btnSecondary",
    "btnInfo",
    "btnWarning",
    "btnDanger",
    "btnAlert",
  ]),
  title: PropTypes.string.isRequired,
  icon: PropTypes.func,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["button", "reset", "submit"]),
};

SmartButton.defaultProps = {
  variant: "btnPrimary",
  type: "button",
};

export default SmartButton;
