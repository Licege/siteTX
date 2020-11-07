import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { categoryType } from '../../../types/types'

interface IProps {
    categories: Array<categoryType>
}

const Sidebar = ({ categories }: IProps) => {
    const [ height, setHeight ] = useState(`${document.body.scrollHeight - 300}px`)

    useEffect(() => {
        setHeight(`${document.body.scrollHeight - 300}px`)
    }, [document.body.scrollHeight])

    return (
        <div className='menu-categories' id='menu-categories-navbar' style={{ height }}>
            <h2 className='menu-categories-title'>Категории</h2>
            <div className='menu-categories-content'>
                {categories.map((category) =>
                    <NavLink activeClassName='-active' className='menu-categories-content-item'
                             to={'/menu/' + category.title_en} key={category._id}>{category.title}</NavLink>,
                )}
            </div>
        </div>
    )
}

export default Sidebar