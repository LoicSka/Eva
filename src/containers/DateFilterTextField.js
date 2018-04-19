import React, { Component } from 'react'
import PropTypes from 'prop-types'
import DatePickerTextfield from '../components/DatePickerTextfield'
import NavHeader from '../components/NavHeader'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'

class DateFilterTextfield extends Component {
  constructor(props) {
    super(props)
    this.handleDayChange = this.handleDayChange.bind(this)
  } 

  handleDayChange = (day, modifiers) => {
    const { handleFilter } = this.props
    handleFilter({day: `${day.getTime()}`})
  }

  render() {
    const { title } = this.props
    const { selectedDay = null } = this.props
    const header = title ? <NavHeader isTop={true} title={title} /> : null
    return (
      <div>
        {header}
        <DatePickerTextfield selectedDay={selectedDay} onDayChange={this.handleDayChange}/>
      </div>
    )
  }
}

DateFilterTextfield.prototypes = {
  title: PropTypes.string,
  selectedDay: PropTypes.object
}

export default DateFilterTextfield;