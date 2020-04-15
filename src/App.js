import React from 'react';
import './App.css';
import Home from './views/Home';
import List from './views/List/List';
import Details from './views/Details';
import Buy from './views/Buy';
import './assets/css/global.css'

function App () {
  return (
    <div className="App">
      {/* <Home /> */}
      <List />
      {/* <Details /> */}
      {/* <Buy /> */}
    </div>
  );
}

export default App;
