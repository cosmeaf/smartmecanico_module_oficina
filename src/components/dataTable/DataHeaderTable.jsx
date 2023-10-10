import React from "react";
import PropTypes from "prop-types";
import DataSearch from "./DataSearch";
import DataCountLine from "./DataCountLine";

function DataHeaderTable({
  dataCount,
  rowsPerPage,
  dataSearch,
  onSearch,
  onRowsPerPageChange,
}) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-3 space-y-3 md:space-y-0">
      {dataCount && (
        <DataCountLine
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={onRowsPerPageChange}
        />
      )}
      {dataSearch && <DataSearch onSearch={onSearch} />}
    </div>
  );
}

DataHeaderTable.propTypes = {
  dataCount: PropTypes.bool,
  rowsPerPage: PropTypes.number.isRequired,
  dataSearch: PropTypes.bool,
  onSearch: PropTypes.func,
  onRowsPerPageChange: PropTypes.func.isRequired,
};

export default DataHeaderTable;
