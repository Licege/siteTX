import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  getAllDeliverySettings,
  getAllOrderedDishes,
  getDeliveryOrder,
  getGlobalDeliverySettings
} from '../getters/bucket.getters'
import { dishType, IDeliveryPost } from '../../types/types'
import * as actions from '../reducers/bucket.reducer'
import { useAppDispatch } from '../redux-store'
import { postOrder, requestDeliverySettings, requestGlobalDeliverySettings } from '../thunks/bucket.thunk'

export const useDelivery = () => {
  return useSelector(getDeliveryOrder)
}

export const useOrderedDishes = () => {
  return useSelector(getAllOrderedDishes)
}

export const useDeliverySettings = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const settings = useSelector(getAllDeliverySettings)

  useEffect(() => {
    if (!settings.length || force) {
      dispatch(requestDeliverySettings())
    }
  }, [])

  return settings
}

export const useGlobalDeliverySettings = ({ force = false } = {}) => {
  const dispatch = useAppDispatch()
  const settings = useSelector(getGlobalDeliverySettings)

  useEffect(() => {
    if (!settings || !Object.keys(settings).length || force) {
      dispatch(requestGlobalDeliverySettings())
    }
  }, [])

  return settings
}

export const useDeliveryActions = () => {
  const dispatch = useAppDispatch()

  const addDishToBucket = (dish: dishType) => {
    dispatch(actions.addDish(dish))
  }

  const increaseDishCount = (dish: dishType) => {
    dispatch(actions.increaseDishCount(dish))
  }

  const reduceDishCount = (dish: dishType) => {
    dispatch(actions.reduceDishCount(dish))
  }

  const changeDishCount = (dish: dishType, count: number) => {
    dispatch(actions.changeDishCount({ dish, count }))
  }

  const removeDish = (id: number) => {
    dispatch(actions.removeDish(id))
  }

  const clearBucket = () => {
    dispatch(actions.clearBucket())
  }

  return { addDishToBucket, increaseDishCount, reduceDishCount, changeDishCount, removeDish, clearBucket }
}

export const usePostOrder = () => {
  const dispatch = useAppDispatch()

  return (order: IDeliveryPost) => {
    dispatch(postOrder(order))
  }
}