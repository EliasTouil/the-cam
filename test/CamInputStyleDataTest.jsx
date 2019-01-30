/**
 * Test for CamInputStyleData.
 * Runs with mocha.
 */
'use strict'

import CamInputStyleData from '../lib/styleData/CamInputStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('cam-input-style-data', () => {
  before(() => {
  })

  after(() => {
  })

  it('Render a component', () => {
    let element = render(
       <CamInputStyleData />
    )
    ok(element)
  })
})

/* global describe, before, after, it */
