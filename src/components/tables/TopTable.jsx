import React, { useState } from "react";
import PropTypes from "prop-types";
import { BsPersonFillAdd } from "react-icons/bs";

const TopTable = ({
  buttonLabel = "Add", // Valor padrão será "Add"
  onAddClicked,
  handleSearchChange,
  searchTerm,
  handleRowCountChange,
}) => {
  const [rowCount, setRowCount] = useState("10");

  return (
    <div className="flex justify-between items-center py-4 px-2">
      <select
        className="border rounded-md px-2 py-1 ml-5"
        onChange={handleRowCountChange}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>

      <div className="flex">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="px-4 py-2 border rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        />
        <button
          onClick={onAddClicked}
          className="bg-gray-200 w-28 border flex justify-between items-center px-2 ml-8 mr-5 rounded-md hover:bg-gray-300"
        >
          <BsPersonFillAdd size={25} className="mr-2" /> {buttonLabel}
        </button>
      </div>
    </div>
  );
};

TopTable.propTypes = {
  buttonLabel: PropTypes.string,
  onAddClicked: PropTypes.func.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleRowCountChange: PropTypes.func.isRequired,
};

export default TopTable;
