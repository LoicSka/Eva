import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import paginate from './paginate'
import tutorAccounts from './tutorAccounts'
import account from './account'
import { localeReducer } from 'react-localize-redux'
import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, tutorAccounts: {}, regions: {}, tags: {}, subjects: {}, courses: {} }, action) => {
  console.log('STATE', state)
  if (action.type === ActionTypes.DELETE_COURSES_SUCCESS) {
    if (action.response && action.response.entities) {
      state.courses = omit(state.courses, keys(action.response.entities.courses)[0])
      return state
    }
  }
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
  } else if (message){ 
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
  }),
  tutorAccounts: paginate({
    mapActionToKey: action => action.filterKey,
    types: [
      ActionTypes.FETCH_TUTOR_ACCOUNTS_REQUEST,
      ActionTypes.FETCH_TUTOR_ACCOUNTS_SUCCESS, 
      ActionTypes.FETCH_TUTOR_ACCOUNTS_SUCCESS
    ]
  })

})

const navigation = (state = { isFilterNavHidden: true }, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.TOGGLE_FILTER_NAV:
      return {
        ...state,
        isFilterNavHidden: payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  account,
  entities,
  locale: localeReducer,
  tutorAccounts,
  pagination,
  courseState,
  navigation,
  message,
  errors
})

export default rootReducer