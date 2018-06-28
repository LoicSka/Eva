export const HIDE_VISIBLE_MENU = 'HIDE_VISIBLE_MENU'

export const hideVisibleMenu = () => (dispatch) => {
    dispatch({
        type: HIDE_VISIBLE_MENU
    })
}

export const USER_MENU = 'USER_MENU'
export const SHOW_USER_MENU = 'SHOW_USER_MENU'

export const showUserMenu = (actions, students) => (dispatch, getState) => {
    const {
        isVisible,
        menuType
    } = getState().menu

    if (isVisible && menuType === USER_MENU) {
        dispatch({
            type: HIDE_VISIBLE_MENU,
        })
    } else {
        dispatch({
            type: SHOW_USER_MENU,
            payload: { actions, students }
        })
    }
}

export const BOOKING_MENU = 'BOOKING_MENU'
export const SHOW_BOOKING_MENU = 'SHOW_BOOKING_MENU'

export const showBookingMenu = (actions, bookingId) => (dispatch, getState) => {
    const {
        isVisible,
    } = getState().menu

    if (isVisible && bookingId === getState().menu.bookingId ) {
        dispatch({
            type: HIDE_VISIBLE_MENU,
        })
    } else {
        dispatch({
            type: SHOW_BOOKING_MENU,
            payload: { actions, bookingId }
        })
    }
}