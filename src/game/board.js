import React, { Component } from 'react';
import {randomNo} from '../util'
import './board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width>100?100:this.props.width || 10,
      height: this.props.height>100?100:this.props.height || 10,
      selected: {
        width: 0,
        height: 0
      },
      board: [],
      unchopped: {},
      chopped: {},
      playW: randomNo(0, this.props.width - 1 || 9),
      playH: randomNo(0, this.props.height - 1 || 9),
    }
  }

  createBord = () => {
    let playList = {}
    this.setState(prevState => ({
      chopped: {
        ...prevState.chopped,
        [`${this.state.playW}-${this.state.playH}`]: true
      }
    }))
    return new Promise((resolve, reject) => {
      for (let x = 0; x < this.state.height; x++) {
        playList[`${randomNo(0, this.state.width - 1)}-${x}`] = true
      }
      for (let x = 0; x < this.state.width; x++) {
        playList[`${randomNo(0, this.state.width - 1)}-${x}`] = true
      }

      resolve(playList)
    })
      .then(o => {
        let rows = []
        for (let i = 0; i < this.state.width; i++) {
          let row = []

          for (let j = 0; j < this.state.height; j++) {
            row.push({ key: `${i}-${j}`, show: !!playList[`${j}-${i}`] })
          }
          rows.push(row)
        }
        return rows
      })
      .then(o => {
        this.setState({ board: o })
        this.setState({ unchopped: playList })
      })
      .catch(e => {
      })

  }
  componentDidMount() {
    this.createBord()
    document.addEventListener("keydown", this.handlePlayGame, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handlePlayGame, false);
  }
  handlePlayGame = (e) => {
    // Handle Move Up
    if (e.key === 38 || e.key === 'ArrowUp') {
      if (this.state.playW === 0) {
        return false
      }
      this.setState({ playW: this.state.playW - 1 })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [`${this.state.playW}-${this.state.playH}`]: true
        }
      }))
    }
    // Handle Move Down
    else if (e.key === 40 || e.key === 'ArrowDown') {
      if (this.state.playW === this.state.width - 1) {
        return false
      }
      this.setState({ playW: this.state.playW + 1 })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [`${this.state.playW}-${this.state.playH}`]: true
        }
      }))
    }
    // Handle Move Left
    else if (e.key === 37 || e.key === 'ArrowLeft') {
      if (this.state.playH === 0) {
        return false
      }

      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [`${this.state.playW}-${this.state.playH}`]: true
        }
      }))
      this.setState({ playH: this.state.playH - 1 })
    }
    // Handle Move Right
    else if (e.key === 39 || e.key === 'ArrowRight') {
      if (this.state.playH === this.state.height - 1) {
        return false
      }

      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [`${this.state.playW}-${this.state.playH}`]: true
        }
      }))
      this.setState({ playH: this.state.playH + 1 })
    }

    if (this.state.unchopped[`${this.state.playW}-${this.state.playH}`]) {
      let unchopped = this.state.unchopped
      delete unchopped[`${this.state.playW}-${this.state.playH}`]
      this.setState({
        unchopped: unchopped
      })
    }

  }

  render() {
      let minBordW = this.state.width*50
      let minBordH = this.state.height*50
    let board = this.state.board.map((row, i) => {
      return <div className={'board-row'} key={i}>
        {
          row.map((field, i) => {
            return <span key={field.key} className={'bord-box'} >

              {
                field.key === `${this.state.playW}-${this.state.playH}` ?
                  <i className="fa fa-linux" style={{ fontSize: '48px', color: 'red' }}></i>
                  : this.state.unchopped[field.key] && field.key !== `${this.state.playW}-${this.state.playH}` && !this.state.chopped[field.key] ?
                    <i className="fa fa-linux" style={{ fontSize: '48px', color: 'blue' }}></i>
                    :
                    <i className="fa fa-linux" style={{ fontSize: '48px', color: 'white' }}></i>}</span>
          })
        }
      </div>
    })
    return (
      <div >
        <p>{`${Object.keys(this.state.unchopped).length} Penguins to chop`}</p>
        <div className={'board'} onKeyDown={this.playGame}>
          {board}
        </div>
      </div>
    );
  }
}

export default Board;
