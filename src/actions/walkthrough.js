export const SET_WALKTHROUGH_STEP = 'SET_WALKTHROUGH_STEP'

export const setWalkthroughStep = (step) => {
    return {
        type: SET_WALKTHROUGH_STEP,
        data: { activeStep: step }
    }
}

export const setActiveWalkthroughStep = (step) => (dispatch) => {
    localStorage.setItem('walkthrough', step)
    dispatch(setWalkthroughStep(step));
}

