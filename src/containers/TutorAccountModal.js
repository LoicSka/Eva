import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import ModalView from '../components/ModalView'
import TutorAccountDetailsView from './TutorAccountDetailsView'
import { TUTOR_ACCOUNT_MODAL, hideVisibleModal } from '../actions'

class TutorAccountModal extends Component {
    render() {
        const { isVisible, hideVisibleModal, tutorAccountId } = this.props
        return (
            <ModalView isVisible={isVisible} handleHide={hideVisibleModal} columns={9}>
                <div className='card-body p-4'>
                    <TutorAccountDetailsView tutorAccountId={tutorAccountId} />
                </div>
            </ModalView>
        )
    }
}

TutorAccountModal.propTypes = {
    isVisible: PropTypes.bool
}

const mapStateToProps = (state) => {
    var { modal: { isVisible, modalType, tutorAccountId } } = state
    isVisible = isVisible && modalType === TUTOR_ACCOUNT_MODAL
    return {
        isVisible,
        tutorAccountId
    }
}

export default connect(mapStateToProps, {hideVisibleModal})(TutorAccountModal)