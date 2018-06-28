import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { slideOutDown, slideInUp, fadeIn, fadeOut } from 'react-animations'
import classnames from 'classnames'

class BottomMenu extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: true
        }
        this.changeDisplay = this.changeDisplay.bind(this)
        this.hideModal = this.hideModal.bind(this)
    }

    hideModal = (e) => {
        const { handleHide } = this.props
        if (`${e.target.className}`.indexOf('bottom-menu-ctn') !== -1) {
            handleHide()
        }
    }

    changeDisplay = () => {
        const { isVisible } = this.props
        this.setState({isHidden: !isVisible})
    }

    componentWillReceiveProps = (newProps) => {
        const { isVisible } = newProps
        setTimeout(this.changeDisplay, isVisible ? 0 : 400)
    }

    render() {
        const { isVisible, children, columns = 5, handleHide } = this.props
        const { isHidden } = this.state
        return (
            <div className={classnames('bottom-menu-modal modal-view-ctn', {[css(styles.fadeIn)]: isVisible}, {[css(styles.fadeOut)]: !isVisible}, {'d-block': !isHidden}, {'d-none': isHidden})}>
                <div onClick={this.hideModal} className="bottom-menu-ctn">
                    <div className={classnames('bottom-menu', {[css(styles.slideInUp)]: isVisible}, {[css(styles.slideOutDown)]: !isVisible})}>
                        {children}
                    </div>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    slideInUp: {
        animationName: slideInUp,
        animationDuration: '.3s'
    },
    slideOutDown: {
        animationName: slideOutDown,
        animationDuration: '.3s'
    },
    fadeOut: {
        animationName: fadeOut,
        animationDuration: '.2s',
        opacity: '0'
    },
    fadeIn: {
        animationName: fadeIn,
        animationDuration: '.2s',
    }
    
})

BottomMenu.propTypes = {
    isVisible: PropTypes.bool,
    handleHide: PropTypes.func,
}


export default BottomMenu