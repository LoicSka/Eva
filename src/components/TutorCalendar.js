import React, { Component } from 'react'
import DayPicker from 'react-day-picker'
import PropTypes from 'prop-types'
import { difference, filter } from 'lodash'
import MomentLocaleUtils, { formatDate, parseDate } from 'react-day-picker/moment';
import 'moment/locale/zh-cn'

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
  
class TutorCalendar extends Component {
    render() {
        const { locale = 'zh-cn', onDayClick = null , selectedDays = [], bookedDays = [] } = this.props
        const pastDays = filter(selectedDays, (day) => { return new Date() >= day})
        var { enabledDays = [] } = this.props 
        enabledDays = enabledDays.map((day) => Number(day))
        return (
            <DayPicker
                locale={locale}
                modifiers={{ 
                    disabled: { daysOfWeek: difference([0,1,2,3,4,5,6], enabledDays) },
                    off: bookedDays,
                    selected: selectedDays,
                    past: pastDays
                }}
                modifiersStyles={modifiersStyles}
                selectedDays={selectedDays}
                onDayClick={onDayClick}
            />
        )
    }
}
  
TutorCalendar.prototypes = {
    locale: PropTypes.string,
    selectedDays: PropTypes.array,
    bookedDays: PropTypes.array,
    enabledDays: PropTypes.array,
}
  
export default TutorCalendar