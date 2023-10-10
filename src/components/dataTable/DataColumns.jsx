import React from "react";
import PropTypes from "prop-types";

function DataColumns({ children }) {
  return React.Children.toArray(children);
}

DataColumns.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataColumns;
