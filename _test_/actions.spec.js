import { fetchPostsRequest, fetchPostsSuccess, fetchPostsError, filterSuccess } from '../src/actions/actions.js'

const success = ['fake data'];
const filteredSuccess = ['fake data'];
const keyword = 'eryi';
const filterType = 'author';
const error = 'error';

describe('Test actions', () => {

  it('fetchPostsRequest action', () => {
    expect(fetchPostsRequest()).toEqual({
      type: "FETCH_REQUEST",
    })
  })

  it('fetchPostsSuccess action', () => {
    expect(fetchPostsSuccess(success, filteredSuccess)).toEqual({
      type: "FETCH_SUCCESS",
      success, 
      filteredSuccess
    })
  })

  it('fetchPostsError action', () => {
    expect(fetchPostsError(error)).toEqual({
      type: "FETCH_ERROR",
      error
    })
  })

  it('filterSuccess action', () => {
    expect(filterSuccess(keyword, filterType)).toEqual({
      type: "FILTER_SUCCESS",
      keyword, 
      filterType
    })
  })
})
