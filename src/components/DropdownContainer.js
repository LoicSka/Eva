import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { fadeIn, fadeOut } from 'react-animations'
import classnames from 'classnames'

class DropDownContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isHidden: true
        }
    }

    changeDisplay = () => {
        const { isVisible } = this.props
        this.setState({isHidden: !isVisible})
    }

    componentWillReceiveProps = (newProps) => {
        const { isVisible, handleHide } = newProps
        setTimeout(this.changeDisplay, isVisible ? 0 : 400)
        document.onclick = (e) => {
            const { target: { className = null }} = e
            if( className && className.indexOf('menu-toggle') === -1) {
                handleHide()
            }
        }
    }

    render() {
        const { isVisible, id = null,  top = 0, isResponsive = true } = this.props
        const { isHidden } = this.state
        return (
            <div id={id} style={{top: `${top}px`}} className={classnames('drop-down-ctn right', {[css(styles.fadeIn)]: isVisible}, {[css(styles.fadeOut)]: !isVisible}, {'d-block': !isHidden}, {'d-none': isHidden}, {'responsive': isResponsive})}>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    fadeIn: {
        animationName: fadeIn,
        animationDuration: '.2s',
    },
    fadeOut: {
        animationName: fadeOut,
        animationDuration: '.2s',
        opacity: '0'
    }
})

DropDownContainer.propTypes = {
    isVisible: PropTypes.bool,
    handleHide: PropTypes.func,
    top: PropTypes.number,
    id: PropTypes.string,
    isResponsive: PropTypes.bool
}

export default DropDownContainer
