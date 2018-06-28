import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, css } from 'aphrodite'
import { merge, zoomIn, zoomOut, fadeIn, fadeOut } from 'react-animations'
import classnames from 'classnames'

class MenuRow extends Component {
    handleClick = () => {
        const { onClick = () => {} } = this.props
        onClick()
    }
    render() {
        const { label, notificationCount = 0, children = null, imageSrc = null, imageStyle = {}, style = {} } = this.props
        const imageView = imageSrc ? (
            <img className='mr-2' style={imageStyle} src={imageSrc} alt={`${label}-img`}/>
        ) : null
        const notificationCountView = <span style={{ opacity: notificationCount > 0 ? 1 : 0 }} className='notification-ctn'>{notificationCount}</span>
        const contentView = children ? (children) : (
            <div style={{ width: '100%' }} className='menu-row d-flex flex-row justify-content-between align-items-center px-4'>
                <div className="d-flex flex-row align-items-center">
                    {imageView}
                    <p className='mb-0'>{label}</p>
                </div>
                {notificationCountView}
            </div>
        )
        return (
            <div style={style} onClick={this.handleClick} className='menu-row-ctn d-flex align-items-strecth'>
                {contentView}
            </div>
        )
    }
}

MenuRow.propTypes = {
    label: PropTypes.string,
    onClick: PropTypes.func,
    imageSrc: PropTypes.string,
    imageStyle: PropTypes.object
}

export default MenuRow