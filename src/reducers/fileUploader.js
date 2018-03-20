import * as ActionTypes from '../actions'
import { camelizeKeys } from 'humps'

const fileUploaderState = {
  state: pending,
  data: {}
}

const fileUploader = (state = fileUploaderState, action) => {
  switch (action.type) {
    case ActionTypes.UPLOAD_FILE_REQUEST:
    return {
      ...state,
      state: 'UPLOADING'
    }
    case ActionTypes.UPLOAD_FILE_SUCCESS:
    return {
      ...state,
      state: 'DONE',
      data: action.response.result
    }
    case ActionTypes.UPLOAD_FILE_FAILURE:
      return {
        ...state,
        state: 'FAILED',
        data: action.response.result
      }
    default: return state
  }
}

export default fileUploader