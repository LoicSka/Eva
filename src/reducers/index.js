import * as ActionTypes from '../actions'
import merge from 'lodash/merge'
// import paginate from './paginate'
import auth from './authenticate'

import { combineReducers } from 'redux'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { users: {}, tutorAccounts: {} }, action) => {
  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

// Updates error message to notify about the failed fetches.
const errorMessage = (state = null, action) => {
  const { type, error } = action
  if (type === ActionTypes.RESET_ERROR_MESSAGE) {
    return null
  } else if (error) {
    return error
  }
  return state
}

// Updates the pagination data for different actions.
// const pagination = combineReducers({
//   paginatedUsers: paginate({
//     mapActionToKey: action => action.name,
//     types: [
//       ActionTypes.USERS_REQUEST,
//       ActionTypes.USERS_SUCCESS,
//       ActionTypes.USERS_FAILURE
//     ]
//   })
// })

const rootReducer = combineReducers({
  auth,
  entities,
  // pagination,
  errorMessage,
})

export default rootReducer