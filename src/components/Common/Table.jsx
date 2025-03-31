import React from "react";

import "./Table.css";

const Table = ({ headings, children }) => {
  return (
    <table className="common_table">
      <thead>
        <tr>
          {headings.map((heading, index) => {
            return <th key={index}>{heading}</th>;
          })}
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default Table;
