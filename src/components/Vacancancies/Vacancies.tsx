import React from 'react';
import {vacancyType} from "../../types/types";
import CardVacancy from "../common/elements/CardVacancy";

type PropsType = {
    vacancies: Array<vacancyType>
}

const Vacancies: React.FC<PropsType> = ( {vacancies} ) => {
    return (
        <div className='page'>
            <div className='card'>
                <div className='card-body'>
                    <h4 className='page-title'>~ Вакансии ~</h4>
                    <div className='vacancies-content'>
                        {vacancies.map(vacancy =>
                            <CardVacancy vacancy={vacancy} key={vacancy.id}/>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Vacancies;