import React from 'react'
import PropTypes from 'prop-types'
import success from '../styles/images/success.svg'
import { join, isEmpty } from 'lodash'

const BookingSuccess = ({address, estimatedCost, time = null, from, to, weekDays = [], handleConfirm, handleEdit, translate }) => {
    const timeView = time || isEmpty(weekDays) ? <p style={{fontSize: '1.2rem'}} className='mb-3'>{time}</p> : null
    const weekDaysView = isEmpty(weekDays) ? null : <p style={{fontSize: '1.2rem'}} className='mb-3'>{join(weekDays, ', ')}</p>
    return (
        <div className='d-flex flex-column justify-content-center align-items-center my-3'>
            <img style={{width: '70px', height: '70px'}} className='mb-4' src={success} alt='success' />
            <p style={{fontSize: '1.2rem'}} className='mb-3'>{address}</p>
            {timeView}
            {weekDaysView}
            <p style={{fontSize: '1.2rem'}} className='mb-3'>{from} - {to}</p>
            <h3 className='mb-3'>{estimatedCost}</h3>
            <div className="d-flex flex-row justify-content-center align-items-center my-1">
                <button style={{textTransform: 'uppercase'}} onClick={handleConfirm} className="btn btn-default mr-2">{translate('userActions.confirm')}</button>
                <button style={{textTransform: 'uppercase'}} onClick={handleEdit}  className="btn btn-default ml-2">{translate('userActions.edit')}</button>
            </div>
        </div>
    )
}

BookingSuccess.propTypes = {
    address: PropTypes.string.isRequired,
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    weekdays: PropTypes.array,
    time: PropTypes.string,
    handleConfirm: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired
}

export default BookingSuccess