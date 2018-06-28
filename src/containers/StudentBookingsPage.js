import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import moment from 'moment'
import 'moment/locale/zh-cn'
import { filter, values } from 'lodash'
import Separator from '../components/Separator'
import StudentBooking from '../components/StudentBooking'
import Loader from '../components/Loader'
import EmptyView from '../components/EmptyView'
import Container from './Container'

import { loadBookingsForStudent, loadBookingsForUser, cancelBooking, showBookingMenu } from '../actions'

class StudentBookingsPage extends Component {
    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? moment.locale('zh-cn') : moment.locale('en')
    }

    handleLoadBookings = () => {
        const { match: { params: { studentId = null } }, loadBookingsForStudent, loadBookingsForUser, nextPage } = this.props
        studentId ? loadBookingsForStudent(studentId, nextPage) : loadBookingsForUser(nextPage)
    }

    componentWillReceiveProps = (newProps) => {
        const { loadBookingsForStudent, loadBookingsForUser, match: { params: { studentId = null, bookingCount = 0 } } } = newProps
        this.setupLocale()
        if ( bookingCount !== this.props.match.params.bookingCount ) {
            studentId ? loadBookingsForStudent(studentId) : loadBookingsForUser()
        }
    }

    componentDidMount = () => {
        const { loadBookingsForStudent, loadBookingsForUser, match: { params: { studentId = null } } } = this.props
        this.setupLocale()
        studentId ? loadBookingsForStudent(studentId) : loadBookingsForUser()
    }

    bookingListFor = (bookings) => {
        const { currentLanguage, translate, cancelBooking, showBookingMenu, history } = this.props
        const bookingList = bookings.map((booking) => {
            const handleShowTutor = () => { history.push(`/tutor/${booking.tutorAccount.id}?studentId=${booking.student.id}`)}
            return (
            <StudentBooking
            translate={translate}
            currentLanguage={currentLanguage}
            booking={booking}
            cancelBooking={cancelBooking}
            showTutor={handleShowTutor}
            tutorAccount={booking.tutorAccount || {}}
            showBookingMenu={showBookingMenu}
            key={booking.id}
            /> )
        })
        return (
            <div className="mb-3">
                {bookingList}
            </div>
            )
    }

    render() {
        const { bookings = [], isFetching = false, currentLanguage, translate, match: { params: { studentId = null, bookingCount = 0 } }} = this.props
        const loader = isFetching ? <Loader/> : null
        const moreButton = isFetching || Number(bookingCount) === 0 ? null : (
            <div className='d-flex flex-row justify-content-center align-items-center'>
                <button onClick={this.handleLoadBookings} className="btn btn-link btn-sm">{translate('userActions.loadMore')}</button>
            </div>
        )
        const emptyView = (isFetching === false && Number(bookingCount) === 0) ? (
            <EmptyView message={translate('dashboard.noBookings')}/>
        ) : null
        const oldBookings = filter(bookings, (booking) => {
            return new Date(booking.time) < new Date() 
        })

        const canceledBookings = filter(bookings, (booking) => {
            return (new Date(booking.time) > new Date() && ['declined', 'canceled'].includes(booking.state) )
        })

        const upcommingBookings = filter(bookings, (booking) => {
            return new Date(booking.time) > new Date() && booking.state === 'confirmed'
        })

        const newBookings = filter(bookings, (booking) => {
            return new Date(booking.time) > new Date() && ['pending'].includes(booking.state)
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
            <Container className={`container ${currentLanguage}`}>
                 <div style={{paddingTop: '50px'}}  className="row justify-content-center align-items-center">
                    <div className="col-12 col-sm-6 mt-0 mt-sm-4">
                        <div className="card">
                            <div className="card-body">
                                <div style={{width: '100%'}} className='d-flex flex-column booking-list'>
                                    {Number(bookingCount) > 0 ? <h3 style={{fontSize: '1.3rem'}} className='mt-2 mx-lg-2' >{`${translate('dashboard.bookings')} (${ bookingCount })`}</h3> : null}
                                    {newBookingList}
                                    {upcommingBookingList}
                                    {canceledBookingList}
                                    {oldBookingList}
                                    {loader}
                                    {moreButton}
                                    {emptyView}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }
}

StudentBookingsPage.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    studentId: PropTypes.string,
    bookings: PropTypes.object,
    isFetching: PropTypes.bool,
    nextPage: PropTypes.number,
    bookingIds: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
    const { match: { params: { studentId = null, bookingCount } } }= ownProps
    const { account: { user: { id } }, entities: { bookings }, pagination: { paginatedStudentBookings, paginatedUserBookings } } = state
    const pagination = studentId ? (typeof(paginatedStudentBookings[studentId]) === 'undefined' ? {} : paginatedStudentBookings[studentId]) : (typeof(paginatedUserBookings[id]) === 'undefined' ? {} : paginatedUserBookings[id])
    const { ids = [], isFetching, nextPage } = pagination
    return {
        bookings: studentId ? filter(values(bookings), (booking) => ids.includes(booking.id)) : values(bookings),
        isFetching,
        nextPage,
        bookingCount,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, {loadBookingsForStudent, cancelBooking, loadBookingsForUser, showBookingMenu})(StudentBookingsPage))

