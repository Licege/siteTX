import { createSlice } from '@reduxjs/toolkit'

type ModalType = {
  name: string
  props: any
}

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    current: null as ModalType | null
  },
  reducers: {
    showModal: (state, action) => {
      state.current = action.payload
    },
    hideModal: state => {
      state.current = null
    }
  }
})

export const { showModal, hideModal } = modalSlice.actions
export default modalSlice.reducer