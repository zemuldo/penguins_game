import React, { Component } from 'react';
import './App.css';

function randomNos(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width || 10,
      height: this.props.height || 10,
      selected: {
        width: 0,
        height: 0
      },
      board: [],
      unchopped:{},
      chopped: {},
      playW:5,
      playH:5
    }
  }

  createBordNumbers = () => {
    return new Promise((resolve, reject) => {
      let rows = []
      for (let i = 0; i < this.state.width; i++) {
        let row = []
        let playList = {}
        let toshow = randomNos(0, this.state.width - 1)

        for (let x = 0; x < toshow; x++) { playList[randomNos(0, this.state.width - 1)] = true }

        for (let j = 0; j < this.state.width; j++) {
          this.setState(prevState => ({
            unchopped: {
                ...prevState.unchopped,
                [`${i}-${j}`]: true
            }
        }))
          row.push({ key: `${i}-${j}`, show: !!playList[j] })
        }
        rows.push(row)
      }
      resolve(rows)
    })
      .then(o => {
        this.setState({ board: o })
      })
      .catch(e => {
        console.log(e)
      })

  }
  componentDidMount() {
    this.createBordNumbers()
    document.addEventListener("keydown", this.playGame, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.playGame, false);
  }
  playGame = (e) => {
    if (e.key === 38 || e.key === 'ArrowUp') {
      if(this.state.playW===0){
        return false
      }
      this.setState({playW:this.state.playW-1})
      this.setState(prevState => ({
        chopped: {
            ...prevState.chopped,
            [`${this.state.playW}-${this.state.playH}`]: true
        }
    }))
    this.setState(prevState => ({
      unchopped: delete prevState.unchopped[`${this.state.playW}-${this.state.playH}`]
  }))
    
    } else if (e.key === 40 || e.key === 'ArrowDown') {
      if(this.state.playW===this.state.width-1){
        return false
      }
      this.setState({playW:this.state.playW+1})
      this.setState(prevState => ({
        chopped: {
            ...prevState.chopped,
            [`${this.state.playW}-${this.state.playH}`]: true
        }
    }))
    }
    else if (e.key === 37 || e.key === 'ArrowLeft') {
      if(this.state.playH===0){
        return false
      }
      this.setState({playH:this.state.playH-1})
      this.setState(prevState => ({
        chopped: {
            ...prevState.chopped,
            [`${this.state.playW}-${this.state.playH}`]: true
        }
    }))
    }
    else if (e.key === 39 || e.key === 'ArrowRight') {
      if(this.state.playH===this.state.width-1){
        return false
      }
      this.setState({playH:this.state.playH+1})
      this.setState(prevState => ({
        chopped: {
            ...prevState.chopped,
            [`${this.state.playW}-${this.state.playH}`]: true
        }
    }))
    }
  }
  getRandom = () => {
    randomNos(0, this.state.width)
    randomNos(0, this.state.height)
    this.setState({
      selected: {
        width: randomNos(0, this.state.width),
        height: randomNos(0, this.state.height)
      }
    })
  }

  render() {
    let board = this.state.board.map((row, i) => {
      return <div>
        {
          row.map((field, i) => {
            return <span className={'bord-box'} >
              
              {
                field.key ===`${this.state.playW}-${this.state.playH}`?
                <i className="fa fa-linux" style={{ fontSize: '48px', color: 'red' }}></i>
                :field.show && !this.state.chopped[field.key] ?
                <i className="fa fa-linux" style={{ fontSize: '48px', color: 'blue' }}></i>
                :
                <i className="fa fa-linux" style={{ fontSize: '48px', color: 'white' }}></i>}</span>
          })
        }
      </div>
    })
    return (
      <div className="App">
      <p>{`${Object.keys(this.state.unchopped).length} Penguins to chop today`}</p>
        <div className={'board'} onKeyDown={this.playGame}>
          {board}
        </div>
      </div>
    );
  }
}

export default App;
