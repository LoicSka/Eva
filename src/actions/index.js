import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys } from 'humps'

export * from './filter'

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
    schema: Schemas.ACCOUNT,
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
    schema: Schemas.ACCOUNT,
    data: decamelizeKeys(loginForm)
  }
})

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    data: user
  }
}

export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE'

const userUpdateRequest = (data, userId, onUploadProgress = null) => ({
  [CALL_API]: {
    types: [UPDATE_USER_REQUEST, UPDATE_USER_SUCCESS, UPDATE_USER_FAILURE],
    endpoint: `users/${userId}`,
    method: 'PUT',
    data: onUploadProgress ? data : decamelizeKeys(data),
    onUploadProgress,
    schema: Schemas.ACCOUNT
  }
})

export const uploadUserAvatar = (data, userId, onUploadProgress) => (dispatch, getState) => {
  dispatch(userUpdateRequest(data, userId, onUploadProgress))
}

export const updateUserAccount = (data, userId) => (dispatch, getState) => {
  dispatch(userUpdateRequest(data, userId))
}

export const RESET_MESSAGE = 'RESET_MESSAGE'

// Resets the currently visible error message.
export const resetMessage = () => ({
  type: RESET_MESSAGE
})

export const RESET_ACCOUNT = 'RESET_ACCOUNT'
const resetAccountAction = () => ({
  type: RESET_ACCOUNT
})

export const resetAccount = () => (dispatch) => {
  dispatch(resetAccountAction())
}

export const DISPLAY_GLOBAL_MESSAGE = 'DISPLAY_GLOBAL_MESSAGE'
const globalMessage = (content, type, title) => ({
  type: DISPLAY_GLOBAL_MESSAGE,
  message: {
    content,
    type,
    title
  }
})

export const displayGlobalMessage = (content, type, title) => (dispatch, getState) => {
  dispatch(globalMessage(content, type, title))
}

export const REGIONS_REQUEST = 'REGIONS_REQUEST'
export const REGIONS_SUCCESS = 'REGIONS_SUCCESS'
export const REGIONS_FAILURE = 'REGIONS_FAILURE'

// Fetches regions from  API.
// Relies on the custom API middleware defined in ../middleware/api.js.

/*
  Regions
*/

const fetchRegions = (pageNumber) => ({
  pageNumber: `${pageNumber}`,
  [CALL_API]: {
    types: [REGIONS_REQUEST, REGIONS_SUCCESS, REGIONS_FAILURE],
    endpoint: `regions/?page_number=${pageNumber + 1}`,
    schema: Schemas.REGION_ARRAY
  }
})

export const loadRegions = (pageNumber = 0) => (dispatch, getState) => {
  const {
    pageNumber = 0,
    nextPage = pageNumber + 1
  } = getState().pagination.paginatedRegions[`${pageNumber}`] || {}
  dispatch(fetchRegions(pageNumber))
}

// Fetches tags from  API.
// Relies on the custom API middleware defined in ../middleware/api.js.

/*
  Tags
*/

export const TAGS_REQUEST = 'TAGS_REQUEST'
export const TAGS_SUCCESS = 'TAGS_SUCCESS'
export const TAGS_FAILURE = 'TAGS_FAILURE'

const fetchTags = (pageNumber) => ({
  pageNumber: `${pageNumber}`,
  [CALL_API]: {
    types: [TAGS_REQUEST, TAGS_SUCCESS, TAGS_FAILURE],
    endpoint: `tags/?page_number=${pageNumber + 1}`,
    schema: Schemas.TAG_ARRAY
  }
})

export const loadTags = (pageNumber = 0) => (dispatch, getState) => {
  const {
    pageNumber = 0,
    nextPage = pageNumber + 1
  } = getState().pagination.paginatedRegions[`${pageNumber}`] || {}
  dispatch(fetchTags(pageNumber))
}

export const SUBJECTS_REQUEST = 'SUBJECTS_REQUEST'
export const SUBJECTS_SUCCESS = 'SUBJECTS_SUCCESS'
export const SUBJECTS_FAILURE = 'SUBJECTS_FAILURE'

// Fetches subjects from  API.
// Relies on the custom API middleware defined in ../middleware/api.js.

/*
  Subjects
*/

const fetchSubjects = (pageNumber) => ({
  pageNumber: `${pageNumber}`,
  [CALL_API]: {
    types: [SUBJECTS_REQUEST, SUBJECTS_SUCCESS, SUBJECTS_FAILURE],
    endpoint: `subjects/?page_number=${pageNumber + 1}`,
    schema: Schemas.SUBJECT_ARRAY
  }
})

export const loadSubjects = (pageNumber = 0) => (dispatch, getState) => {
  const {
    pageNumber = 0,
    nextPage = pageNumber + 1
  } = getState().pagination.paginatedRegions[`${pageNumber}`] || {}
  dispatch(fetchSubjects(pageNumber))
}

/*
  Courses
*/

// Posts a course to  API.
// Relies on the custom API middleware defined in ../middleware/api.js.

export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST'
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS'
export const CREATE_COURSE_FAILURE = 'CREATE_COURSE_FAILURE'

const postCourse = (courseForm) => ({
  [CALL_API]: {
    types: [CREATE_COURSE_REQUEST, CREATE_COURSE_SUCCESS, CREATE_COURSE_FAILURE],
    endpoint: 'courses',
    method: 'POST',
    schema: Schemas.COURSE,
    data: decamelizeKeys(courseForm)
  }
})

export const UPDATE_COURSE_REQUEST = 'UPDATE_COURSE_REQUEST'
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS'
export const UPDATE_COURSE_FAILURE = 'UPDATE_COURSE_FAILURE'

const putCourse = (courseForm) => ({
  [CALL_API]: {
    types: [UPDATE_COURSE_REQUEST, UPDATE_COURSE_SUCCESS, UPDATE_COURSE_FAILURE],
    endpoint: `courses/${courseForm.id}`,
    method: 'PUT',
    schema: Schemas.COURSE,
    data: decamelizeKeys(courseForm)
  }
})

export const createCourse = (courseForm) => (dispatch, getState) => {
  dispatch(postCourse(courseForm))
}

export const updateCourse = (courseForm) => (dispatch, getState) => {
  dispatch(putCourse(courseForm))
}

export const RESET_COURSE_STATE = 'RESET_COURSE_STATE'
const resetCourseState = () => ({
  type: RESET_COURSE_STATE
})

export const resetCourse = () => (dispatch) => {
  dispatch(resetCourseState())
}

export const COURSES_REQUEST = 'COURSES_REQUEST'
export const COURSES_SUCCESS = 'COURSES_SUCCESS'
export const COURSES_FAILURE = 'COURSES_FAILURE'

const fetchCourses = (data) => ({
  [CALL_API]: {
    types: [COURSES_REQUEST, COURSES_SUCCESS, COURSES_FAILURE],
    endpoint: `courses`,
    schema: Schemas.COURSE_ARRAY,
    data: decamelizeKeys(data)
  }
})

export const loadCoursesForAccount = (tutorAccountId) => (dispatch) => {
  dispatch(fetchCourses({ tutorAccountId }))
}

export const DELETE_COURSES_REQUEST = 'DELETE_COURSES_REQUEST'
export const DELETE_COURSES_SUCCESS = 'DELETE_COURSES_SUCCESS'
export const DELETE_COURSES_FAILURE = 'DELETE_COURSES_FAILURE'

const destroyCourse = (courseForm) => ({
  [CALL_API]: {
    types: [DELETE_COURSES_REQUEST, DELETE_COURSES_SUCCESS, DELETE_COURSES_FAILURE],
    endpoint: `courses/${courseForm.id}`,
    method: 'DELETE',
    schema: Schemas.COURSE,
    data: courseForm,
  }
})

export const deleteCourse = (courseForm) => (dispatch) => {
  dispatch(destroyCourse(courseForm))
}
