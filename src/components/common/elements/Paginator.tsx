import React, {ChangeEvent} from 'react'
import {Pagination} from "@material-ui/lab";
interface IProps {
    totalItemsCount: number,
    pageSize?: number

    onChange: (page: number) => void
}

const Paginator: React.FC<IProps> = ({totalItemsCount, pageSize = 10, onChange}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    const portionSize = 10
    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        onChange(page)
    }


    return (
        <div className='pagination justify-content-center mt-4'>
            <Pagination variant='outlined'
                        shape='rounded'
                        color='primary'
                        count={pagesCount}
                        showFirstButton
                        showLastButton
                        onChange={handleChange} className='news-paginator' />
        </div>

    )
}

export default Paginator;