import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import ModalView from '../components/ModalView'
import RadioSelectfield from '../components/RadioSelectfield'
import { USER_TYPE_MODAL, hideVisibleModal } from '../actions'

const PARENT = 'A Parent'
const STUDENT = 'A Student'
const TUTOR = 'A Tutor'

class UserTypeSelectModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedType: PARENT
        }
        this.handleSelect = this.handleSelect.bind(this)
    }

    handleSelect = (selectedType) => {
        this.setState({selectedType})
    }

    render() {
        const { isVisible, hideVisibleModal } = this.props
        const choices = [PARENT, STUDENT, TUTOR]
        return (
            <ModalView isVisible={isVisible} handleHide={hideVisibleModal}>
                <div className='card-body p-4'>
                    <RadioSelectfield question='First of all, Who are you?' choices={choices} type='SINGLE' selected={this.state.selectedType} handleSelect={this.handleSelect}/> 
                    <Link to='/' className='btn btn-primary mt-3'>Continue</Link>
                </div>
            </ModalView>
        )
    }
}

UserTypeSelectModal.propTypes = {
    isVisible: PropTypes.bool,
    translate: PropTypes.func,
    currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
    var { modal: { isVisible, modalType } } = state
    isVisible = isVisible && modalType === USER_TYPE_MODAL
    return {
        isVisible,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {hideVisibleModal})(UserTypeSelectModal)
