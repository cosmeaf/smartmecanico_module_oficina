import React from "react";
import PropTypes from "prop-types";

function DataCountLine({ rowsPerPage, onRowsPerPageChange }) {
  return (
    <div className="flex items-center">
      <label className="mr-2 text-gray-700 dark:text-gray-300">
        Total por Linha:
      </label>
      <select
        className="text-gray-700 px-2 py-1 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-md hover:border-blue-500 transition-colors duration-200"
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="75">75</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}

DataCountLine.propTypes = {
  rowsPerPage: PropTypes.number.isRequired,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default DataCountLine;
