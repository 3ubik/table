import React from "react"
import './Pagination.css'

const Pagination = ({usersPerPage, totalUsers, paginate, currentPage}) => {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <div className="pagination-container">
            <button onClick={() => paginate((prev) => prev === 1 ? prev : prev - 1)}
                    className={currentPage === 1 ? 'disabled' : ''}
            >Back</button>
            {pageNumbers.map(number => {
                return <button key={number} className={currentPage === number ? 'active' : ''}
                               onClick={() => paginate(number)}
                >{number}</button>
            })}
            <button onClick={() => paginate((prev) => prev >= pageNumbers.length ? prev : prev + 1)}
                    className={currentPage === pageNumbers.length ? 'disabled' : ''}
            >Forward</button>
        </div>
    )
}

export default Pagination