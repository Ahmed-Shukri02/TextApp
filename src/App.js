import "./index-style.css"
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import {useState} from "react";


function App() {

  return (
    <div className="App">
      <Header/>
      <Main />
      <Footer/>
    </div>
  );
}

export default App;
