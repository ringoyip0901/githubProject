import React from 'react';
import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ConnectedContainer, { MainContainer } from '../src/containers/MainContainer.js';
import { Display } from '../src/components/Display.js';
import { Frame } from '../src/components/children/Table.js';
import { fetchPostsRequest, fetchPostsSuccess, fetchPostsError, filterSuccess } from '../src/actions/actions.js'
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

configure({ adapter: new Adapter() });

describe('Shallow Render Dumb Components', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Display />)
  })

  it ('Display Component renders without crashing', () => {
  expect(wrapper.length).toEqual(1);
  })

  it ('Display contains div="display"', () => {
    expect(wrapper.find('div#display').type()).toEqual('div')
  })
})


describe('Shallow And Passing the {store} properly', () => {
  const initialState = {issues: true, backup: true};
  const mockStore = configureStore();

  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<ConnectedContainer store={store} />);
  })

  it ('The store is connected to the Smart component', () => {
    expect(container.length).toEqual(1);
  })

  it('Prop matches with initialState', () => {
    expect(container.prop('issues')).toEqual(initialState.issues);
  })
})

describe('Shallow And wrapping in the Provider', () => {
  const initialState = {issues: true, backup: true};
  const mockStore = configureStore();

  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<Provider store={store}><ConnectedContainer issues={initialState.issues}/></Provider>);
  })

  it('Provider is rendering the smart component property', () => {
    expect(wrapper.find(ConnectedContainer).length).toEqual(1);
  })

  it('Prop matches with initialState', () => {
    expect(wrapper.find(ConnectedContainer).prop('issues')).toEqual(initialState.issues);
  })

  it('check action on dispatching', () => {
    let action;
    store.dispatch(fetchPostsRequest());
    store.dispatch(fetchPostsSuccess());
    store.dispatch(fetchPostsError());
    store.dispatch(filterSuccess());
    action = store.getActions();
    expect(action[0].type).toBe('FETCH_REQUEST');
    expect(action[1].type).toBe('FETCH_SUCCESS');
    expect(action[2].type).toBe('FETCH_ERROR');
    expect(action[3].type).toBe('FILTER_SUCCESS');
  })
})