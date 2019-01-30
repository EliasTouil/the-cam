'use strict'

import { asStyleData, colorAlpha } from 'the-component-util'

function CamInputStyleData ({
                              shutterSize = 44,
                            }) {
  return asStyleData({
    '.the-cam-input': {
      position: 'relative',

    },
    '.the-cam-input-action': {
      alignItems: 'center',
      background: 'transparent',
      bottom: 0,
      boxSizing: 'border-box',
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      padding: '4px',
      position: 'absolute',
      right: 0,
      width: '100%',
    },
    '.the-cam-input-clear': {
      alignItems: 'center',
      background: 'rgba(255,255,255,0.1)',
      borderRadius: '4px',
      boxSizing: 'border-box',
      color: '#888',
      display: 'inline-flex',
      height: '44px',
      justifyContent: 'center',
      padding: '8px',
      position: 'absolute',
      right: '4px',
      top: '4px',
      width: '44px',
    },
    '.the-cam-input-preview': {
      alignItems: 'center',
      background: '#F0F0F0',
      display: 'flex',
      justifyContent: 'center',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
    '.the-cam-input-preview-img': {
      height: '100%',
      objectFit: 'contain',
      width: '100%',
    },
    '.the-cam-input-shutter': {
      background: '#FFF',
      border: '2px solid #F0F0F0',
      borderRadius: '50%',
      boxSizing: 'border-box',
      cursor: 'pointer',
      height: shutterSize,
      width: shutterSize,
    },
  })
}

export default CamInputStyleData
