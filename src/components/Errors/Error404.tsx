import React from 'react'
import { Link } from 'react-router-dom'

export const Error404: React.FC = () => (
    <div>
        <h1 className='text-center'>404</h1>
        <p className='text-center'>Page not found</p>
        <div className='text-center'>
            <Link to='/' className='text-center'>
                Вернуться домой
            </Link>
        </div>
    </div>
)
