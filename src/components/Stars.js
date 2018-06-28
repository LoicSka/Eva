import React from 'react'
import PropTypes from 'prop-types'
import { times, constant } from 'lodash'
import classnames from 'classnames'

const Stars = ({rating = 0, size = 1}) => {
    const stars = times(5, constant('⭐')).map((star, i) => {
        return (
            <div style={{opacity: Number(rating) >= i+1 ? '1' : '.3', paddingLeft: '5px'}} key={`star-${i}`} className='star-ctn'><h4 className='m-0' style={{fontSize: `${size}rem`}}>{star}</h4></div>
        )
    })
    return (
        <div className='d-flex flex-row'>
            {stars}
        </div>
    )
}

Stars.propTypes = {
    rating: PropTypes.number,
    size: PropTypes.number,
}

export default Stars