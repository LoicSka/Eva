import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { filter, values } from 'lodash'

import Separator from '../components/Separator'
import TutorBooking from '../components/TutorBooking'
import Loader from '../components/Loader'
import EmptyView from '../components/EmptyView'

import { loadBookingsForAccount, confirmBooking, declineBooking, cancelBooking } from '../actions'

class TutorBookingList extends Component {
    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    handleLoadBookings = () => {
        const { tutorAccountId, loadBookingsForAccount, nextPage } = this.props
        loadBookingsForAccount(tutorAccountId, nextPage)
    }

    componentDidMount = () => {
        const { loadBookingsForAccount, tutorAccountId } = this.props
        this.setupLocale()
        loadBookingsForAccount(tutorAccountId)
    }

    bookingListFor = (bookings) => {
        const { currentLanguage, translate, confirmBooking, declineBooking, cancelBooking } = this.props
        const bookingList = bookings.map((booking) => {
            return (
            <TutorBooking 
            translate={translate} 
            currentLanguage={currentLanguage} 
            booking={booking} confirmBooking={confirmBooking} 
            cancelBooking={cancelBooking} 
            declineBooking={declineBooking} 
            /> )
        })
        return (
            <div className="mb-3">
                {bookingList}
            </div>
            )
    }

    render() {
        const { bookings = [], isFetching = true, currentLanguage, translate, bookingCount = 0 } = this.props
        const loader = isFetching ? <Loader/> : null
        const moreButton = isFetching || bookingCount === 0 ? null : (
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <button onClick={this.handleLoadBookings} className="btn btn-link btn-sm">{translate('userActions.loadMore')}</button>
            </div>
        )
        const emptyView = !isFetching && bookingCount === 0 ? (
            <EmptyView message={translate('dashboard.noBookings')}/>
        ) : null
        const oldBookings = filter(bookings, (booking) => {
            return new Date(booking.time) < new Date() 
        })

        const upcommingBookings = filter(bookings, (booking) => {
            return new Date(booking.time) > new Date() && booking.state === 'confirmed'
        })

        const newBookings = filter(bookings, (booking) => {
            return new Date(booking.time) > new Date() && ['pending'].includes(booking.state)
        })

        const canceledBookings = filter(bookings, (booking) => {
            return (new Date(booking.time) > new Date() && ['declined', 'canceled'].includes(booking.state) )
        })
        
        const oldBookingList = oldBookings.length > 0 ? (
            <div className="d-flex flex-column">
                <Separator title={translate('dashboard.past')}/>
                { this.bookingListFor(oldBookings) }
            </div>
        ) : null

        const canceledBookingList = canceledBookings.length > 0 ? (
            <div className="d-flex flex-column">
                <Separator title={translate('dashboard.canceled')}/>
                { this.bookingListFor(canceledBookings) }
            </div>
        ) : null

        const upcommingBookingList = upcommingBookings.length > 0 ? (
            <div className="d-flex flex-column">
                <Separator title={translate('dashboard.upcomming')}/>
                { this.bookingListFor(upcommingBookings) }
            </div>
        ) : null

        const newBookingList = newBookings.length > 0 ? (
            <div className="d-flex flex-column">
                <Separator title={translate('dashboard.new')}/>
                { this.bookingListFor(newBookings) }
            </div>
        ) : null

        return (
            <div className='d-flex flex-column booking-list'>
                {bookingCount > 0 ? <h3 style={{fontSize: '1.3rem'}} className='mt-2 mx-lg-2' >{`${translate('dashboard.bookings')}  (${ bookingCount })`}</h3> : null}
                {newBookingList}
                {upcommingBookingList}
                {canceledBookingList}
                {oldBookingList}
                {loader}
                {moreButton}
                {emptyView}
            </div>
        )
    }
}

TutorBookingList.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    tutorAccountId: PropTypes.string,
    bookings: PropTypes.object,
    isFetching: PropTypes.bool,
    nextPage: PropTypes.number,
    bookingIds: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    const { tutorAccountId } = ownProps
    const { entities: { bookings }, pagination: { paginatedTutorBookings } } = state
    const { ids = [], isFetching, nextPage } = typeof(paginatedTutorBookings[tutorAccountId]) === 'undefined' ? {} : paginatedTutorBookings[tutorAccountId]
    return {
        bookings: filter(values(bookings), (booking) => ids.includes(booking.id)),
        isFetching,
        nextPage,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps, {loadBookingsForAccount, confirmBooking, declineBooking, cancelBooking})(TutorBookingList)

