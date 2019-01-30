/**
 * Test for CamStyleData.
 * Runs with mocha.
 */
'use strict'

import CamInputStyleData from '../lib/styleData/CamStyleData'
import React from 'react'
import { ok, equal } from 'assert'
import { render } from 'the-script-test'

describe('cam-style-data', () => {
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
