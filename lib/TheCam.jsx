'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor } from 'the-component-util'
import { TheMedia } from 'the-media'
import { TheSpin } from 'the-spin'

/**
 * Embed camera component
 */
class TheCam extends React.Component {
  constructor (props) {
    super(props)
    this.videoRef = React.createRef()

    const { audio, video } = props
    this.media = new TheMedia({ audio, video })
    this.state = {
      busy: false,
      rejected: false,
      running: true,
    }
  }

  componentDidMount () {
    void this.applyEnabled(!this.props.disabled)
  }

  componentDidUpdate (prevPros) {
    const { disabled } = this.props
    if (disabled !== prevPros.disabled) {
      void this.applyEnabled(!disabled)
    }
  }

  componentWillUnmount () {
    if (this.state.running) {
      void this.stop()
    }
  }

  render () {
    const { props, state } = this
    const {
      children,
      className,
      height,
      rejectedMessage,
      width,
    } = props
    const { busy, rejected } = state
    return (
      <div {...htmlAttributesFor(props, { except: ['className'] })}
           {...eventHandlersFor(props, { except: [] })}
           className={c('the-cam', className)}
      >
        <div className='the-cam-inner'
             style={{ height, width }}
        >
          {busy && (
            <TheSpin className='the-cam-spin'
                     cover
                     enabled
            />)
          }
          {rejected ? (
            <div className='the-cam-rejected'>
              {rejectedMessage}
            </div>
          ) : (
            <React.Fragment>
              <video autoPlay
                     className='the-cam-video'
                     playsInline
                     ref={this.videoRef}
              />
              {children}
            </React.Fragment>
          )}
        </div>
      </div>
    )
  }

  async applyEnabled (enabled) {
    if (enabled) {
      await this.start()
    } else {
      await this.stop()
    }
  }

  async start () {
    const { media } = this
    this.setState({ busy: true })
    try {
      await media.start()
    } catch (e) {
      this.setState({ busy: false, rejected: true, running: false })
      throw e
    }
    const video = this.videoRef.current
    await media.bindVideo(video, {})
    this.setState({ busy: false, rejected: false, running: true })

    // Call backs
    {
      const { stream } = media
      const { onStart, onStream } = this.props
      onStream && onStream(stream)
      onStart && onStart({ cam: this, stream, video })
    }
  }

  async stop () {
    const video = this.videoRef.current
    const { media } = this
    try {
      await media.stop()
    } catch (e) {
      // Do nothing
    }
    video.srcObject = null
    this.setState({ busy: false, rejected: false, running: false })

    // Callbacks
    {
      const { stream } = media
      const { onStop } = this.props
      onStop && onStop({ cam: this, stream, video })
    }
  }
}

TheCam.propTypes = {
  /** Audio media constraint */
  audio: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  /** Camera disabled */
  disabled: PropTypes.bool,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /** Handle for stream */
  onStream: PropTypes.func,
  /** Message to show when camera access rejected */
  rejectedMessage: PropTypes.node,
  /** Video media constraint */
  video: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TheCam.defaultProps = {
  audio: false,
  disabled: false,
  height: 150,
  onStream: null,
  rejectedMessage: 'Failed to access camera',
  video: true,
  width: '100%',
}

TheCam.displayName = 'TheCam'

export default TheCam
