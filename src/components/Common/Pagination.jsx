import React from "react";

import "./Pagination.css";

const Pagination = ({ totalPost, poseterPerPage, onClick, currentPage }) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalPost / poseterPerPage); i++) {
    pages.push(i);
  }

  return (
    <>
      {pages.length > 1 && (
        <ul className="pagination">
          {pages.map((page) => {
            return (
              <li key={page}>
                <button
                  className={
                    parseInt(currentPage) === page
                      ? "pagination_button active"
                      : "pagination_button"
                  }
                  onClick={() => onClick(page)}
                >
                  {page}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default Pagination;
