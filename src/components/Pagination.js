import React from "react";

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {
    
  const prev = () => {
    setCurrentPage(Math.max(0, currentPage - 1));
  };

  const next = () => {
    setCurrentPage(Math.min(totalPages.length - 1, currentPage + 1));
  };

  return (
    <nav aria-label="Page navigation example">
      <ul
        className="pagination justify-content-center"
        style={{ margin: "10px 0px" }}
      >
        <li className="page-item">
          <button className="page-link" onClick={prev} aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        {totalPages.map((i) => (
          <li
            className={i === currentPage ? "page-item active" : "page-item"}
            key={i}
          >
            <button className="page-link" onClick={() => setCurrentPage(i)}>
              {i + 1}
            </button>
          </li>
        ))}
        <li className="page-item">
          <button className="page-link" onClick={next} aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
