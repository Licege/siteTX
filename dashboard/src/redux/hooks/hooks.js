import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import {requestAllOrders} from '../thunks/orders.thunks'
import {getOrders} from '../getters/orders.getters'
import {
  requestDeliverySettings, requestDeliverySettingsById,
  requestGlobalDeliverySettings,
  requestOrderDeliveryById,
  requestOrdersDelivery
} from '../thunks/delivery.thunks'
import {
  getCurrentDeliveryOrder,
  getDeliveryCommonSettings, getDeliveryCurrentCommonSettings,
  getDeliveryGlobalSettings,
  getDeliveryOrders
} from '../getters/delivery.getters'
import {requestVacancies, requestVacancy} from '../thunks/vacancies.thunks'
import {getAllVacancies, getCurrentVacancy} from '../getters/vacancies.getters'

export const useOrders = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestAllOrders())
  }, [])

  return useSelector(getOrders)
}

export const useDeliveryOrders = (options = {}) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestOrdersDelivery(options))
  }, [])

  return useSelector(getDeliveryOrders)
}

export const useCurrentDeliveryOrder = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestOrderDeliveryById(id))
  }, [id])

  return useSelector(getCurrentDeliveryOrder)
}

export const useDeliveryCommonSettings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestDeliverySettings())
  }, [])

  return useSelector(getDeliveryCommonSettings)
}

export const useRequestDeliveryCommonSettings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestDeliverySettings())
  }, [])
}

export const useVacancies = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestVacancies())
  }, [])

  return useSelector(getAllVacancies)
}

export const useCurrentVacancy = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestVacancy(id))
  }, [])

  return useSelector(getCurrentVacancy)
}

export const useCurrentDeliverySettings = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestDeliverySettingsById(id))
  }, [])

  return useSelector(getDeliveryCurrentCommonSettings)

}

export const useGlobalDeliverySettings = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(requestGlobalDeliverySettings())
  }, [])

  return useSelector(getDeliveryGlobalSettings)
}