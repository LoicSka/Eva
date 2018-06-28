import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from 'react-router-dom'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Overdrive from 'react-overdrive'

import TutorAccountForm from './TutorAccountForm'
import UserAccountForm from './UserAccountForm'
import ResetPasswordForm from './ResetPasswordForm'
import AccountCalendar from './AccountCalendar'
import { isEmpty, values, flattenDeep } from 'lodash'
import ThumbnailAvatar from '../components/ThumbnailAvatar'
import TutorAccountDetailsView from './TutorAccountDetailsView'
import classnames from 'classnames'
import * as qs from 'query-string'
import { loadTutorAccount, showCalendarModal, showBookingFormModal } from '../actions'
import Container from './Container';


class TutorAccountPage extends Component {

    showBookingFormModal = (props) => {
        const { showBookingFormModal, location: { search } } = props
        const bookingData = qs.parse(search)
        const { turorAccountId = null, studentId = null, enabledDays = null, bookedDays = null } = bookingData
        if (turorAccountId && studentId && enabledDays) {
            showBookingFormModal(studentId, turorAccountId, flattenDeep([enabledDays]), bookedDays)
        }
    }

    showCalendarModal = (props) => {
        const { showCalendarModal, location: { search } } = props
        const bookingData = qs.parse(search)
        const { calendar = null, enabledDays = null, bookedDays = null } = bookingData
        if (calendar) {
            showCalendarModal(enabledDays, bookedDays)
        }
    }

    componentDidMount() {
        const { loadTutorAccount, location: { search }, match: { params: { tutorAccountId }}} = this.props
        loadTutorAccount(tutorAccountId)
        if (!isEmpty(search)) {
            this.showBookingFormModal(this.props)
            this.showCalendarModal(this.props)
        }
    }

    componentWillReceiveProps = (newProps) => {
        const { location: { search } } = newProps
        if (!isEmpty(search) && search !== this.props.location.search) {
            this.showBookingFormModal(newProps)
            this.showCalendarModal(newProps)
        }
    }

    render() {
        const { translate, currentLanguage, tutorAccount, location: { search = {} } } = this.props
        const { studentId } = qs.parse(search)
        return (
            <Container verifiedRestrict={false}  className='container'>
                <div style={{minHeight: '100vh'}} className={`row justify-content-center ${currentLanguage}`}>
                    <div style={{marginTop: '100px'}} className='col-12 col-md-10'>
                        <Overdrive id='card-ctn'>
                            <div className='card'>
                                <div className='card-body'>
                                    <TutorAccountDetailsView 
                                    tutorAccount={tutorAccount} 
                                    navigateTo={ 
                                        (pathname) => { 
                                            this.props.history.push(pathname) 
                                        } 
                                    } 
                                    studentId={studentId}
                                    />
                                </div>
                            </div>
                        </Overdrive>    
                    </div>
                </div>
            </Container>
        )
    }
}

TutorAccountPage.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    tutorAccountId: PropTypes.string,
    isAuthenticated: PropTypes.bool,
    user: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
    const { match: { params: { tutorAccountId }} } = ownProps
    const { account: { isAuthenticated, user }, entities: { tutorAccounts } } = state
    return {
        isAuthenticated,
        user,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code,
        tutorAccount: tutorAccounts[tutorAccountId] || {}
    }
}

export default withRouter(connect(mapStateToProps,{ loadTutorAccount, showCalendarModal, showBookingFormModal })(TutorAccountPage))