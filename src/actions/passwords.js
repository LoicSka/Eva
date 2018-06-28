import { CALL_API, Schemas } from '../middleware/api'

export const PASSWORD_RESET_REQUEST = 'PASSWORD_RESSET_REQUEST'
export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESSET_SUCCESS'
export const PASSWORD_RESET_FAILURE = 'PASSWORD_RESET_FAILURE'

export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_SUCCESS = 'UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_FAILURE = 'UPDATE_PASSWORD_FAILURE'

const passwordResetRequest = (data) => ({
    [CALL_API]: {
      types: [PASSWORD_RESET_REQUEST, PASSWORD_RESET_SUCCESS, PASSWORD_RESET_FAILURE],
      endpoint: `password_resets`,
      schema: Schemas.USER,
      method: 'POST',
      data
    }
})

export const requestPasswordReset = (data) => (dispatch) => {
    dispatch(passwordResetRequest(data))
}

const putPasswordResets = (data, token) => ({
    [CALL_API]: {
      types: [UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAILURE],
      endpoint: `password_resets/${token}`,
      schema: Schemas.USER,
      method: 'PUT',
      data
    }
})

export const updatePassword = (data, token) => (dispatch) => {
    dispatch(putPasswordResets(data, token))
}