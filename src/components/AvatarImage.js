import React from 'react'
import PropTypes from 'prop-types'
import avatar from '../styles/images/avatar.svg'

const AvatarImage = ({src = null}) => {
    return (
        <img className='menu-toggle' src={ src ? src : avatar } alt="img-avatar"/>
    )
}

AvatarImage.propTypes = {
    src: PropTypes.string
}

export default AvatarImage