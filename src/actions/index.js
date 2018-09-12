import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys } from 'humps'
import { setActiveLanguage } from 'react-localize-redux'

export * from './filter'
export * from './navigation'
export * from './modals'
export * from './menus'
export * from './emails'
export * from './bookings'
export * from './passwords'
export * from './walkthrough'

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
    schema: Schemas.USER,
    data: decamelizeKeys(signUpForm)
  }
})

export const signUpUser = (signUpForm) => (dispatch, getState) => {
  dispatch(postSignUp(signUpForm))
}

export const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const LOGOUT_USER = 'LOGOUT_USER'
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

export const loginUser = (loginForm) => (dispatch, getState) => {
  dispatch(postLogin(loginForm))
}

export const setCurrentUser = user => {
  return {
    type: SET_CURRENT_USER,
    data: user
  }
}

export const logoutUser = () => {
  return {
    type: LOGOUT_USER,
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('jwtToken')
  dispatch(logoutUser())
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

export const SET_LOCALE = 'SET_LOCALE'

export const setActiveLocale = (locale) => (dispatch) => {
  localStorage.setItem('locale', locale)
  dispatch(setActiveLanguage(locale))
}

export const CREATE_STUDENT_REQUEST = 'CREATE_STUDENT_REQUEST'
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS'
export const CREATE_STUDENT_FAILURE = 'CREATE_STUDENT_FAILURE'

const postStudent = (data) => ({
  [CALL_API]: {
    types: [CREATE_STUDENT_REQUEST, CREATE_STUDENT_SUCCESS, CREATE_STUDENT_FAILURE],
    endpoint: 'students',
    method: 'POST',
    schema: Schemas.STUDENT,
    data: decamelizeKeys(data),
  }
})

export const createStudent = (data) => (dispatch) => {
  dispatch(postStudent(data))
}

export const REVIEWS_REQUEST = 'REVIEWS_REQUEST'
export const REVIEWS_SUCCESS = 'REVIEWS_SUCCESS'
export const REVIEWS_FAILURE = 'REVIEWS_FAILURE'

const fetchReviews = (tutorAccountId, pageNumber) => ({
  tutorAccountId,
  pageNumber,
  [CALL_API]: {
    types: [REVIEWS_REQUEST, REVIEWS_SUCCESS, REVIEWS_FAILURE],
    endpoint: `reviews/tutor/${tutorAccountId}`,
    schema: Schemas.REVIEW_ARRAY,
    data: decamelizeKeys({pageNumber, pageSize: 10})
  }
})

export const loadReviewsForAccount = (tutorAccountId, pageNumber = 1) => (dispatch, getState) => {
  const {
    nextPage = 1,
    pageCount = 0
  } = getState().pagination.paginatedReviews[tutorAccountId] || {}
  if ((pageCount > 0 && !nextPage) || pageNumber < nextPage ) {
    return null
  }

  dispatch(fetchReviews(tutorAccountId, nextPage))
}

export const CREATE_RATING_REQUEST = 'CREATE_RATING_REQUEST'
export const CREATE_RATING_SUCCESS = 'CREATE_RATING_SUCCESS'
export const CREATE_RATING_FAILURE = 'CREATE_RATING_FAILURE'

const postRating = (ratingForm) => ({
  [CALL_API]: {
    types: [CREATE_RATING_REQUEST, CREATE_RATING_SUCCESS, CREATE_RATING_FAILURE],
    endpoint: 'ratings',
    method: 'POST',
    schema: Schemas.RATING,
    data: decamelizeKeys(ratingForm)
  }
})

export const createRating = (ratingForm) => (dispatch) => {
  dispatch(postRating(ratingForm))
}

export const TUTOR_ACCOUNT_REQUEST = 'TUTOR_ACCOUNT_REQUEST'
export const TUTOR_ACCOUNT_SUCCESS = 'TUTOR_ACCOUNT_SUCCESS'
export const TUTOR_ACCOUNT_FAILURE = 'TUTOR_ACCOUNT_FAILURE'

/*
  TutorAccount
*/

const fetchTutorAccount = (tutorAccountId) => ({
  [CALL_API]: {
    types: [TUTOR_ACCOUNT_REQUEST, TUTOR_ACCOUNT_SUCCESS, TUTOR_ACCOUNT_FAILURE],
    endpoint: `tutor_accounts/${tutorAccountId}`,
    schema: Schemas.TUTOR_ACCOUNT
  }
})

export const loadTutorAccount = (tutorAccountId) => (dispatch, getState) => {
  // if (typeof(getState().entities.tutorAccounts[`${tutorAccountId}`]) !== 'undefined') {
  //   return null
  // }
  dispatch(fetchTutorAccount(tutorAccountId))
}


export const  STUDENTS_REQUEST = 'STUDENTS_REQUEST'
export const  STUDENTS_SUCCESS = 'STUDENTS_SUCCESS'
export const  STUDENTS_FAILURE = 'STUDENTS_FAILURE'

const fetchStudents = (userId) => ({
  [CALL_API]: {
    types: [STUDENTS_REQUEST, STUDENTS_SUCCESS, STUDENTS_FAILURE],
    endpoint: `students/user/${userId}`,
    schema: Schemas.STUDENT_ARRAY
  }
})

export const loadStudentsForUser = (userId) => (dispatch) => {
  dispatch(fetchStudents(userId))
}

export const  STUDENT_REQUEST = 'STUDENT_REQUEST'
export const  STUDENT_SUCCESS = 'STUDENT_SUCCESS'
export const  STUDENT_FAILURE = 'STUDENT_FAILURE'

const fetchStudent = (studentId) => ({
  [CALL_API]: {
    types: [STUDENT_REQUEST, STUDENT_SUCCESS, STUDENT_FAILURE],
    endpoint: `students/${studentId}`,
    schema: Schemas.STUDENT
  }
})

export const loadStudent = (studentId) => (dispatch, getState) => {
  // const {
  //   entities: { students }
  // } = getState()
  // const student = students[studentId] || null
  // if (student) {
  //   return null
  // }
  dispatch(fetchStudent(studentId))
}