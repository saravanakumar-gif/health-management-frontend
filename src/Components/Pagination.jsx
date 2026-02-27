import React from 'react';
import '../Styles/Pagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pages = [];
    
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return (
        <div className="pagination">
            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                ← Previous
            </button>

            <div className="page-numbers">
                {startPage > 1 && (
                    <>
                        <button
                            className="page-number"
                            onClick={() => onPageChange(1)}
                        >
                            1
                        </button>
                        {startPage > 2 && <span className="ellipsis">...</span>}
                    </>
                )}

                {pages.map(page => (
                    <button
                        key={page}
                        className={`page-number ${page === currentPage ? 'active' : ''}`}
                        onClick={() => onPageChange(page)}
                    >
                        {page}
                    </button>
                ))}

                {endPage < totalPages && (
                    <>
                        {endPage < totalPages - 1 && <span className="ellipsis">...</span>}
                        <button
                            className="page-number"
                            onClick={() => onPageChange(totalPages)}
                        >
                            {totalPages}
                        </button>
                    </>
                )}
            </div>

            <button
                className="page-btn"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next →
            </button>
        </div>
    );
};

export default Pagination;