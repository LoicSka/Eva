import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect, Link } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classnames from 'classnames'
import { loadStudent, showBookingFormModal, showCalendarModal } from '../actions'
import { isEmpty, flattenDeep } from 'lodash'
import * as qs from 'query-string'

import Loader from '../components/Loader'
import ThumbnailAvatar from '../components/ThumbnailAvatar'
import TutorAccountThumbnail from './TutorAccountThumbnail'
import oopsEva from '../styles/images/evaoops.svg'

class MatchPage extends Component {

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
        const { loadStudent, location: { search }, match: { params: { studentId }}} = this.props
        loadStudent(studentId)
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
        const { student, student: { matches = [] }, tutorAccounts, studentMatches, regions, user, translate, currentLanguage, showBookingFormModal, match: { params: { studentId }}, showCalendarModal } = this.props
        const loaderView = (
            <div style={{height: '100vh'}} className={`row align-items-center justify-content-center py-4`}>
                <div className='col-4 col-md-1 my-4'>
                    <Overdrive id='card-ctn'>
                        <div className='card d-flex align-items-center justify-content-center my-4'>
                            <Loader />
                        </div>
                    </Overdrive>
                </div>
            </div>
        )
        const matchesList = matches.map((match, index) => {
            const { tutorAccount } = studentMatches[match]
            const handleShowTutorView = (e) => {
                if (e.target.className.indexOf('card-body') !== -1) {
                    this.props.history.push(`/tutor/${tutorAccount}?studentId=${studentId}`)
                }
            }

            return (
                <div key={index} className='col-12 col-lg-4 col-md-6'>
                    <Overdrive id='card-ctn' className='py-3'>
                        <TutorAccountThumbnail 
                        tutorAccount={tutorAccounts[tutorAccount]} 
                        translate={translate} 
                        currentLanguage={currentLanguage} 
                        studentId={studentId} 
                        showTutorView={handleShowTutorView} 
                        navigateTo={ 
                            (pathname) => { 
                                this.props.history.push(pathname) 
                            } 
                        } />
                    </Overdrive>
                </div>
            )
        })

        const noMatchesView = (
            <div className='container'>
                <div className={`d-flex justify-content-center align-items-center flex-column py-4 ${currentLanguage}`}>
                    <ThumbnailAvatar width={80} />
                    <h4 style={{color: 'white', fontSize: '1.7rem'}} className='pt-4 text-center' >{student.fullName}</h4>
                    <h4 className='mt-2 mb-1 mx-2 fm-md match-title-text text-center' >{translate('match.noMatchTitle')}</h4>
                    <div style={{width: '100%'}} className='row justify-content-center align-items-center '>
                        <div className='col-11 col-sm-4'>
                            <Overdrive id='card-ctn' className='py-3'>
                                <div className="card">
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <img style={{width: '110px', height: '110px'}} src={oopsEva} alt="oops"/>
                                        <h4 style={{fontSize: '1.3rem'}} className='text-center m-3' >{translate('match.noMatchSubTitle')}</h4>
                                    </div>
                                </div>
                            </Overdrive>
                        </div>
                    </div>
                </div>
            </div>
        )

        const matchView = isEmpty(student) ? loaderView : ( matches.length > 0 ? (
                <div className='container'>
                    <div className={`d-flex justify-content-center align-items-center flex-column py-4 ${currentLanguage}`}>
                        <ThumbnailAvatar width={80} />
                        <h4 className='pt-4 match-student-text' >{student.fullName}</h4>
                        <h4 className='mt-2 mb-1 fm-md match-title-text' >{translate('match.titleText')}</h4>
                        <div style={{width: '100%'}} className='row justify-content-center align-items-center '>
                            {matchesList}
                        </div>
                        <div className="row justify-content-center align-items-center my-2">
                            <div className="col-11 col-sm-9 d-flex flex-column justify-content-center align-items-center">
                                <p className='fm-lt match-text'>The tutors displayed have been selected specificaly to fit the student's profile, you have up to 3 choices for each student profife you create.</p>
                                <div className='d-flex flex-row justify-content-center align-items-center'>
                                    <button className='btn btn-outline-info fm-lt mr-1 mr-sm-3'>{translate('match.showMore')}</button>
                                    <Link to='/survey/parent' className='btn btn-outline-info fm-lt ml-1 ml-sm-3'>{translate('match.createNew')}</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : noMatchesView
        )
        
        return (
            matchView 
        )
    }
}

MatchPage.proptypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
}

const mapStateToProps = (state, ownProps) => {
    const { match: { params: { studentId }} } = ownProps
    const { account: { isAuthenticated, user }, entities: { students, tutorAccounts, studentMatches } } = state
    return {
        isAuthenticated,
        user,
        student: students[studentId] || {},
        tutorAccounts,
        studentMatches,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, {loadStudent, showBookingFormModal, showCalendarModal})(MatchPage))