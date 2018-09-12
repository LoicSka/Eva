import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { loadTutorAccount } from '../actions'

import ThumbnailAvatar from '../components/ThumbnailAvatar'
import Stars from '../components/Stars'
import AboutTutorView from '../components/AboutTutorView'
import TutorCalendar from '../components/TutorCalendar'
import ReviewList from './ReviewList'
import TutorBookingList from './TutorBookingList'
import NumbersBox from '../components/NumbersBox'
import cog from '../styles/images/cog.svg'
import down from '../styles/images/down-arrow.svg'
import classnames from 'classnames'
import Container from './Container'

class TutorDashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isSideNavStatic: false,
            isUserCardExpanded: false
        }
    }

    componentDidMount() {
        const { user: { tutorAccountId, isTutor }, loadTutorAccount } = this.props
        const { isSideNavStatic } = this.state
        if (isTutor) {
            loadTutorAccount(tutorAccountId)
        }
    }

    render() {
        const { user, user: { avatarUrl, fullName, tutorAccountId }, regionName, translate, currentLanguage, tutorAccount: { bookings = [], rating = 0, daysAvailable = [], isPro = false, studentCount = null, confirmedBookingCount = null, bookingCount = null, reviewCount = 0, unseenReviewCount = 0, unseenBookingCount = 0 } } = this.props
        const { isUserCardExpanded } = this.state
        const reviewsBadge = unseenReviewCount > 0 ? <span className='notification-badge'>{unseenReviewCount}</span> : null
        const bookingsBadge = unseenBookingCount > 0 ? <span className='notification-badge'>{unseenBookingCount}</span> : null
        const bookingTimes = bookings.map((bookingId) => {
            return new Date(this.props.bookings[`${bookingId}`].time[0])
        })
        const bookingList = bookings.map((bookingId) => {
            return this.props.bookings[`${bookingId}`]
        })

        const dashboardNav = (isHiddenOnSmallDevice) => (
            <div className={classnames('dashboard-nav', {'d-md-block d-none': isHiddenOnSmallDevice}, {'d-md-none': !isHiddenOnSmallDevice}, {'d-lg-block': isHiddenOnSmallDevice}, {'d-lg-none': !isHiddenOnSmallDevice}, {'d-sm-block': !isHiddenOnSmallDevice}, {'d-sm-none': isHiddenOnSmallDevice})}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col-12 col-md-10'>
                            <TabList>
                                <Tab>
                                    <p>{translate('dashboard.bookings')}</p>
                                    {bookingsBadge}
                                </Tab>
                                <Tab>
                                    <p>{translate('dashboard.reviews')}</p>
                                    {reviewsBadge}
                                </Tab>
                                <Tab>{translate('dashboard.account')}</Tab>
                                <Tab>
                                    {translate('dashboard.me')}
                                </Tab>
                            </TabList>
                        </div>
                    </div>
                </div>
            </div>
        )
        return (
            <Container tutorRestrict={true}>
                <Tabs>
                    {dashboardNav(true)}
                    <div className='container my-4 dashboard-ctn'>
                        <div className='d-flex dashboard-content-ctn'>
                            <div className='dashboard-side-nav'>
                                <div className='card bordered mb-4'>
                                    <div className='card-body pb-0 pb-sm-4'>
                                        <div className='d-flex flex-column align-items-center justify-content-center'>
                                            <Link className='settings-link' to='/account/tutor'>
                                                <img style={{width: '17px', height: '17px', position: 'absolute', right: '20px', top: '20px'}} src={cog} alt='setings'/> 
                                            </Link>
                                            <img onClick={() => {this.setState({isUserCardExpanded: !isUserCardExpanded})}} className={classnames('expand-toggle d-block d-sm-none arrow-down', { 'flipped': isUserCardExpanded })} style={{width: '17px', height: '17px', position: 'absolute', left: '17px', top: '17px'}} src={down} alt='setings'/>
                                            <ThumbnailAvatar showProBadge={isPro}  imageSrc={avatarUrl} />
                                            <div className='user-dets d-flex flex-column align-items-center justify-content-center mt-3 mb-0 mb-sm-3'>
                                                <h3>{fullName}</h3>
                                                <h4 className='mb-3'>{regionName}</h4>
                                                <div className={classnames({'d-none': !isUserCardExpanded }, 'd-md-block')}><Stars rating={rating} /></div>
                                            </div>
                                            <div className={classnames({'d-none': !isUserCardExpanded }, 'd-md-block my-3 my-sm-0')}>
                                                <NumbersBox reviewCount={reviewCount} bookingCount={confirmedBookingCount} studentCount={studentCount} translate={translate} currentLanguage={currentLanguage} />
                                            </div>
                                        </div>
                                    </div>
                                    {dashboardNav(false)}
                                </div>
                                <div className='card bordered dashboard-calendar'>
                                    <div className='card-body'>
                                        <TutorCalendar selectedDays={bookingTimes} enabledDays={daysAvailable} />
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{width: '100%'}} className='dashboard-content p-4 ml-sm-4 card bordered'>
                                <TabPanel>
                                    <TutorBookingList bookingCount={bookingCount} tutorAccountId={tutorAccountId} />
                                </TabPanel>
                                <TabPanel>
                                    <ReviewList reviewCount={reviewCount} tutorAccountId={tutorAccountId} />
                                </TabPanel>
                                <TabPanel>
                                </TabPanel>
                                <TabPanel>
                                    <AboutTutorView tutorData={user} translate={translate} currentLanguage={currentLanguage} />
                                </TabPanel>
                            </div>
                        </div>
                    </div>
                </Tabs>
            </Container>
        )
    }
}

TutorDashboardPage.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    user: PropTypes.object,
    regionName: PropTypes.string
}

const mapStateToProps = (state) => {
    const { account = null, account: { user }, entities: { tutorAccounts, bookings } } = state
    const currentLanguage = getActiveLanguage(state.locale).code
    const region = user.regionName || null
    const regionName = region ? `${user.district}, ${user.regionName.split(',')[currentLanguage === 'en' ? 0 : 1]}` : null
    return {
        user,
        bookings,
        regionName,
        tutorAccount: tutorAccounts[`${user.tutorAccountId}`] || {},
        translate: getTranslate(state.locale),
        currentLanguage
    }
}

export default connect(mapStateToProps, { loadTutorAccount })(TutorDashboardPage)