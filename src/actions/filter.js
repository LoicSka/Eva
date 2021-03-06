import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys, camelize } from 'humps'
import {values, keys} from 'lodash'

export const FETCH_TUTOR_ACCOUNTS_REQUEST = 'FETCH_TUTOR_ACCOUNTS'
export const FETCH_TUTOR_ACCOUNTS_SUCCESS = 'FETCH_TUTOR_ACCOUNTS_SUCCESS'
export const FETCH_TUTOR_ACCOUNTS_FAILURE = 'FETCH_TUTOR_ACCOUNTS_FAILURE'
export const SET_FILTERS = 'SET_FILTERS'
export const CLEAR_FILTERS = 'CLEAR_FILTERS'

export const REMOVE_FILTER_REQUEST = 'REMOVE_FILTER_REQUEST'
export const REMOVE_FILTER_SUCCESS = 'REMOVE_FILTER_SUCCESS'
export const REMOVE_FILTER_FAILURE = 'REMOVE_FILTER_FAILURE'

const fetchTutorAccounts = (pageNumber, filters) => ({
  pageNumber,
  filterKey: filters ? camelize(values(keys(filters).sort().reduce((r, k) => (r[k] = filters[k], r), {})).join('')) : 'All',
  [CALL_API]: {
    types: [FETCH_TUTOR_ACCOUNTS_REQUEST, FETCH_TUTOR_ACCOUNTS_SUCCESS, FETCH_TUTOR_ACCOUNTS_SUCCESS],
    endpoint: `tutor_accounts`,
    data: decamelizeKeys(filters),
    schema: Schemas.TUTOR_ACCOUNT_ARRAY
  }
})

export const loadTutorAccounts = (filters = null, pageNumber = 1) => (dispatch, getState) => {
  const {
    filter
  } = getState()

  dispatch({
    type: SET_FILTERS,
    filters: filters ? filters : {}
  })
  
  dispatch(fetchTutorAccounts(filter.nextPage, filters))
}

export const clearFilters = () => (dispatch) => {
  dispatch({
    type: CLEAR_FILTERS
  })
}

export const setFilters = (filters) => (dispatch, getState) => {
  dispatch({
    type: SET_FILTERS,
    filters: filters ? filters : {}
  })
}