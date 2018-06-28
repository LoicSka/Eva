import React from 'react'
import PropTypes from 'prop-types'


const Separator = ({classes = 'mx-1 my-3', title = null }) => {
    const titleView = title ? <span className='px-3'>{title}</span> : null
    return (
        <div className={`separator ${classes}`}>
            {titleView}
        </div>
    )
}

Separator.propTypes = {
    classes: PropTypes.string,
    title: PropTypes.string,
}

export default Separator

