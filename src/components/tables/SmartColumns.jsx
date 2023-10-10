import React from "react";
import PropTypes from "prop-types";

const SmartColumns = ({ children }) => {
  return <div className="smart-columns">{children}</div>;
};

SmartColumns.propTypes = {
  children: PropTypes.node.isRequired,
};

export default SmartColumns;
