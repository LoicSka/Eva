import * as ActionTypes from '../actions'
import { camelizeKeys } from 'humps'

const tutorAccountsState = {
  fetching: false,
  hasFetched: true,
  lastFiltered: Date().getTime(),
  lastFetched: Date().getTime(),
  page: 1,
  filters: {},
  tutorAccounts: {}
}

const tutorAccounts = (state = tutorAccountsState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_REQUEST:
      return {
        ...state,
        hasFetched: false,
        lastFetched: Date().getTime(),
        fetching: true
      }
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_SUCCESS:
      return {
        ...state,
        hasFetched: true,
        fetching: true
      }
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_REQUEST:
      return {
        ...state,
        hasFetched: false,
        fetching: true
      }
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        lastFiltered: Date().getTime(),
        filters: action.filters
      }
    default:
      return state
  }
}

export default tutorAccounts;