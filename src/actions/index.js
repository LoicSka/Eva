import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys } from 'humps'

export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'

// Fetches users from  API.
// Relies on the custom API middleware defined in ../middleware/api.js.

const fetchUsers = (pageNumber) => ({
  pageNumber,
  [CALL_API]: {
    types: [USERS_REQUEST, USERS_SUCCESS, USERS_FAILURE],
    endpoint: `users`,
    schema: Schemas.USER_ARRAY
  }
})

export const loadUsers = (pageNumber = null) => (dispatch, getState) => {
  const {
    nextPage
  } = getState()
  dispatch(fetchUsers(nextPage))
}

export const CREATE_USER_REQUEST = 'CREATE_USER_REQUEST'
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS'
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE'

const postSignUp = (signUpForm) => ({
  [CALL_API]: {
    types: [CREATE_USER_REQUEST, CREATE_USER_SUCCESS, CREATE_USER_FAILURE],
    endpoint: 'users',
    method: 'POST',
    schema: Schemas.AUTH,
    data: decamelizeKeys(signUpForm)
  }
})

export const signUpUser = (signUpForm) => (dispatch, getState) => {
  dispatch(postSignUp(signUpForm))
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const postLogin = (loginForm) => ({
  [CALL_API]: {
    types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: 'login',
    method: 'POST',
    schema: Schemas.AUTH,
    data: decamelizeKeys(loginForm)
  }
})

export const loginUser = (loginForm) => (dispatch, getState) => {
  dispatch(postLogin(loginForm))
}

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    data: user
  };
}

export const RESET_MESSAGE = 'RESET_MESSAGE'

// Resets the currently visible error message.
export const resetMessage = () => ({
  type: RESET_MESSAGE
})
