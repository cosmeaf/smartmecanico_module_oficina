import React, { useState } from "react";
import PropTypes from "prop-types";
import DataHeaderTable from "./DataHeaderTable";
import DataPagination from "./DataPagination";

function DataTable({
  dataSource,
  dataCount,
  dataSearch,
  pagination,
  children,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = dataSource.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const startIdx = (currentPage - 1) * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const displayedData = filteredData.slice(startIdx, endIdx);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  if (!dataSource || dataSource.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        Nenhum dado disponível
      </div>
    );
  }

  let columnHeaders;
  if (children) {
    columnHeaders = React.Children.toArray(children).flatMap((child) =>
      React.Children.toArray(child.props.children).map((column) => column.props)
    );
  } else {
    columnHeaders = Object.keys(dataSource[0]).map((key) => ({
      field: key,
      title: key,
    }));
  }

  return (
    <div className="data-table overflow-x-auto">
      {(dataCount || dataSearch) && (
        <DataHeaderTable
          dataCount={dataCount}
          dataSearch={dataSearch}
          onSearch={setSearchTerm}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPage={rowsPerPage}
        />
      )}
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {columnHeaders.map((column, index) => (
              <th scope="col" className="px-6 py-3" key={index}>
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((row, rowIndex) => (
            <tr
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700"
              key={rowIndex}
            >
              {columnHeaders.map((column, columnIndex) => (
                <td className="px-6 py-1" key={columnIndex}>
                  {column.commands
                    ? column.commands.map((command, cmdIndex) => (
                        <button
                          key={cmdIndex}
                          type="button"
                          className="flex-1 p-2 hover:bg-gray-200 rounded-md"
                          onClick={() =>
                            command.onClick && command.onClick(row.id)
                          }
                        >
                          {command.icon || command.label}
                        </button>
                      ))
                    : row[column.field] || ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {pagination && (
        <DataPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
}

DataTable.propTypes = {
  dataSource: PropTypes.arrayOf(PropTypes.object).isRequired,
  children: PropTypes.node,
  dataCount: PropTypes.bool,
  dataSearch: PropTypes.bool,
  pagination: PropTypes.bool,
};

DataTable.defaultProps = {
  dataCount: false,
  dataSearch: false,
  pagination: false,
};

export default DataTable;
