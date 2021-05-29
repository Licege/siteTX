import { useState, useEffect, useCallback } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  useCurrentDeliveryOrder,
  useDeliveryOrders,
  useRequestDeliveryCommonSettings
} from '../../redux/hooks/hooks'
import {
  decreaseDishFromList,
  increaseDishFromList,
  removeDishFromOrder, setCurrentPage
} from '../../redux/reducers/delivery.reducer'
import {requestOrdersDelivery, updateOrderDelivery} from '../../redux/thunks/delivery.thunks'
import {showModal} from '../../redux/reducers/modals.reducer'
import {getCurrentDeliveryPage, getDeliveryOrdersTotal} from '../../redux/getters/delivery.getters'
import { useDishes } from '../../redux/hooks/menu.hooks'

export const useDeliveryInfoLogic = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const order = useCurrentDeliveryOrder()

  const updateOrder = useCallback(order => {
    dispatch(updateOrderDelivery(order))
    history.push('/delivery')
  }, [])

  const showMenuModal = useCallback(() => {
    dispatch(showModal({ name: 'MENU' }))
  }, [])

  return { order, updateOrder, showMenuModal }
}

export const useDeliveryTableLogic = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const [filter, setFilter] = useState({})
  const currentPage = useSelector(getCurrentDeliveryPage)
  const orders = useDeliveryOrders({ page: currentPage, filter })

  useEffect(() => {
    dispatch(requestOrdersDelivery({ page: currentPage, filter }))
  }, [currentPage])

  const detail = useCallback((id) => () => history.push(`/delivery/${id}`), [])
  const prevent = useCallback(event => {
    event.preventDefault()
    event.stopPropagation()
  }, [])

  return {
    orders,
    detail,
    prevent
  }
}

export const useDeliveryFilterLogic = () => {
  const changeFilter = () => {}
  const clearFilter = () => {}

  return {
    changeFilter,
    clearFilter
  }
}

export const useTableProductsPositionsLogic = () => {
  const dispatch = useDispatch()

  useRequestDeliveryCommonSettings()
  const dishes = useDishes()

  const increaseDish = useCallback(id => () => { dispatch(increaseDishFromList(id)) }, [])
  const decreaseDish = useCallback(id => () => { dispatch(decreaseDishFromList(id)) }, [])
  const removeDish = useCallback(id => () => { dispatch(removeDishFromOrder(id)) }, [])

  return { dishes, increaseDish, decreaseDish, removeDish }
}

export const usePaginatorLogic = () => {
  const dispatch = useDispatch()

  const pageSize = 5
  const currentPage = useSelector(getCurrentDeliveryPage)
  const totalCount = useSelector(getDeliveryOrdersTotal)

  const onChangePage = useCallback(page => {
    dispatch(setCurrentPage(page))
  }, [])

  return {
    currentPage,
    onChangePage,
    totalCount,
    pageSize
  }
}