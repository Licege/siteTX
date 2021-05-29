import React from "react";
import {Table} from "react-bootstrap";
import Paginator from "../../components/common/Paginator";
import {PageHeader} from '../../styledComponents/components'

const Users = (props) => {
    return (
        <div>
            <PageHeader title='Пользователи' />
            <div className='page-container'>
                <div className='card filter'>
                    <div className='card-body filter-container'>
                        <span className='filter-header'>Фильтры</span>
                        <div className='filter-main'>
                            <input id='surname' type='text' placeholder='Фамилия' className='filter-main-input -name form-control' />
                            <input id='forename' type='text' placeholder='Имя' className='filter-main-input -name form-control' />
                            <input id='phone' type='text' placeholder='Телефон' className='filter-main-input -name form-control' />
                            <input id='email' type='text' placeholder='Email' className='filter-main-input -name form-control' />
                        </div>
                        <div className='filter-actions'>
                            <span className='filter-actions-reset' onClick={props.clearFilter}>Сбросить</span>
                            <span className='filter-actions-apply' onClick={props.filterApply}>Фильтровать</span>
                        </div>
                    </div>
                </div>

                <div className='card'>
                    <div className='card-body'>
                        {props.users ? <><Table responsive>
                            <thead className='table-thread'>
                            <tr>
                                <th>Фамилия</th>
                                <th>Имя</th>
                                <th>E-mail</th>
                                <th>Телефон</th>
                                <th>Баллы</th>
                            </tr>
                            </thead>
                            <tbody className='table-body'>
                            {props.users.map(user => (
                                <tr key={user.id} onClick={props.detail(user.id)}>
                                    <td>{user.surname}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.bonusPoints}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                        <Paginator totalCount={props.totalUsersCount} currentPage={props.currentPage} pageSize={10} onChangePage={props.onPageChanged} /></> : null }
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Users;