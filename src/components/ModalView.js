import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { merge, zoomIn, zoomOut, fadeIn, fadeOut } from 'react-animations'
import classnames from 'classnames'

class ModalView extends Component {
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
        if (`${e.target.className}`.indexOf('row') !== -1) {
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
        const closeButton = (
            <div onClick={handleHide} className='close-modal-btn'>
                <svg width="11px" height="11px" viewBox="0 0 11 11" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g fillRule="nonzero" fill="#FFFFFF">
                            <path d="M10.6204943,8.91232594 C11.0962925,9.38886024 11.0962925,10.160392 10.6204943,10.6369263 C10.3712667,10.8865395 10.076725,11 9.75952626,11 C9.4423275,11 9.12512873,10.8865395 8.89855819,10.6369263 L5.5,7.23310985 L2.07878476,10.6369263 C1.82955716,10.8865395 1.53501545,11 1.21781668,11 C0.90061792,11 0.583419156,10.8865395 0.35684861,10.6369263 C-0.118949537,10.160392 -0.118949537,9.38886024 0.35684861,8.91232594 L3.77806385,5.48581743 L0.35684861,2.08200103 C-0.118949537,1.60546674 -0.118949537,0.833935018 0.35684861,0.357400722 C0.832646756,-0.119133574 1.60298661,-0.119133574 2.07878476,0.357400722 L5.5,3.78390923 L8.92121524,0.357400722 C9.39701339,-0.119133574 10.1673532,-0.119133574 10.6431514,0.357400722 C11.1189495,0.833935018 11.1189495,1.60546674 10.6431514,2.08200103 L7.22193615,5.50850954 L10.6204943,8.91232594 Z" id="Shape"></path>
                        </g>
                    </g>
                </svg>
            </div>
        )
        return (
            <div onClick={this.hideModal} style={{display: isHidden ? 'none' : 'block'}} className={classnames('modal-view-ctn', {[css(styles.fadeIn)]: isVisible}, {[css(styles.fadeOut)]: !isVisible})}>
                <div style={{marginTop: '100px'}} className='row panel-ctn justify-content-center'>
                    <div className={classnames('col-md-' + columns, {[css(styles.fadeInZoom)]: isVisible}, {[css(styles.fadeOutZoom)]: !isVisible})}>
                        {closeButton}
                        <div style={{margin: '15px 5px', border: 'none', maxHeight: '70vh', minHeight: '30vh'}} className='card'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const fadeInZoom = merge(fadeIn, zoomIn)
const fadeOutZoom = merge(fadeOut, zoomOut)

const styles = StyleSheet.create({
    fadeInZoom: {
        animationName: fadeInZoom,
        animationDuration: '.2s',
    },
    fadeOutZoom: {
        animationName: fadeOutZoom,
        animationDuration: '.2s',
        opacity: '0'
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

ModalView.propTypes = {
    isVisible: PropTypes.bool,
    handleHide: PropTypes.func,
    columns: PropTypes.any
}


export default ModalView