import React, { Component }  from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

class SelectfieldGroup extends Component {
  componentDidMount() {
    const { defaultValue = null, value = null } = this.props
    if (!value) {

    }
  }
  render() {
    const { defaultValue = { value: null, name: null }, options, onChange, label = null, subLabel = null, layout = null, type, value, error, classNames, field, placeholder } = this.props
    var optionValues = options.map((el) => {
      const name = typeof (el) === 'object' ? el.name : el
      const value = typeof (el) === 'object' ? el.value : el
      return (
        <option key={value} onChange={onChange} value={value}>{name}</option>
      )
    })

    optionValues.splice(0, 0, <option key={defaultValue.value} onChange={onChange} value={defaultValue.value}>{defaultValue.name}</option>)
    const labelView = label ? <label>{label}</label> : null
    const subLabelView = subLabel ? <p className='sub-label'>{subLabel}</p> : null
    return (
      <div className={classnames('form-group', { [`col-md-${12 / layout}`]: typeof (layout) !== 'undefined' })}>
        {labelView}
        {subLabelView}
        <select
          type={type}
          value={value}
          onChange={onChange}
          className={classnames('form-control', { 'is-invalid': error }, classNames)}
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
}

SelectfieldGroup.propTypes = {
  defaultValue: PropTypes.object,
  classNames: PropTypes.string,
  field: PropTypes.string.isRequired,
  label: PropTypes.string,
  subLabel: PropTypes.string,
  layout: PropTypes.number,
  value: PropTypes.any,
  error: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
}

export default SelectfieldGroup