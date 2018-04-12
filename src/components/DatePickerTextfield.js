import React, { Component } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import PropTypes from 'prop-types'

import 'react-day-picker/lib/style.css'

class DatePickerTextField extends Component {
  render() {
    return (
      <DayPickerInput/>
    )
  }
}

export default DatePickerTextField
