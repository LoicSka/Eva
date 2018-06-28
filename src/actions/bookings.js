import { CALL_API, Schemas } from '../middleware/api'
import { decamelizeKeys } from 'humps'

export const CREATE_BOOKING_REQUEST = 'CREATE_BOOKING_REQUEST'
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS'
export const CREATE_BOOKING_FAILURE = 'CREATE_BOOKING_FAILURE'
export const RESET_BOOKINGS = 'RESET_BOOKINGS'

export const resetBookingsAction = () => ({
    type: RESET_BOOKINGS
})

export const resetBookings = () => (dispatch) => {
    dispatch(resetBookingsAction())
  }

const postBooking = (bookingData) => ({
  [CALL_API]: {
    types: [CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE],
    endpoint: 'bookings',
    method: 'POST',
    schema: Schemas.BOOKING,
    data: decamelizeKeys(bookingData)
  }
})

export const createBooking = (bookingData) => (dispatch) => {
  dispatch(postBooking(bookingData))
}

export const TUTOR_BOOKINGS_REQUEST = 'TUTOR_BOOKINGS_REQUEST'
export const TUTOR_BOOKINGS_SUCCESS = 'TUTOR_BOOKINGS_SUCCESS'
export const TUTOR_BOOKINGS_FAILURE = 'TUTOR_BOOKINGS_FAILURE'

export const USER_BOOKINGS_REQUEST = 'USER_BOOKINGS_REQUEST'
export const USER_BOOKINGS_SUCCESS = 'USER_BOOKINGS_SUCCESS'
export const USER_BOOKINGS_FAILURE = 'USER_BOOKINGS_FAILURE'

export const STUDENT_BOOKINGS_REQUEST = 'STUDENT_BOOKINGS_REQUEST'
export const STUDENT_BOOKINGS_SUCCESS = 'STUDENT_BOOKINGS_SUCCESS'
export const STUDENT_BOOKINGS_FAILURE = 'STUDENT_BOOKINGS_FAILURE'

const fetchBookingsForTutor = (tutorAccountId, pageNumber) => ({
  tutorAccountId,
  pageNumber,
  [CALL_API]: {
    types: [TUTOR_BOOKINGS_REQUEST, TUTOR_BOOKINGS_SUCCESS, TUTOR_BOOKINGS_FAILURE],
    endpoint: `bookings/tutor/${tutorAccountId}`,
    schema: Schemas.BOOKING_ARRAY,
    data: decamelizeKeys({pageNumber, pageSize: 10})
  }
})

const fetchBookingsForUser = (userId, pageNumber) => ({
  userId,
  pageNumber,
  [CALL_API]: {
    types: [USER_BOOKINGS_REQUEST, USER_BOOKINGS_SUCCESS, USER_BOOKINGS_FAILURE],
    endpoint: `bookings/user/${userId}`,
    schema: Schemas.BOOKING_ARRAY,
    data: decamelizeKeys({pageNumber, pageSize: 10})
  }
})

const fetchBookingsForStudent = (studentId, pageNumber) => ({
  studentId,
  pageNumber,
  [CALL_API]: {
    types: [STUDENT_BOOKINGS_REQUEST, STUDENT_BOOKINGS_SUCCESS, STUDENT_BOOKINGS_FAILURE],
    endpoint: `bookings/student/${studentId}`,
    schema: Schemas.BOOKING_ARRAY,
    data: decamelizeKeys({pageNumber, pageSize: 10})
  }
})

export const loadBookingsForAccount = (tutorAccountId, pageNumber = 1) => (dispatch, getState) => {
  const {
    nextPage = 1,
    pageCount = 0
  } = getState().pagination.paginatedUserBookings[tutorAccountId] || {}
  if ((pageCount > 0 && !nextPage) || pageNumber < nextPage ) {
    return null
  }

  dispatch(fetchBookingsForTutor(tutorAccountId, nextPage))
}

export const loadBookingsForUser = (pageNumber = 1) => (dispatch, getState) => {
  const { user:{ id } } = getState().account || {user: {}}
  const {
    nextPage = 1,
    pageCount = 0
  } = getState().pagination.paginatedUserBookings[id] || {}
  if ((pageCount > 0 && !nextPage) || pageNumber < nextPage ) {
    return null
  }

  dispatch(fetchBookingsForUser(id, nextPage))
}

export const loadBookingsForStudent = (studentId, pageNumber = 1) => (dispatch, getState) => {
  const {
    nextPage = 1,
    pageCount = 0
  } = getState().pagination.paginatedStudentBookings[studentId] || {}
  if ((pageCount > 0 && !nextPage) || pageNumber < nextPage ) {
    return null
  }

  dispatch(fetchBookingsForStudent(studentId, nextPage))
}

export const UPDATE_BOOKING_REQUEST = 'UPDATE_BOOKING_REQUEST'
export const UPDATE_BOOKING_SUCCESS = 'UPDATE_BOOKING_SUCCESS'
export const UPDATE_BOOKING_FAILURE = 'UPDATE_BOOKING_FAILURE'

const putBooking = (bookingId, data) => ({
  [CALL_API]: {
    types: [UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS, UPDATE_BOOKING_FAILURE],
    endpoint: `bookings/${bookingId}`,
    schema: Schemas.BOOKING,
    method: 'PUT',
    data: decamelizeKeys(data)
  }
})

export const updateBooking = (bookingId, data) => (dispatch) => {
  dispatch(putBooking(bookingId, data))
}

export const cancelBooking = (bookingId) => (dispatch) => {
  dispatch(putBooking(bookingId, {state: 'canceled'}))
}

export const confirmBooking = (bookingId) => (dispatch) => {
  dispatch(putBooking(bookingId, {state: 'confirmed'}))
}

export const declineBooking = (bookingId) => (dispatch) => {
  dispatch(putBooking(bookingId, {state: 'declined'}))
}