import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/zh-cn'

import 'react-day-picker/lib/style.css'

const modifiersStyles = {
  selectedDay: {
    color: 'white',
    backgroundColor: '#5C8CEB',
  },
};

class DatePickerTextField extends Component {

  render() {
    const { locale = 'zh-cn', label, onDayChange, selectedDay } = this.props
    return (
        <DayPicker
          locale={locale}
          modifiers={{ selectedDay: selectedDay}}
          modifiersStyles={modifiersStyles}
          selectedDays={selectedDay}
          onDayClick={onDayChange} />
    )
  }
}

DatePickerTextField.prototypes = {
  locale: PropTypes.string
}

export default DatePickerTextField
