import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const SelectfieldGroup = (
  { field, value, error, placeholder, type, onChange, options, layout, label, subLabel }) => {

  var optionValues = options.map((el) => {
    const name = typeof(el) === 'object' ? el.name : el
    const value = typeof (el) === 'object' ? el.value : el
    return (
      <option key={value} onChange={onChange} value={value}>{name}</option>
    )
  })
  
  optionValues.splice(0, 0, <option onChange={onChange} value={null}></option>)
  return (
    <div className={classnames('form-group', { [`col-md-${12 / layout}`]: typeof (layout) !== 'undefined' })}>
      <label>{label}</label>
      <p className='sub-label'>{subLabel}</p>
      <select
        type={type}
        value={value}
        onChange={onChange}
        className={classnames('form-control', { 'is-invalid': error })}
        name={field}
        placeholder={placeholder}
      >
        {optionValues}
      </select>
      <div className="invalid-feedback">
        {error}
      </div>
    </div>
  )
}

SelectfieldGroup.propTypes = {
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
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectfieldGroup