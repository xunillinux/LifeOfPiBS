import React from 'react';
import './App.css';
import Game from './game/Game';
import { Navbar } from 'react-bootstrap';
import Logo from './game/images/logo.jpg';

function App() {
  return (
    <div className="App">
      
      <header>
        <script src="https://unpkg.com/react/umd/react.production.min.js" crossOrigin="anonymous"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js" crossOrigin="anonymous"></script>
        <script src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js" crossOrigin="anonymous"></script>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"/>
      </header>

      <div id="content">

        <Navbar className="navbar" bg="dark" variant="dark">
          <Navbar.Brand>
            <img alt="logo" src={Logo} width="30" height="30" className="d-inline-block align-top"/>
            <strong>Life of PiBS</strong>
          </Navbar.Brand>
        </Navbar>

        <div id="gameContent">

            <Game/>

        </div>

      </div>

    </div>
  );
}

export default App;
