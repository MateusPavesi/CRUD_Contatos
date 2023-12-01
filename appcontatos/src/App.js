import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import Home from './Home';
import ContactEdit from "./components/ContactEdit";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home/>} path="/" exact />
        <Route element={<ContactEdit/>} path='/contact/:id' />
      </Routes>
    </BrowserRouter>
  )
}

export default App;