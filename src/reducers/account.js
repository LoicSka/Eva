import * as ActionTypes from '../actions'
import jwtDecode from 'jwt-decode'
import { camelizeKeys } from 'humps'

const accountState = {
  authenticating: false,
  isAuthenticated: false,
  isUpdating: false,
  hasUpdated: false,
  user: {},
}

const auth = (state = accountState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      }
    case ActionTypes.UPDATE_USER_REQUEST:
      return {
        ...state,
        isUpdating: true
      }
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.CREATE_USER_SUCCESS:
      localStorage.setItem('jwtToken', action.response.resu)
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        user: camelizeKeys(jwtDecode(action.response.result))
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      localStorage.setItem('jwtToken', action.response.result)
      return {
        ...state,
        isUpdating: false,
        hasUpdated: true,
        user: camelizeKeys(jwtDecode(action.response.result))
      }
    case ActionTypes.UPDATE_USER_FAILURE:
      return {
        ...state,
        isUpdating: false,
        hasUpdated: false,
      }
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        authenticating: false,
        isAuthenticated: false
      }
    case ActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        user: action.data
      }
    case ActionTypes.RESET_ACCOUNT:
      return {
        ...state,
        authenticating: false,
        isUpdating: false,
        hasUpdated: false,
      }
    default: return state
  }
}

export default auth