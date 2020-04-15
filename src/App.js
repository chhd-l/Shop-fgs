import React from 'react';
import './App.css';
import Home from '@/views/Home';
import List from '@/views/List';
import Details from '@/views/Details';
import Buy from '@/views/Buy';
import Cart from '@/views/Cart'
import '@/assets/css/global.css'

function App () {
  return (
    <div className="App">
      {/* <Home /> */}
      <List />
      {/* <Details /> */}
      {/* <Buy /> */}
      {/* <Cart/> */}
    </div>
  );
}

export default App;
