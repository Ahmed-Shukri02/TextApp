import { createSlice } from "@reduxjs/toolkit";

export const modalStatus = createSlice({
  name: "modalStatus",
  initialState: {value: null},

  reducers: {
    setModalStatus: (state, payload) => {
      state.value = payload
    },

    closeAllModals: (state) => {
      state.value = null
    }
  }
})

export const {setModalStatus, closeAllModals} = modalStatus.actions
export default modalStatus.reducer