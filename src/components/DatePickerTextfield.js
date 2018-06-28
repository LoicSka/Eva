import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { difference } from 'lodash'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/zh-cn'

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

const modifiersStyles = {
  disabled: {
      color: '#8D9BAC',
      backgroundColor: '#F6F7F9'
  },
  off: {
      color: '#8D9BAC',
      backgroundColor: '#F6F7F9'
  },
  selected: {
      color: 'white',
      backgroundColor: '#3C7AF4',
      borderRadius: '0'
  },
  past: {
      color: 'white',
      backgroundColor: '#8D9BAC',
  }
};

class DatePickerTextfield extends Component {
  render() {
    const { selectedDay, enabledDays = [], bookedDays = [], onDayChange } = this.props
    const locale = this.props.locale === 'cn' ? 'zh-cn' : this.props.locale
    return (
      <DayPickerInput
        onDayChange={onDayChange}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder={`${formatDate(new Date())}`}
        dayPickerProps={{
          locale,
          localeUtils: MomentLocaleUtils,
          modifiers: {
          disabled: { daysOfWeek: difference([0,1,2,3,4,5,6], enabledDays) },
          off: bookedDays,
          selected: [selectedDay]
          },
          modifiersStyles: modifiersStyles
        }}
      />
    )
  }
}

DatePickerTextfield.prototypes = {
  locale: PropTypes.string,
  selectedDay: PropTypes.string,
  bookedDays: PropTypes.array,
  enabledDays: PropTypes.array,
}

export default DatePickerTextfield
