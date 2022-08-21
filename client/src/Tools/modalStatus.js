import { createSlice } from "@reduxjs/toolkit";

export const modalStatus = createSlice({
  name: "modalStatus",
  initialState: {value: false},

  reducers: {
    setModalStatus: (state, payload) => {
      state.value = payload
    } 
  }
})

export const {setModalStatus} = modalStatus.actions
export default modalStatus.reducer