import React, { Component } from 'react';
import Board from './game/board'
import './App.css';

function randomNos(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Red Penguins eat Blue Penguins Game</h1>
        </header>
        <div onKeyDown={this.playGame}>
          <Board/>
        </div>
      </div>
    );
  }
}

export default App;
