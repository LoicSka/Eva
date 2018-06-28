import { CALL_API, Schemas } from '../middleware/api'

export const WELCOME_EMAIL_REQUEST = 'WELCOME_EMAIL_REQUEST'
export const WELCOME_EMAIL_SUCCESS = 'WELCOME_EMAIL_SUCCESS'
export const WELCOME_EMAIL_FAILURE = 'WELCOME_EMAIL_FAILURE'

export const VERIFY_EMAIL_REQUEST = 'VERIFY_EMAIL_REQUEST'
export const VERIFY_EMAIL_SUCCESS = 'VERIFY_EMAIL_SUCCESS'
export const VERIFY_EMAIL_FAILURE = 'VERIFY_EMAIL_FAILURE'

const welcomeEmailRequest = (userId) => ({
    [CALL_API]: {
        types: [WELCOME_EMAIL_REQUEST, WELCOME_EMAIL_SUCCESS, WELCOME_EMAIL_FAILURE],
        method: 'POST',
        endpoint: `send-welcome-email/${userId}`,
        schema: Schemas.USER
    }
})

export const sendWelcomeEmail = (id) => (dispatch, getState) => {
    dispatch(welcomeEmailRequest(id))
}

const verifyEmailRequest = (userId,token) => ({
    [CALL_API]: {
        types: [VERIFY_EMAIL_REQUEST, VERIFY_EMAIL_SUCCESS, VERIFY_EMAIL_FAILURE],
        method: 'POST',
        endpoint: `verify-email/${userId}`,
        data: {
            token
        },
        schema: Schemas.ACCOUNT
    }
})

export const verifyEmail = (userId,token) => (dispatch) => {
    dispatch(verifyEmailRequest(userId,token))
}