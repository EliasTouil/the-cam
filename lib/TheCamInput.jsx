'use strict'

import asleep from 'asleep'
import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { unlessProduction } from 'the-check'
import { changedProps, eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheMedia } from 'the-media'
import { TheSpin } from 'the-spin'

/**
 * Embed camera component
 */
class TheCamInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
  }

  componentDidUpdate (prevPros) {
  }

  componentWillUnmount () {
  }

  render () {
    const { props, state } = this
    const {
      children,
      className,
    } = props
    return (
      <div {...htmlAttributesFor(props, { except: ['className'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={c('the-cam', className)}
      >
        {children}
      </div>
    )
  }
}

TheCamInput.propTypes = {}

TheCamInput.defaultProps = {}

TheCamInput.displayName = 'TheCamInput'

export default TheCamInput
