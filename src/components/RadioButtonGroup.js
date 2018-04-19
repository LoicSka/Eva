import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import NavHeader from './NavHeader'

class RadioButtonGroup extends Component {

  render() {
    const { options, handleSelect, activeOption, title = null } = this.props
    const buttons = options.map((option) => {
      const { value = null, label = null } = option
      const activeValue = activeOption ? activeOption.value : null
      const isActive = value === activeValue
      const handleChange = () => {
        handleSelect(option)
      }
      return (
        <div key={option.value} className="btn-group-toggle">
          <label className={classnames('btn btn-toggle', { ['active']: isActive})}>
            <input value={value} onClick={handleChange} type="checkbox" autocomplete="off"/>
            {label}
          </label>
        </div>
      )
    })
    const header = title ? <NavHeader title={title} /> : null
    return(
      <div>
        {header}
        <div className='radio-btn-group filter-group'>
            {buttons}
        </div>
      </div>
    )
  }
}

RadioButtonGroup.propTypes = {
  title: PropTypes.string,
  handleSelect: PropTypes.func,
  options: PropTypes.arrayOf(PropTypes.object)
}

export default RadioButtonGroup