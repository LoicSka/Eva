import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import ModalView from '../components/ModalView'
import BookingForm from './BookingForm'
import { BOOKING_FORM_MODAL, hideVisibleModal } from '../actions'

class BookingFormModal extends Component {
    componentWillReceiveProps = (newProps) => {
        const { isVisible } = newProps
        if (!isVisible && isVisible !== this.props.isVisible ) {
            this.props.history.goBack()
        }
    }
    render() {
        const { isVisible, hideVisibleModal, tutorAccountId, studentId, enabledDays, bookedDays } = this.props
        return (
            <ModalView isVisible={isVisible} handleHide={hideVisibleModal} columns={5}>
                <div className='card-body p-4'>
                    <BookingForm isVisible={isVisible} studentId={studentId} tutorAccountId={tutorAccountId} enabledDays={enabledDays} bookedDays={bookedDays} />
                </div>
            </ModalView>
        )
    }
}

BookingFormModal.propTypes = {
    isVisible: PropTypes.bool,
    tutorAccountId: PropTypes.string,
    studentId: PropTypes.string,
    enabledDays: PropTypes.array,
    bookedDays: PropTypes.array
}

const mapStateToProps = (state) => {
    var { modal: { isVisible, modalType, tutorAccountId, studentId, enabledDays, bookedDays } } = state
    isVisible = isVisible && modalType === BOOKING_FORM_MODAL
    return {
        isVisible,
        tutorAccountId,
        studentId,
        enabledDays,
        bookedDays
    }
}

export default withRouter(connect(mapStateToProps, {hideVisibleModal})(BookingFormModal))