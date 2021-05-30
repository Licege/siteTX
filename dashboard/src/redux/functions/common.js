export const updateValue = (key = '') => (state, action) => {
  state[key] = state[key].map(item => item.id === action.payload.id ? action.payload : item)
}

export const removeValue = (key = '') => (state, action) => {
  state[key] = state[key].filter(item => item.id !== action.payload.id)
}