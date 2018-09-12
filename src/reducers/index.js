import * as ActionTypes from '../actions'
import { merge, omit, keys } from 'lodash'
import paginate from './paginate'
import filter from './filter'
import account from './account'
import { localeReducer } from 'react-localize-redux'
import { combineReducers } from 'redux'
import jwtDecode from 'jwt-decode'
import { camelizeKeys } from 'humps'

// Updates an entity cache in response to any action with response.entities.
const entities = (state = { isLoading: {}, users: {}, tutorAccounts: {}, regions: {}, tags: {}, subjects: {}, courses: {}, students: {}, reviews: {}, ratings: {}, bookings: {}, studentMatches: {}, tutorMatches: {} }, action) => {
  if (action.type === ActionTypes.DELETE_COURSES_SUCCESS) {
    if (action.response && action.response.entities) {
      state.courses = omit(state.courses, keys(action.response.entities.courses)[0])
      return state
    }
  }

  switch (action.type) {
    case ActionTypes.CREATE_STUDENT_REQUEST:
      state.isLoading = merge({}, state.isLoading, { student: true })
      break
    case ActionTypes.CREATE_STUDENT_FAILURE:
    case ActionTypes.CREATE_STUDENT_SUCCESS:
      state.isLoading = merge({}, state.isLoading, { student: false })
      break
    case ActionTypes.REGIONS_REQUEST:
      state.isLoading = merge({}, state.isLoading, { region: true })
      break
    case ActionTypes.REGIONS_FAILURE:
    case ActionTypes.REGIONS_SUCCESS:
      state.isLoading = merge({}, state.isLoading, { region: false })
      break
    case ActionTypes.SUBJECTS_REQUEST:
      state.isLoading = merge({}, state.isLoading, { subject: true })
      break
    case ActionTypes.SUBJECTS_SUCCESS:
    case ActionTypes.SUBJECTS_FAILURE:
      state.isLoading = merge({}, state.isLoading, { subject: false })
      break
    case ActionTypes.RESET_BOOKINGS:
    case ActionTypes.CREATE_BOOKING_FAILURE:
    case ActionTypes.CREATE_BOOKING_SUCCESS:
      state.bookings = {}
      break
    case ActionTypes.LOGOUT_USER:
      return {isLoading: {}, users: {}, tutorAccounts: {}, regions: {}, tags: {}, subjects: {}, courses: {}, students: {}, reviews: {}, ratings: {}, bookings: {}, studentMatches: {}, tutorMatches: {}}
    default:
      break
  }

  if (action.response && action.response.entities) {
    return merge({}, state, action.response.entities)
  }
  return state
}

const errors = (state = {}, action) => {
  const { errors, type } = action
  switch (type) {
    case ActionTypes.RESET_ACCOUNT:
    return {}
    default:
    if (errors) {
      return errors
    } else {
      return {}
    }
  }
}

const walkthrough = (state = {activeStep: 0, isDone: false}, action) => {
  const { type, data } = action
  switch (type) {
    case ActionTypes.SET_WALKTHROUGH_STEP:
    return {
      ...state,
      activeStep: Number(data.activeStep),
      isDone: data.activeStep == 3
    }
    case ActionTypes.CREATE_USER_SUCCESS:
    return {
      ...state,
      activeStep: 0,
      isDone: false
    }
    case ActionTypes.VERIFY_EMAIL_SUCCESS:
    localStorage.setItem('walkthrough', 1)
    return {
      ...state,
      activeStep: 1,
      isDone: false
    }
    case ActionTypes.CREATE_STUDENT_SUCCESS:
    localStorage.setItem('walkthrough', 2)
    return {
      ...state,
      activeStep: 2
    }
    case ActionTypes.CREATE_BOOKING_SUCCESS:
    localStorage.setItem('walkthrough', 3)
    return {
      ...state,
      activeStep: 3,
      isDone: true
    }
    case ActionTypes.UPDATE_USER_SUCCESS:
    localStorage.setItem('walkthrough', 3)
    return {
      ...state,
      activeStep: 3,
      isDone: true
    }
    case ActionTypes.LOGIN_SUCCESS:
    const user = camelizeKeys(jwtDecode(action.response.result))
    if (user.verified === true) {
      localStorage.setItem('walkthrough', 3)
    }
    return {
      ...state,
      activeStep: 3,
      isDone: user.verified === true
    }
    default:
    return state
  }
}

const modal = (state = {isVisible: false}, action) => {
  const { type, payload } = action
  switch (type) {
    case ActionTypes.SHOW_USER_TYPE_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.USER_TYPE_MODAL
      }
    case ActionTypes.SHOW_TUTOR_ACCOUNT_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.TUTOR_ACCOUNT_MODAL,
        tutorAccountId: action.payload
      }
    case ActionTypes.SHOW_BOOKING_FORM_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.BOOKING_FORM_MODAL,
        tutorAccountId: action.payload.tutorAccountId,
        enabledDays: action.payload.enabledDays,
        bookedDays: action.payload.bookedDays,
        studentId: action.payload.studentId,
      }
    case ActionTypes.SHOW_CALENDAR_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.CALENDAR_MODAL,
        enabledDays: action.payload.enabledDays,
        bookedDays: action.payload.bookedDays,
      }
    case ActionTypes.SHOW_STUDENT_BOOKING_LIST_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.STUDENT_BOOKING_LIST_MODAL,
        studentId: payload.studentId,
        bookingCount: payload.bookingCount
      }
    case ActionTypes.SHOW_DESC_MODAL:
      return {
        ...state,
        isVisible: true,
        modalType: ActionTypes.DESC_MODAL
      }
    case ActionTypes.HIDE_VISIBLE_MODAL:
      return {
        ...state,
        isVisible: false
      }
    default:
      return state
  }
}

const menu = (state = {isVisible: false}, action) => {
  const { type, payload = {} } = action
  const { students, bookingId, actions } = payload
  switch (type) {
    case ActionTypes.SHOW_USER_MENU:
      return {
        ...state,
        isVisible: true,
        menuType: ActionTypes.USER_MENU,
        isResponsive: true,
        actions,
        students
      }
    case ActionTypes.SHOW_BOOKING_MENU:
      return {
        ...state,
        isVisible: true,
        menuType: ActionTypes.BOOKING_MENU,
        isResponsive: false,
        actions,
        bookingId
      }
    case ActionTypes.HIDE_VISIBLE_MENU:
      return {
        ...state,
        isVisible: false,
      }
    default:
      return state
  }
}

// Updates error message to notify about the failed fetches.
const message = (state = {}, action) => {
  const { type, message = {} } = action
  switch (type) {
    case ActionTypes.RESET_MESSAGE:
      return {}
    case ActionTypes.WELCOME_EMAIL_SUCCESS:
      return {
        type: 'success',
        title: 'notes.titles.done',
        content: 'notes.welcomeEmailSuccess'
      }
    case ActionTypes.VERIFY_EMAIL_SUCCESS:
      return {
        type: 'success',
        title: 'notes.titles.yay',
        content: 'notes.verifyEmailSuccess'
      }
    case ActionTypes.UPDATE_USER_SUCCESS:
      return {
        type: 'success',
        content: 'notes.userUpdateSuccess'
      }
    case ActionTypes.UPDATE_BOOKING_SUCCESS:
      return {
        type: 'success',
        content: 'notes.bookingUpdateSuccess'
      }
    case ActionTypes.PASSWORD_RESET_SUCCESS:
      return {
        type: 'success',
        content: 'notes.resetPasswordSuccess'
      }
    default: return message
  }
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
  paginatedReviews: paginate({
    mapActionToKey: action => action.tutorAccountId,
    types: [
      ActionTypes.REVIEWS_REQUEST,
      ActionTypes.REVIEWS_SUCCESS,
      ActionTypes.REVIEWS_FAILURE
    ]
  }),
  paginatedTutorBookings: paginate({
    mapActionToKey: action => action.tutorAccountId,
    types: [
      ActionTypes.TUTOR_BOOKINGS_REQUEST,
      ActionTypes.TUTOR_BOOKINGS_SUCCESS,
      ActionTypes.TUTOR_BOOKINGS_FAILURE
    ]
  }),
  paginatedStudentBookings: paginate({
    mapActionToKey: action => action.studentId,
    types: [
      ActionTypes.STUDENT_BOOKINGS_REQUEST,
      ActionTypes.STUDENT_BOOKINGS_SUCCESS,
      ActionTypes.STUDENT_BOOKINGS_FAILURE
    ]
  }),
  paginatedUserBookings: paginate({
    mapActionToKey: action => action.userId,
    types: [
      ActionTypes.USER_BOOKINGS_REQUEST,
      ActionTypes.USER_BOOKINGS_SUCCESS,
      ActionTypes.USER_BOOKINGS_FAILURE
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
  filter,
  modal,
  menu,
  pagination,
  courseState,
  navigation,
  message,
  walkthrough,
  errors
})

export default rootReducer