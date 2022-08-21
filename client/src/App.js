import React, { useEffect } from "react";
import "./index-style.css"
import Main from "./Main";
import {useState} from "react";
import { configureStore } from "@reduxjs/toolkit";
import clientInfoReducer from "./Tools/clientInfo";
import modalStatusReducer from "./Tools/modalStatus";
import { Provider } from "react-redux";



function App() {


  const store = configureStore({
    reducer: {
      clientInfo: clientInfoReducer,
      modalStatus: modalStatusReducer
    }
  })



  return (
    <Provider store={store}>
      <div className="App">
        <Main />
      </div>
    </Provider>
  );
}

export default App; 
