import React, { Component } from 'react';
import { randomNo } from '../util'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as StoreActions from '../store/actions/store'
import './board.css'

class Board extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: this.props.width > 100 ? 100 : this.props.width || 10,
      height: this.props.height > 100 ? 100 : this.props.height || 10,
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

  evilPenguin = ()=>{
    return setInterval(()=>{
      
      if(this.state.evil){
        const newUnchopped = this.state.unchopped
        delete newUnchopped[this.state.evil]
        this.setState({unchopped: newUnchopped, evil:null })
      } 
      else {
        const newEvil = [randomNo(0, this.state.width - 1), randomNo(0, this.state.width - 1)]
        this.setState({evil: `${newEvil[0]}-${newEvil[1]}`})
        this.setState({unchopped: {...this.state.unchopped, [`${newEvil[0]}-${newEvil[1]}`]: true} })
      }
    }, randomNo(5, this.props.width - 1 || 9)*1000)
  }

  createBord = () => {
    const evil = [randomNo(0, this.state.width - 1), randomNo(0, this.state.width - 1)]
    this.runEvilPenguin =  this.evilPenguin()
    this.setState({evil: `${evil[0]}-${evil[1]}`})
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
            if (i === evil[0] && j === evil[1]) row.push({ key: `${i}-${j}`, show: !!playList[`${j}-${i}`], evil: true })
            else row.push({ key: `${i}-${j}`, show: !!playList[`${j}-${i}`] })
          }
          rows.push(row)
        }
        return rows
      })
      .then(o => {
        this.setState({ board: o })
        this.setState({ unchopped: { ...playList, [`${evil[0]}-${evil[1]}`]: true } })
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
  addScore = (position)=>{
    if(this.state.evil===position) return 100
    else return 1
  }
  handlePlayGame = (e) => {
    let position;
    // Handle Move Up
    if (e.key === 38 || e.key === 'ArrowUp') {
      if (this.props.store.playW === 0) {
        return false
      }
      position = `${this.props.store.playW-1}-${this.props.store.playH}`
      this.props.storeActions.updateStore({
        playW: this.props.store.playW - 1
      })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [position]: true
        }
      }))
    }
    // Handle Move Down
    else if (e.key === 40 || e.key === 'ArrowDown') {
      if (this.props.store.playW === this.state.width - 1) {
        return false
      }
      position = `${this.props.store.playW+1}-${this.props.store.playH}`
      this.props.storeActions.updateStore({
        playW: this.props.store.playW + 1
      })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [position]: true
        }
      }))
    }
    // Handle Move Left
    else if (e.key === 37 || e.key === 'ArrowLeft') {
      if (this.props.store.playH === 0) {
        return false
      }
      position = `${this.props.store.playW}-${this.props.store.playH-1}`
      this.props.storeActions.updateStore({
        playH: this.props.store.playH - 1
      })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [position]: true
        }
      }))

    }
    // Handle Move Right
    else if (e.key === 39 || e.key === 'ArrowRight') {
      if (this.props.store.playH === this.state.height - 1) {
        return false
      }
      position = `${this.props.store.playW}-${this.props.store.playH+1}`
      this.props.storeActions.updateStore({
        playH: this.props.store.playH + 1
      })
      this.setState(prevState => ({
        chopped: {
          ...prevState.chopped,
          [position]: true
        }
      }))
    }
    if (this.state.unchopped[position] || position === this.state.evil) {
      
      let unchopped = this.state.unchopped
      delete unchopped[position]
      this.setState({
        unchopped: unchopped
      })
      this.props.storeActions.updateStore({
        chopped: this.props.store.chopped + 1
      })

      if(position === this.state.evil) {
        this.props.storeActions.updateStore({
          chopped: this.props.store.chopped + 100
        })
        this.setState({evil: null})
      }
    }
    this.runUpdateBoard = this.updateBoard(position)
    this.runReinitGame = this.reinitGame()
    

  }

  updateBoard = (position)=>{
    return setTimeout(() => {
      if (this.state.unchopped[position]) {
        let unchopped = this.state.unchopped
        delete unchopped[position]
        this.setState({
          unchopped: unchopped
        })
        this.props.storeActions.updateStore({
          chopped: this.props.store.chopped + 1
        })
      }
    }, 40)
  }

  reinitGame = ()=>{
    return setTimeout(() => {
      this.reinitGame()
    }, 30)
  }

  componentWillMount(){
    clearInterval(this.runEvilPenguin)
    clearTimeout(this.runUpdateBoard)
    clearTimeout(this.runReinitGame)
  }

  reinitGame = () => {
    clearInterval(this.runEvilPenguin)
    if (Object.keys(this.state.unchopped).length === 0) {
      this.setState({
        board: [],
        unchopped: {},
        chopped: {}
      })
      this.props.storeActions.updateStore({
        played: this.props.store.played + 1
      })
      this.createBord()
    }
  }

  render() {
    const position = `${this.props.store.playW}-${this.props.store.playH}`
    let board = this.state.board.map((row, i) => {
      return <div className={'board-row'} key={i}>
        {
          row.map((field, i) => {
            return <span style={field.key === position ? { border: '2px solid red' } : { border: '2px solid black' }} key={field.key} className={'bord-box'} >
              <span className='board-box-body'>

                {
                  field.key !== position && this.state.evil === field.key ? <i className="fa fa-linux" style={{ fontSize: '48px', color: 'yellow' }}></i> :
                    field.key === position ?
                      <i className="fa fa-linux" style={{ fontSize: '48px', color: `${this.props.badPenguin}` }}></i>
                      : this.state.unchopped[field.key] && field.key !== position && !this.state.chopped[field.key] ?
                        <i className="fa fa-linux" style={{ fontSize: '48px', color: `${this.props.goodPenguin}` }}></i>
                        :
                        <i className="fa fa-linux" style={{ fontSize: '48px', color: 'white' }}></i>}
              </span>
            </span>
          })
        }
      </div>
    })
    return (
      <div >
        <div className='pad' style={{ float: 'left', position: 'absolute', top: '0' }} >
          <h2>Play Pad</h2>
          <p>Click to move or</p>
          <p>Use keyboard Arrow keys</p>
          <i onClick={() => this.handlePlayGame({ target: { name: 'playH' }, key: 'ArrowUp' })} className="fa fa-caret-up" style={{ fontSize: '48px', color: `green` }}></i><br />
          <i onClick={() => this.handlePlayGame({ target: { name: 'playW' }, key: 'ArrowLeft' })} className="fa fa-caret-left" style={{ fontSize: '48px', color: `blue` }}></i><span style={{ color: 'white' }} >{` Play Kit Sec`}</span>
          <i onClick={() => this.handlePlayGame({ target: { name: 'playW' }, key: 'ArrowRight' })} className="fa fa-caret-right" style={{ fontSize: '48px', color: `blue` }}></i><br />
          <i onClick={() => this.handlePlayGame({ target: { name: 'playH' }, key: 'ArrowDown' })} className="fa fa-caret-down" style={{ fontSize: '48px', color: `green` }}></i>
        </div>
        <p>{`${Object.keys(this.state.unchopped).length} Penguins to chop`}</p>
        <div onKeyDown={this.playGame}>
          <div className={'board'}>
            {board}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    store: state.store
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    storeActions: bindActionCreators(StoreActions, dispatch),
  }
}

Board.propTypes = {
  store: PropTypes.object.isRequired
}
export default connect(mapStateToProps, mapDispatchToProps)(Board)