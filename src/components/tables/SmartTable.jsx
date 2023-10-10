import React from "react";
import PropTypes from "prop-types";
import "./SmartTable.css";
import SmartColumns from "./SmartColumns";
import SmartColumn from "./SmartColumn";

const SmartTable = ({ dataSource, children }) => {
  return (
    <div className="smart-table-container">
      <table className="smart-table">
        <thead>
          <tr>
            {React.Children.map(children, (child) => {
              if (child.type === SmartColumns) {
                return React.Children.map(child.props.children, (col) => {
                  if (col.type === SmartColumn) {
                    return (
                      <th
                        key={col.props.field}
                        style={{
                          width: col.props.width,
                          textAlign: col.props.textAlign,
                        }}
                      >
                        {col.props.headerText}
                      </th>
                    );
                  }
                  return null;
                });
              }
              return null;
            })}
          </tr>
        </thead>
        <tbody>
          {dataSource.map((dataEntry, index) => (
            <tr key={index}>
              {React.Children.map(children, (child) => {
                if (child.type === SmartColumns) {
                  return React.Children.map(child.props.children, (col) => {
                    if (col.type === SmartColumn) {
                      return (
                        <td
                          key={col.props.field}
                          style={{
                            width: col.props.width,
                            textAlign: col.props.textAlign,
                          }}
                        >
                          {col.props.children(dataEntry)}
                        </td>
                      );
                    }
                    return null;
                  });
                }
                return null;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

SmartTable.propTypes = {
  dataSource: PropTypes.array.isRequired,
  children: PropTypes.node.isRequired,
};

export default SmartTable;
