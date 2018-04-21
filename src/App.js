import React, { Component } from 'react';
import Board from './game/board'
import Dialogue from './game/dialogue'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatingBoard: false,
      error: {}
    }
  }

  handleExpress = () => {
    this.setState({ allSet: true, width: 8, height: 10 })
  }

  handleDialogueField = (e) => {

    if (!isNaN(e.target.value)) {

      if (e.target.value > 30) {
        this.onError({ mess: `Please enter a value less than 30 for ${e.target.name}` })

      }
      else this.setState({ updatingBoard: true })
      this.setState({ [e.target.name]: e.target.value > 30 ? 30 : e.target.value })
    }
    else {
      this.onError({ mess: `Please enter a number for for ${e.target.name}` })
    }
    setTimeout(() => {
      this.setState({ updatingBoard: false })
    }, 100)
  }

  handleReset = () => {
    this.setState({ updatingBoard: true })
    setTimeout(() => {
      this.setState({ updatingBoard: false })
    }, 1)
  }

  onError = (error) => {
    this.setState({ error: error })
    setTimeout(() => {
      this.setState({ error: {} })
    }, 5000)
  }

  changeSettings = () => {
    this.setState({ allSet: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Red Penguins Chop Blue Penguins Game</h1>
        </header>
        <button onClick={this.changeSettings}>Change Settings</button>{``} <button onClick={this.handleReset}>Reset</button>
        <div >
          {
            !this.state.allSet ?
              <Dialogue error={this.state.error} onError={this.onError} handleDialogueField={this.handleDialogueField} width={8} height={10} handleExpress={this.handleExpress} />
              : null
          }
        </div>
        <div onKeyDown={this.playGame}>
          {
            !this.state.updatingBoard ?
              <Board width={this.state.width} height={this.state.height} /> :
              <p>Regenerating...</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
