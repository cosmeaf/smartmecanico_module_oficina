import React from "react";
import PropTypes from "prop-types";
import "./SmartButton.css";

const SmartButton = ({
  variant = "btnPrimary",
  icon: IconComponent,
  title,
  onClick,
  ...otherProps
}) => {
  const buttonClass = `smartButton ${variant}`;

  return (
    <button className={buttonClass} onClick={onClick} {...otherProps}>
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
};

SmartButton.defaultProps = {
  variant: "btnPrimary",
};

export default SmartButton;
