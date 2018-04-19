
export const TOGGLE_FILTER_NAV = "TOGGLE_FILTER_NAV"
export const toggleFilterNav = () => (dispatch, getState) => {
  const {
    navigation
  } = getState()
  dispatch(setFilterNav(!navigation.isFilterNavHidden))
}

export const hideFilterNav = () => (dispatch) => {
  dispatch(setFilterNav(true))
}

const setFilterNav = (isFilterNavHidden) => {
  return {
    type: TOGGLE_FILTER_NAV,
    payload: isFilterNavHidden
  }
}