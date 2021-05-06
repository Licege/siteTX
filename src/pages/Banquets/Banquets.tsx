import React, { useEffect } from 'react'

export const Banquets: React.FC = () => {
    useEffect(() => {
        document.title = 'Банкеты'
        window.scrollTo(0, 0)
    }, [])

    return (
        <main className='banquets'>
            <div className='banquets-header'>
                <div className='banquets-header__image'>
                    <h3 className='banquets-header__title'>Ваши банкеты у нас</h3>
                </div>
            </div>
        </main>
    )
}
