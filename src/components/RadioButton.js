import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const RadioButton = ({title, isSelected, handleSelect, type}) => {
    return (
        <div className='radio-ctn' onClick={handleSelect}>
            <div className='radio-select-ctn'>
                <div className='radio-select'>
                    <div style={{borderRadius: type === 'MULTI' ? '1px' : '50%'}} className={classnames('radio-btn-out', {'selected': isSelected})}>
                        <div style={{borderRadius: type === 'MULTI' ? '1px' : '50%'}} className='radio-btn-in'>
                        </div>
                    </div>
                </div>
                <div className='radio-title-ctn'>
                    <p>{title}</p>
                </div>
            </div>
        </div>
    )
}

RadioButton.propTypes = {
    title: PropTypes.string,
    type: PropTypes.string,
    isSelected: PropTypes.bool,
    handleSelect: PropTypes.func
}

export default RadioButton