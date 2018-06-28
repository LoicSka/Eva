import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextareaGroup = ({ field, value, error = null, type, onChange, label = null, subLabel = null, layout, placeholder = null }) => {
  const labelView = label ? <label>{label}</label> : null
  const subLabelView = subLabel ? <p className='sub-label'>{subLabel}</p> : null
  const errorView = error ? (
    <div className="invalid-feedback">
      {error}
    </div>
  ) : null
  return (
    <div className={classnames('form-group', { [`col-md-${12 / layout}`]: typeof (layout) !== 'undefined' })}>
      {labelView}
      {subLabelView}
      <textarea
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={classnames('form-control', { 'is-invalid': error })}
        name={field}
      ></textarea>
      {errorView}
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