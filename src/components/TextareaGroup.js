import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextareaGroup = ({ field, value, error, type, onChange, label, subLabel, layout }) => {
  return (
    <div className={classnames('form-group', { [`col-md-${12 / layout}`]: typeof (layout) !== 'undefined' })}>
      <label>{label}</label>
      <p className='sub-label'>{subLabel}</p>
      <textarea
        type={type}
        value={value}
        onChange={onChange}
        className={classnames('form-control', { 'is-invalid': error })}
        name={field}
      ></textarea>
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}

TextareaGroup.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  layout: PropTypes.number,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default TextareaGroup