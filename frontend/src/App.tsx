import * as React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './components/Home';


const App = () =>
  <BrowserRouter basename="/">
    <Routes>
      <Route path='/' element={<Home />}></Route>
    </Routes>
  </BrowserRouter>

export default App;