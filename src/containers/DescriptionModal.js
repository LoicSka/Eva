import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { DESC_MODAL, hideVisibleModal } from '../actions'

class DescriptionModal extends Component {
    componentWillReceiveProps = (newProps) => {
        const { isVisible } = newProps
        if (!isVisible && isVisible !== this.props.isVisible ) {
            // this.props.history.goBack()
        }
    }

    render() {
        const { isVisible, hideVisibleModal } = this.props
        return (
            <div onClick={hideVisibleModal} className={`desc-overlay ${ isVisible ? 'd-block' : 'd-none' }`}></div>
        )
    }
}

DescriptionModal.propTypes = {
    isVisible: PropTypes.bool,
}

const mapStateToProps = (state) => {
    var { modal: { isVisible, modalType } } = state
    isVisible = isVisible && modalType === DESC_MODAL
    return {
        isVisible,
    }
}

export default withRouter(connect(mapStateToProps, {hideVisibleModal})(DescriptionModal))