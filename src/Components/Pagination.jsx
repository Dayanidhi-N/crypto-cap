import "./Pagination.css";

const Pagination = ({ onPageChange, totalPages, currentPage }) => {
  return (
    <div className="pagination-container">
      <button
        className="nav-btn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Previuos
      </button>
      {new Array(totalPages).fill(0).map((_, index) => (
        <button
          key={index}
          onClick={() => onPageChange(index + 1)}
          className={currentPage === index + 1 ? "active" : ""}
        >
          {index + 1}
        </button>
      ))}
      <button
        className="nav-btn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
