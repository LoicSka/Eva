import * as ActionTypes from '../actions'
import jwtDecode from 'jwt-decode'
import { camelizeKeys } from 'humps'

const authState = {
  authenticating: false,
  isAuthenticated: false,
  user: {},
}

const auth = (state = authState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        authenticating: true
      }
    case ActionTypes.LOGIN_SUCCESS:
    case ActionTypes.CREATE_USER_SUCCESS:
      localStorage.setItem('jwtToken', action.response.result)
      return {
        ...state,
        authenticating: false,
        isAuthenticated: true,
        user: camelizeKeys(jwtDecode(action.response.result))
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
    default: return state
  }
}

export default auth