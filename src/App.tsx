import React from 'react';
import './App.css';
import GameCanvas from './game/Gamecanvas';
import Controls from './game/Controls';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Life of PiBS</h1>
        <GameCanvas/>
      </header>
    </div>
  );
}

export default App;
