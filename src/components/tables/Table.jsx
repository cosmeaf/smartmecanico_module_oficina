import React from "react";
import PropTypes from "prop-types";

const Table = ({ columns, data, onRowClick, onAddClicked }) => {
  return (
    <div>
      <div className="flex justify-between items-center py-4 px-2"></div>

      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key}>{col.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} onClick={() => onRowClick(row)}>
              {columns.map((col) => (
                <td key={col.key}>{row[col.key]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  data: PropTypes.array.isRequired,
  onRowClick: PropTypes.func,
  onAddClicked: PropTypes.func,
};

Table.defaultProps = {
  onRowClick: () => {},
  onAddClicked: () => {},
};

export default Table;
