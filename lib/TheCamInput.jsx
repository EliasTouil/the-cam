'use strict'

import c from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { eventHandlersFor, htmlAttributesFor, newId, readFileAsDataURL } from 'the-component-util'
import { TheIcon } from 'the-icon'
import { get } from 'the-window'
import TheCam from './TheCam'

/**
 * Embed camera component
 */
class TheCamInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleShutter = this.handleShutter.bind(this)
    this.handleMedia = this.handleMedia.bind(this)
    this.handleClear = this.handleClear.bind(this)
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
      audio,
      children,
      className,
      height,
      onReject,
      value,
      video,
      width,
    } = props
    const hasValue = !!value
    return (
      <div {...htmlAttributesFor(props, {
        except: [
          'className',
          'width',
          'height',
          'value',
        ],
      })}
           {...eventHandlersFor(props, { except: [] })}
           className={c('the-cam-input', className)}
           style={{ height, width }}
      >
        <TheCam {...{
          audio,
          height,
          onReject,
          video,
          width,
        }}
                enabled={!hasValue}
                onMedia={this.handleMedia}
        />
        {
          hasValue && (
            <div className='the-cam-input-preview'>
              <img alt='captured image'
                   className='the-cam-input-preview-img'
                   src={value}
                   style={{ height, width }}
              />
              <a className='the-cam-input-clear'
                 onClick={this.handleClear}
              >
                <TheIcon className={TheCam.CLEAR_ICON}/>
              </a>
            </div>
          )
        }
        {
          !hasValue && (
            <div className='the-cam-input-action'>
              <a className='the-cam-input-shutter'
                 onClick={this.handleShutter}
              >
              </a>
            </div>
          )
        }
      </div>
    )
  }

  async handleClear () {
    const { name, onUpdate } = this.props
    onUpdate({ [name]: null })
  }

  async handleMedia (media) {
    this.media = media
  }

  async handleShutter () {
    const { media, props } = this
    const { convertFile, name, onUpdate } = props
    const File = get('File', { strict: true })
    const blob = await media.takePhoto({})
    const file = await convertFile(new File([blob], newId({ prefix: 'the-cam-input-value' })))
    onUpdate({ [name]: file })
  }
}

TheCamInput.propTypes = {
  audio: TheCam.propTypes.audio,
  convertFile: PropTypes.func,
  height: TheCam.propTypes.height,
  onReject: PropTypes.func,
  onUpdate: PropTypes.func,
  video: TheCam.propTypes.video,
  width: TheCam.propTypes.width,
}

TheCamInput.defaultProps = {
  audio: TheCam.defaultProps.audio,
  convertFile: (file) => readFileAsDataURL(file),
  height: TheCam.defaultProps.height,
  onReject: null,
  onUpdate: null,
  value: null,
  video: TheCam.defaultProps.video,
  width: TheCam.defaultProps.width,
}

TheCam.CLEAR_ICON = 'fas fa-times'
TheCamInput.displayName = 'TheCamInput'

export default TheCamInput
