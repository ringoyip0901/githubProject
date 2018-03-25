import React from 'react'
import { shallow, mount, render } from 'enzyme';

import reducer from '../src/reducers/reducers';

const initialState = {
  issues: true, 
  backup: true,
}

const success = ['fake data'];
const filteredSuccess = ['fake data'];
const error = 'error';

describe('Test Reducer', () => {
  it ('reducer for FETCH_REQUEST', () => {
    let state = {};
    state = reducer(initialState, {type: 'FETCH_REQUEST'});
    expect(state).toEqual(initialState);
  });

  it('reducer for FETCH_SUCCESS, ()', () => {
    let state = initialState;
    state = reducer(initialState, {type: 'FETCH_SUCCESS'});
    expect(state.issues).not.toBe(initialState.issues)
  })

  it ('reducer for FETCH_ERROR', () => {
    let state = initialState;
    console.log(state);
    state = reducer(initialState, {type: 'FETCH_ERROR'});
    expect(state).toEqual(error);
  });
})
