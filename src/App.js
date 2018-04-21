import React, { Component } from 'react';
import Board from './game/board'
import Dialogue from './game/dialogue'
import './App.css';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      updatingBoard:false
    }
  }

  handleExpress = () => {
    this.setState({ allSet: true , width:8,height:10})
  }

  handleDialogueField = (e)=>{
    this.setState({updatingBoard:true})
    console.log(e.target.name)
    if (!isNaN(e.target.value)){
      this.setState({[e.target.name]:e.target.value})
    }
    setTimeout(()=>{
      this.setState({updatingBoard:false})
    },100)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Red Penguins Chop Blue Penguins Game</h1>
        </header>
        <div >
          {
            !this.state.allSet ?
              <Dialogue handleDialogueField={this.handleDialogueField} width={8} height={10} handleExpress={this.handleExpress} />
              : null
          }
        </div>
        <div onKeyDown={this.playGame}>
          {
            !this.state.updatingBoard?
            <Board width={this.state.width} height={this.state.height} />:
            <p>Regenerating...</p>
          }
        </div>
      </div>
    );
  }
}

export default App;
