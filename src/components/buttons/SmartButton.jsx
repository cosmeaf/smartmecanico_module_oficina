import React from "react";
import PropTypes from "prop-types";
import "./SmartButton.css";

const SmartButton = ({
  variant = "btnPrimary",
  icon: IconComponent,
  title,
  onClick,
  type = "button",
  width,
  height,
  ...otherProps
}) => {
  const buttonClass = `smartButton ${variant}`;

  if (!title) {
    console.warn(
      "SmartButton foi chamado sem um título. Por favor, forneça um título."
    );
    return null;
  }

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
      style={{ width: width, height: height }}
      {...otherProps}
    >
      {IconComponent && <IconComponent className="iconSpacing " size={20} />}
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
  width: PropTypes.any,
  height: PropTypes.string,
};

SmartButton.defaultProps = {
  variant: "btnPrimary",
  type: "button",
};

export default SmartButton;
