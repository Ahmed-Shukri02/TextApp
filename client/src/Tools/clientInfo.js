import { createSlice } from "@reduxjs/toolkit";

export const clientInfo = createSlice({
  name: "clientInfo",
  initialState: {value: null},
  reducers: {
    login: (state, payload) => {
      state.value = payload
    },
    logout: (state) => {
      state.value = null
    }
  }
})

export const {login, logout} = clientInfo.actions
export default clientInfo.reducer