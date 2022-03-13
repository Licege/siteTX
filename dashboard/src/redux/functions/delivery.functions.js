const calcDeliveryCost = state => {
  const {deliveryType, address, price} = state.currentOrder

  if (deliveryType === 'home') {
    const setting = state.settings.find(settings => settings.city === address.city)
    if (price >= setting.freeDelivery) {
      return 0
    } else {
      return setting.priceForDelivery
    }
  }
  return 0
}

const addDishIntoList = (dishes, dish) => {
  const index = dishes.findIndex(d => d.id === dish.id)
  if (index === -1) {
    return [...dishes, dish]
  } else {
    const newDishes = [ ...dishes ]
    newDishes[index].count += 1
    return newDishes
  }
}

export function handleAddDishToOrder(state, action) {
  const {id, title, cost} = action.payload

  const position = {id, title, cost, count: 1}

  state.currentOrder.price += position.cost
  state.currentOrder.list = addDishIntoList(state.currentOrder.list, position)
  state.currentOrder.deliveryCost = calcDeliveryCost(state)
}

export function handleRemoveDishFromOrder(state, action) {
  const position = state.currentOrder.list.find(order => order.id === action.payload)

  state.currentOrder.list = state.currentOrder.list.filter(order => order.id !== action.payload)
  state.currentOrder.price -= (position.cost * position.count)
  state.currentOrder.deliveryCost = calcDeliveryCost(state)
}

export function handleIncreaseDishToOrder(state, action) {
  const position = state.currentOrder.list.find(order => order.id === action.payload)
  position.count += 1

  state.currentOrder.list =  state.currentOrder.list.map(order => order.id === position.id ? position : order)
  state.currentOrder.price += position.cost
  state.currentOrder.deliveryCost = calcDeliveryCost(state)
}

export function handleDecreaseDishFromOrder(state, action) {
  let list
  const position = state.currentOrder.list.find(order => order.id === action.payload)

  if (position.count === 1) {
    list = state.currentOrder.list.filter(order => order.id !== action.payload)
  } else {
    position.count -= 1
    list = state.currentOrder.list.map(order => order.id === action.payload ? position : order)
  }

  state.currentOrder.list = list
  state.currentOrder.price -= position.cost
  state.currentOrder.deliveryCost = calcDeliveryCost(state)
}

export function handleChangeDeliveryType(state, action) {
  state.currentOrder.deliveryType = action.payload

  if (action.payload === 'home') {
    const settings = state.settings.find(s => s.city === state.currentOrder.address.city)
    state.currentOrder.deliveryCost = state.currentOrder.price >= settings.freeDelivery ? 0 : settings.priceForDelivery
  } else {
    state.currentOrder.deliveryCost = 0
  }
}