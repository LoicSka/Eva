import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { getActiveLanguage } from 'react-localize-redux'
import ModalView from '../components/ModalView'
import TutorCalendar from '../components/TutorCalendar'
import { CALENDAR_MODAL, hideVisibleModal } from '../actions'

class CalendarModal extends Component {
    componentWillReceiveProps = (newProps) => {
        const { isVisible } = newProps
        if (!isVisible && isVisible !== this.props.isVisible ) {
            this.props.history.goBack()
        }
    }
    render() {
        const { isVisible, hideVisibleModal, enabledDays, bookedDays, currentLanguage } = this.props
        return (
            <ModalView isVisible={isVisible} handleHide={hideVisibleModal} columns={4}>
                <div className='card-body d-flex justify-content-center align-items-center p-4 sc-2'>
                    <TutorCalendar locale={currentLanguage} enabledDays={enabledDays} bookedDays={bookedDays} />
                </div>
            </ModalView>
        )
    }
}

CalendarModal.propTypes = {
    enabledDays: PropTypes.array,
    bookedDays: PropTypes.array,
    studentId: PropTypes.string,
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
}

const mapStateToProps = (state) => {
    var { modal: { isVisible, modalType, enabledDays, bookedDays } } = state
    isVisible = isVisible && modalType === CALENDAR_MODAL
    return {
        isVisible,
        enabledDays,
        bookedDays,
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, {hideVisibleModal})(CalendarModal))