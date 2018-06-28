import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { StyleSheet, css } from 'aphrodite'
import moment from 'moment'
import classnames from 'classnames'
import 'moment/locale/zh-cn'
import { filter } from 'lodash'

import Separator from '../components/Separator'
import BookingDropDown from '../containers/BookingDropDown'

import more from '../styles/images/more.svg'

class StudentBooking extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        const { showBookingMenu, booking: {id}, showTutor, cancelBooking } = this.props
        const actions = [{label: 'Cancel booking', onClick: () => { cancelBooking(id) }}, {label: 'Tutor details', onClick: () => { showTutor() }}]
        showBookingMenu(actions, id)
    }

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    componentDidMount = () => {
        this.setupLocale()
    }

    render() {
        const { booking: { tutorAccount: {fullName}, id, time, updatedAt, state, estimatedCost, address, duration }, currentLanguage, translate, cancelBooking, showTutor } = this.props
        const timestamp = moment(updatedAt).format('L')
        const date = moment(time).format('MMM Do YYYY, h:mm A')
        const isPast = new Date(time) <= new Date()

        return (
            <div onClick={this.handleClick} className='d-flex menu-toggle flex-column mx-0 mx-sm-2'>
                <div style={{width: '100%', cursor: 'pointer', position: 'relative'}} className='menu-toggle d-flex flex-row justify-content-between align-items-stretch my-3'>
                    <div className='d-flex flex-column ml-1 ml-sm-3'>
                        <p className='medium m-0 p-0'>{ fullName }</p>
                        <p className='sub-label'>{ date }</p>
                        <span className='align-self-start badge badge-pill badge-light bordered'>{state.toUpperCase()}</span>
                    </div>
                    <div className='d-flex flex-column ml-auto justify-content-between mr-1 mr-sm-3'>
                        <img style={{height: 'auto', width: '18px'}} src={more} className='menu-toggle align-self-end my-1' alt='more'/>
                        <p className='sub-label mb-0'>{timestamp}</p>
                    </div>
                    <BookingDropDown isResponsive={false} bookingId={id} />
                </div>
                <Separator classes={null} />
            </div>
        )

    }
}

StudentBooking.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    booking: PropTypes.object,
    showTutor: PropTypes.func,
    cancelBooking: PropTypes.func,
    showBookingMenu: PropTypes.func
}

export default StudentBooking