import React from 'react';
import './App.css';
import Game from './game/Game';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="col-md-12"></div>
        <h1>Life of PiBS</h1>
        <Game/>
      </header>
    </div>
  );
}

export default App;