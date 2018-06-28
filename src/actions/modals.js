
export const USER_TYPE_MODAL = 'USER_TYPE_MODAL'
export const SHOW_USER_TYPE_MODAL = 'SHOW_USER_TYPE_MODAL'
export const HIDE_VISIBLE_MODAL = 'HIDE_VISIBLE_MODAL'

export const TUTOR_ACCOUNT_MODAL = 'TUTOR_ACCOUNT_MODAL'
export const SHOW_TUTOR_ACCOUNT_MODAL = 'SHOW_TUTOR_ACCOUNT_MODAL'

export const BOOKING_FORM_MODAL = 'BOOKING_FORM_MODAL'
export const SHOW_BOOKING_FORM_MODAL = 'SHOW_BOOKING_FORM_MODAL'

export const showSelectUserTypeModal = () => (dispatch) => {
    dispatch({
        type: SHOW_USER_TYPE_MODAL,
    })
}

export const showTutorAccountModal = (accountId) => (dispatch) => {
    dispatch({
        type: SHOW_TUTOR_ACCOUNT_MODAL,
        payload: accountId
    })
}

export const showBookingFormModal = (studentId, tutorAccountId, enabledDays, bookedDays) => (dispatch) => {
    dispatch({
        type: SHOW_BOOKING_FORM_MODAL,
        payload: { studentId, tutorAccountId, enabledDays, bookedDays }
    })
}

export const hideVisibleModal = () => (dispatch) => {
    dispatch({
        type: HIDE_VISIBLE_MODAL
    })
}

export const CALENDAR_MODAL = 'CALENDAR_MODAL'
export const SHOW_CALENDAR_MODAL = 'SHOW_CALENDAR_MODAL'

export const showCalendarModal = (enabledDays, bookedDays) => (dispatch) => {
    dispatch({
        type: SHOW_CALENDAR_MODAL,
        payload: { enabledDays, bookedDays }
    })
}

export const STUDENT_BOOKING_LIST_MODAL = 'STUDENT_BOOKING_LIST_MODAL'
export const SHOW_STUDENT_BOOKING_LIST_MODAL = 'SHOW_STUDENT_BOOKING_LIST_MODAL'

export const showStudentBookingListModal = (studentId, bookingCount) => (dispatch, getState) => {
    dispatch({
        type: SHOW_STUDENT_BOOKING_LIST_MODAL,
        payload: { studentId, bookingCount }
    })
}
