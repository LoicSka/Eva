import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys } from 'humps'

export const FETCH_TUTOR_ACCOUNTS_REQUEST = 'FETCH_TUTOR_ACCOUNTS'
export const FETCH_TUTOR_ACCOUNTS_SUCCESS = 'FETCH_TUTOR_ACCOUNTS_SUCCESS'
export const FETCH_TUTOR_ACCOUNTS_FAILURE = 'FETCH_TUTOR_ACCOUNTS_FAILURE'
export const SET_FILTERS = 'SET_FILTERS'

export const REMOVE_FILTER_REQUEST = 'REMOVE_FILTER_REQUEST'
export const REMOVE_FILTER_SUCCESS = 'REMOVE_FILTER_SUCCESS'
export const REMOVE_FILTER_FAILURE = 'REMOVE_FILTER_FAILURE'

const fetchTutorAccounts = (pageNumber, filters) => ({
  pageNumber,
  [CALL_API]: {
    types: [FETCH_TUTOR_ACCOUNTS_REQUEST, FETCH_TUTOR_ACCOUNTS_SUCCESS, FETCH_TUTOR_ACCOUNTS_SUCCESS],
    endpoint: `tutor_accounts`,
    data: decamelizeKeys(filters),
    schema: Schemas.TUTOR_ACCOUNT_ARRAY
  }
})

export const loadTutorAccounts = (pageNumber = null, filters) => (dispatch, getState) => {
  // const {
  //   nextPage
  // } = getState()
  dispatch(fetchTutorAccounts(pageNumber, filters))
}

export const setFilters = (filters) =>  {
  return {
    type: SET_FILTERS,
    filters
  }
}