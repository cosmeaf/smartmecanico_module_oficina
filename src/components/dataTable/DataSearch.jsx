import React from "react";
import PropTypes from "prop-types";

function DataSearch({ onSearch }) {
  return (
    <div className="flex items-center justify-end w-30 relative">
      <input
        type="text"
        id="table-search"
        className="block w-full pl-10 pr-3 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md bg-white shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Buscar"
        onChange={(e) => onSearch(e.target.value)}
        onBlur={(e) => onSearch(e.target.value)}
      />
      <svg
        className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clipRule="evenodd"
        ></path>
      </svg>
    </div>
  );
}

DataSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default DataSearch;
