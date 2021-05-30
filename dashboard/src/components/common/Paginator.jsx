import React, { useState } from 'react'
import { Pagination } from 'react-bootstrap'

const Paginator = ({ totalCount, pageSize, currentPage, onChangePage, portionSize = 10 }) => {
    const pagesCount = Math.ceil(totalCount / pageSize)

    const pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const [ portionNumber, setPortionNumber ] = useState(1)
    const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
    const rightPortionPageNumber = portionNumber * portionSize

    return (
        <Pagination className='paginator'>
            {portionNumber > 1 &&
            <Paginator.First onClick={() => { setPortionNumber(portionNumber - 1)}}/>}
            {pages
                .filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
                .map(page => <Pagination.Item
                        key={page}
                        active={page === currentPage}
                        onClick={() => onChangePage(page)}>{page}
                </Pagination.Item>
                )}

            {portionCount > portionNumber &&
            <Pagination.Last onClick={() => { setPortionNumber(portionNumber + 1)}}/>}
        </Pagination>
    )
}

export default Paginator
