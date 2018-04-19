import * as ActionTypes from '../actions'
import { camelizeKeys } from 'humps'

const tutorAccountsState = {
  fetching: false,
  hasFetched: true,
  lastFiltered: new Date().getTime(),
  lastFetched: new Date().getTime(),
  page: 1,
  filters: {},
  filterKey: 'All'
}

const tutorAccounts = (state = tutorAccountsState, action) => {
  switch (action.type) {
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_REQUEST:
      return {
        ...state,
        hasFetched: false,
        lastFetched: new Date().getTime(),
        filterKey: action.filterKey,
        fetching: true
      }
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_SUCCESS:
      return {
        ...state,
        hasFetched: true,
        fetching: false,
      }
    case ActionTypes.FETCH_TUTOR_ACCOUNTS_FAILURE:
      return {
        ...state,
        hasFetched: false,
        fetching: false
      }
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        lastFiltered: new Date().getTime(),
        filters: action.filters
      }
    case ActionTypes.CLEAR_FILTERS:
      return {
        ...state,
        filters: {},
        filterKey: 'All'
      }
    default:
      return state
  }
}

export default tutorAccounts;