import React, { Component } from 'react';

class Dialogue extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            < div onClick={this.props.securechange ? null : this.props.handleClose} className="zmodal">

                <div className="zmodal-content">
                    <h2>Welcome to Red penguins chop Blue Penguins.</h2>

                    <h3>Please enter a desired size of your play board</h3>
                    <p>Click on express to use the default Board size</p>
                    <div>
                        <span>
                            {`Width of Bord: `}
                        </span> {` `}
                        <input
                            onChange={this.props.handleDialogueField}
                            name={'width'}
                            defaultValue={this.props.width} type='text'
                            placeholder='Desired Width'
                        />
                        {` `}
                        <input
                            onChange={this.props.handleDialogueField}
                            name={'height'}
                            defaultValue={this.props.height} type='text'
                            placeholder='Desired height'
                        />
                        {` `}
                        <select value={this.props.gooPenguin} onChange={this.props.handlePenguinColors} name='goodPenguin'>
                            <option value='red'>Red</option>
                            <option value='green'>Green</option>
                            <option value='orange'>Orange</option>
                            <option value='cyan'>Cyan</option>
                            <option value='black'>Black</option>
                            <option value='yellow'>Yellow</option>
                            <option value='pink'>Pink</option>
                            <option value='violet'>Violet</option>
                            <option value='blue'>Blue</option>
                        </select>
                        {` `}
                        <select value={this.props.badPenguin} onChange={this.props.handlePenguinColors} name='badPenguin'>
                            <option value='red'>Red</option>
                            <option value='green'>Green</option>
                            <option value='orange'>Orange</option>
                            <option value='cyan'>Cyan</option>
                            <option value='black'>Black</option>
                            <option value='yellow'>Yellow</option>
                            <option value='pink'>Pink</option>
                            <option value='violet'>Violet</option>
                        </select>
                        {
                            this.props.error.mess ?
                                <p className='error'>{this.props.error.mess}</p> :
                                null
                        }
                    </div>
                    <br />
                    <button>Continue</button>{` `}<button onClick={this.props.handleExpress}>Play</button>
                </div>
            </div>
        );
    }
}

export default Dialogue;