import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import PropTypes from 'prop-types'
import { omit, values, merge, filter, includes, range, flattenDeep } from 'lodash'
import { connect } from 'react-redux'

import SelectfieldGroup from '../components/SelectfieldGroup'
import TextfieldGroup from '../components/TextfieldGroup'
import DatePickerTextfield from '../components/DatePickerTextfield'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'
import 'moment/locale/zh-cn'
import BookingSuccess from '../components/BookingSuccess'
import Loader from '../components/Loader'

import validateBookingInput from '../validations/bookingValidations'
import { createBooking, updateBooking, hideVisibleModal, resetBookings } from '../actions'

class BookingForm extends Component {
    constructor(props) {
        super(props)
        this.state = this.initialState()
        this.handleDayChange = this.handleDayChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    isValid = () => {
        const { errors, isValid } = validateBookingInput(this.state)
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid
    }

    onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })
    getTranslation = value => value && typeof(value) !== 'undefined' ? this.props.translate(value) : null
    
    handleDayChange(day) {
        this.setState({ selectedDay: day });
    }

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    handleSelectChange = daysOfWeek => {
        this.setState({ daysOfWeek })
    }

    initialState = () => {
        return {
            phoneNumber: '',
            address: '',
            selectedDay: null,
            daysOfWeek: [],
            from: '',
            to: '',
            singleDay: true,
            errors: {},
            isLoading: false,
            id: null,
            updatedAt: null,
            success: false,
            estimatedCost: null,
            }
    }
    
    formatedState = () => {
        const { tutorAccountId, studentId } = this.props
        const { phoneNumber, address, daysOfWeek, from, to } = this.state
        var time = this.state.selectedDay
        time.setHours(Number(from))
        const duration = to - from
        return {
            duration,
            time,
            address,
            phoneNumber,
            tutorAccountId,
            studentId
        }
    }

    handleSubmit(e) {
        e.preventDefault()
        const { createBooking, updateBooking } = this.props
        const { id } = this.state
        let valid = this.isValid()
        if (this.isValid()) {
            this.setState({ isLoading: true })
            const bookingData = this.formatedState()
            id ? updateBooking(id, bookingData) : createBooking(bookingData)
        }
    }

    componentWillReceiveProps = (newProps) => {
        const { isVisible, bookings, resetBookings } = newProps
        const bookingArray = values(bookings)
        const latestBooking = bookingArray[bookingArray.length - 1] || {}
        const { updatedAt = null } = latestBooking
        this.setupLocale()
        if (isVisible !== this.props.isVisible) {
            this.setState(this.initialState())
            // resetBookings()
        }
        if ( updatedAt !== this.state.updatedAt && bookingArray.length !== values(this.props.bookings).length && values(this.props.bookings).length !== 0 ) {
            this.setState({success: true, id: latestBooking.id, updatedAt: latestBooking.updatedAt, estimatedCost: latestBooking.estimatedCost })
        }
    }

    componentDidMount = () => {
        this.setupLocale()
        this.setState(this.initialState())
    }

    render() {
        const { phoneNumber, address, estimatedCost, selectedDay, from, to, errors, singleDay, daysOfWeek, isLoading, success } = this.state
        const { translate, currentLanguage, enabledDays = [], bookedDays = [], hideVisibleModal } = this.props
        const dateError = errors.selectedDay ? (
            <div className='invalid-feedback d-block mt-0'>
                {translate(errors.selectedDay)}
            </div>
        ) : null
        const hours = range(6, 25).map((hour) => {
            return {
                name: `${hour}:00`,
                value: hour
            }
        })
        const weekDays = enabledDays.map((day) => {
            return {
                label: `Every ${translate(`weekDays.${day}`)}`,
                value: day
            }
        })

        const loadingView = isLoading ? (
            <div style={{width: '100%', height: '100%', position: 'absolute', backgroundColor: 'white', zIndex: '2'}} className="absolute-ctn d-flex justify-content-center align-items-center">
                { success ? <BookingSuccess translate={translate} address={address} time={moment(selectedDay).format('MM/DD/YYYY')} weekDays={daysOfWeek.map((day) => `Every ${translate(`weekDays.${day.value}`)}`) } estimatedCost={estimatedCost} from={`${from}:00`} to={`${to}:00`} handleConfirm={hideVisibleModal} handleEdit={() => { this.setState({isLoading: false, errors: {}})}} /> : <Loader /> }
            </div>
        ) : null

        const datePickerView = singleDay ? (
            <DatePickerTextfield onDayChange={this.handleDayChange} bookedDays={flattenDeep([bookedDays]).map((day) => new Date(day))} enabledDays={enabledDays.map((day) => Number(day))} selectedDay={this.state.selectedDay} locale={currentLanguage}/>
        ) : (
            <div className="form-group">
              <Select
                multi
                onChange={this.handleSelectChange}
                options={weekDays}
                placeholder=""
                name="daysOfWeek"
                value={daysOfWeek}
                className="select-form-control"
                closeOnSelect={false}
              />
            </div>
        )

        return (
            <form style={{position: 'relative'}} onSubmit={this.handleSubmit} className={`${currentLanguage}`}>
                {loadingView}
                <div className='px-l-2 mt-2'>
                    <TextfieldGroup
                        error={this.getTranslation(errors.address)}
                        value={address}
                        onChange={this.onChange}
                        field='address'
                        placeholder={translate('bookingFields.address')}
                        type='text'
                        label={`${translate('bookingFields.address')} *`}
                    />
                    <TextfieldGroup
                        error={this.getTranslation(errors.phoneNumber)}
                        value={phoneNumber}
                        onChange={this.onChange}
                        field='phoneNumber'
                        placeholder={translate('bookingFields.phoneNumber')}
                        type='number'
                        label={`${translate('bookingFields.phoneNumber')} *`}
                    />
                    <div className='form-check form-check-inline mb-2 ml-1'>
                        <input className='form-check-input mb-1' checked={this.state.singleDay} onChange={ (e) => {this.setState({singleDay: true})}} type='radio' name='singleDay' id='inlineRadio1' value={true}/>
                        <label className='form-check-label' htmlFor='inlineRadio1'>{translate('bookingFields.date')}</label>
                    </div>
                    <div className='form-check form-check-inline mb-2'>
                        <input className='form-check-input mb-1' checked={!this.state.singleDay} onChange={(e) => {this.setState({singleDay: false})}} type='radio' name='singleDay' id='inlineRadio2' value={false}/>
                        <label className='form-check-label' htmlFor='inlineRadio2'>{translate('bookingFields.weekdays')}</label>
                    </div>
                    {datePickerView}
                    {dateError}
                    <div className='form-row'>
                        <SelectfieldGroup
                            error={this.getTranslation(errors.from)}
                            value={from}
                            onChange={this.onChange}
                            field='from'
                            options={hours}
                            type='text'
                            label={`${translate('bookingFields.from')} *`}
                            layout={2}
                        />
                        <SelectfieldGroup
                            error={this.getTranslation(errors.to)}
                            value={to}
                            onChange={this.onChange}
                            field='to'
                            options={hours}
                            type='text'
                            label={`${translate('bookingFields.to')} *`}
                            layout={2}
                        />
                    </div>
                    <button
                        type='submit'
                        className='btn btn-success btn-block'
                        >{translate('userActions.done')}
                    </button>
                </div>
            </form>
        )
    }
}

BookingForm.propTypes = {
    translate: PropTypes.func.isRequired,
    currentLanguage: PropTypes.string,
    tutorAccountId: PropTypes.string,
    studentId: PropTypes.string,
    isVisible: PropTypes.bool,
    bookings: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const { studentId } = ownProps
    const { entities: { bookings } } = state
    return {
        bookings,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {createBooking, updateBooking, hideVisibleModal, resetBookings})(BookingForm)
