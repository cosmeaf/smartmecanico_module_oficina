import React from "react";
import PropTypes from "prop-types";

function DataPagination({ currentPage, totalPages, setCurrentPage }) {
  function goToPage(page) {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  }

  return (
    <nav
      className="flex flex-wrap items-center justify-between pt-4"
      aria-label="Table navigation"
    >
      <div className="w-full md:w-auto mb-2 md:mb-0">
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
          Showing
          <span className="font-semibold text-gray-900 dark:text-white ml-2 mr-2">
            {currentPage}-
            {currentPage * totalPages <= totalPages
              ? currentPage * totalPages
              : totalPages}
          </span>
          of
          <span className="font-semibold text-gray-900 dark:text-white ml-2">
            {totalPages}
          </span>
        </span>
      </div>
      <ul className="flex flex-wrap -space-x-px text-sm h-8">
        <li className="mb-2 md:mb-0">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className="mb-2 md:mb-0">
            <button
              onClick={() => goToPage(index + 1)}
              disabled={currentPage === index + 1}
              className={`flex items-center justify-center px-3 h-8 leading-tight ${
                currentPage === index + 1
                  ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                  : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className="mb-2 md:mb-0">
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

DataPagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
};

export default DataPagination;
