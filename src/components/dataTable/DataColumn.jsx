import React from "react";
import PropTypes from "prop-types";

function DataColumn(props) {
  return null;
}

DataColumn.propTypes = {
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  commands: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.node,
      type: PropTypes.string,
    })
  ),
};

export default DataColumn;
