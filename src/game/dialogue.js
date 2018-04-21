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
                        {
                            this.props.error.mess?
                            <p className='error'>{this.props.error.mess}</p>:
                            null
                        }
                    </div>
                    <br />
                    <button>Continue</button>{` `}<button onClick={this.props.handleExpress}>Express</button>
                </div>
            </div>
        );
    }
}

export default Dialogue;