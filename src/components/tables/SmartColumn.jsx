import React from "react";
import PropTypes from "prop-types";

const SmartColumn = ({ children, ...props }) => {
  return <th {...props}>{children}</th>;
};

SmartColumn.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmartColumn;
