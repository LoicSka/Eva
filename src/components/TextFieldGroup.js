import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextfieldGroup = ({ field, value, error = null, placeholder = null, type, onChange, label = null, subLabel, layout }) => {
  const labelView = label ? <label>{label}</label> : null
  const subLabelView = subLabel ? <p className='sub-label'>{subLabel}</p> : null
  const errorView = error ? (
    <div className="invalid-feedback">
      {error}
    </div>
  ) : null
  return (
    <div className={classnames('form-group', {[`col-md-${12/layout}`]: typeof(layout) !== 'undefined'})}>
      {labelView}
      {subLabelView}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={classnames('form-control', {'is-invalid': error})}
        name={field}
        placeholder={placeholder}
      />
      {errorView}
    </div>
  )
}

TextfieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  layout: PropTypes.number,
  value: 
    PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number]),
  error: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default TextfieldGroup