import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import paginate from './paginate'
import account from './account'
import { localeReducer } from 'react-localize-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, tutorAccounts: {}, regions: {}, tags: {}, subjects: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

const errors = (state = {}, action) => {
  const { errors } = action
  if (errors) {
    return errors
  }
  return state
}

// Updates error message to notify about the failed fetches.
const message = (state = {}, action) => {
  const { type, message } = action
  if (type === ActionTypes.RESET_MESSAGE) {
    return {}
  } else if (message) {
    return message
  }
  return state
}

const courseState = (state = { submiting: false, fetching: false, success: false }, action) => {
  const { type } = action
  switch (type) {
    case ActionTypes.UPDATE_COURSE_REQUEST:
    case ActionTypes.CREATE_COURSE_REQUEST:
        return {
          ...state,
          submiting: true
        }
    case ActionTypes.UPDATE_COURSE_SUCCESS:
    case ActionTypes.CREATE_COURSE_SUCCESS:
        return {
          ...state,
          submiting: false,
          success: true
        }
    case ActionTypes.UPDATE_COURSE_FAILURE:
    case ActionTypes.CREATE_COURSE_FAILURE:
        return {
          ...state,
          submiting: false,
          success: false
        }
    case ActionTypes.RESET_COURSE_STATE:
      return {
        ...state,
        fetching: false,
        submiting: false,
        success: false
      }
    default:
      return state
  }
}

// Updates the pagination data for different actions.
const pagination = combineReducers({
  paginatedRegions: paginate({
    mapActionToKey: action => action.pageNumber,
    types: [
      ActionTypes.REGIONS_REQUEST,
      ActionTypes.REGIONS_SUCCESS,
      ActionTypes.REGIONS_FAILURE
    ]
  })
})

const rootReducer = combineReducers({
  account,
  entities,
  locale: localeReducer,
  pagination,
  courseState,
  message,
  errors
})

export default rootReducer