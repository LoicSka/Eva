
import React from 'react'
import PropTypes from 'prop-types'
import empty from '../styles/images/empty-grey.svg'

const EmptyView = ({ message = 'Nothing Here!' }) => {
    return (
        <div style={{minHeight: '40vh'}} className="d-flex flex-column justify-content-center align-items-center">
            <img style={{width: '90px'}} src={empty} alt='empty'/>
            <p>{message}</p>
        </div>
    )
}

EmptyView.propTypes = {
    message: PropTypes.string,
}

export default EmptyView