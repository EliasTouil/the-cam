'use strict'

import React from 'react'
import { TheCam, TheCamStyle } from 'the-cam'
import { TheSpinStyle } from 'the-spin'

class ExampleComponent extends React.Component {
  state = {
    disabled: false,
  }
  start = () => {
    this.setState({ disabled: false })
  }
  stop = () => {
    this.setState({ disabled: true })
  }

  render () {
    return (
      <div>
        <TheCamStyle/>
        <TheSpinStyle/>
        <TheCam onStrat={() => console.log('camera started')}
                onStop={() => console.log('camera stopped')}
                disabled={this.state.disabled}
        >
        </TheCam>

        <br/>
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
      </div>

    )
  }
}

export default ExampleComponent
