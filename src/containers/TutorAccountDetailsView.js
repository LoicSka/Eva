import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { connect } from 'react-redux'
import { StyleSheet, css } from 'aphrodite'
import Overdrive from 'react-overdrive'
import * as qs from 'query-string'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

import ThumbnailAvatar from '../components/ThumbnailAvatar'
import RateTutorView from './RateTutorView'
import AboutTutorView from '../components/AboutTutorView'
import NumbersBox from '../components/NumbersBox'
import ReviewList from './ReviewList'
import TutorCalendar from '../components/TutorCalendar'

class TutorAccountDetailsView extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedTabIndex: 0
        }
    }

    handleShowBookingForm = () => {
        const { tutorAccount: { id, daysAvailable, bookedDays }, studentId, navigateTo } = this.props
        navigateTo(`/tutor/${id}/${studentId}?${qs.stringify({turorAccountId: id, studentId, enabledDays: daysAvailable, bookedDays})}`)
    }

    handleShowCalendar = () => {
        const { tutorAccount: { id, daysAvailable, bookedDays }, studentId, navigateTo } = this.props
        navigateTo(`/tutor/${id}/${studentId}?${qs.stringify({calendar: true, enabledDays: daysAvailable, bookedDays})}` )
    }

    render() {
        const { translate, currentLanguage, regions, tutorAccount, tutorAccount: { bookings = [], id, avatarUrl, fullName, district, rating, reviewCount, studentCount, confirmedBookingCount , isPro, daysAvailable, bookedDays }} = this.props
        const region = regions[this.props.tutorAccount.region] || {}
        const { cityName = [] } = region
        const regionName = `${district}, ${cityName[ currentLanguage === 'en' ? 0 : 1 ]}`
        return (
            <div className={`${currentLanguage}`}>
                <div className='row'>
                    <div className='col-12 col-sm-4 numbers-box-ctn p-3 order-12 order-sm-1'>
                        <NumbersBox reviewCount={reviewCount} bookingCount={confirmedBookingCount} studentCount={studentCount} translate={translate} currentLanguage={currentLanguage} size='md' />
                    </div>
                    <div className='col-12 col-sm-4 order-1 order-sm-2'>
                        <div className={`row ${css(styles.userAvatarCtn)}`}>
                            <Overdrive id='avatar' className='tutor-account-avatar-ctn'>
                                <ThumbnailAvatar width={60} imageSrc={avatarUrl} showProBadge={isPro} />
                            </Overdrive>
                        </div>
                        <div className='d-flex flex-column justify-content-center align-items-center user-dets-ctn'>
                            <h3>{fullName}</h3>
                            <h4>{regionName}</h4>
                            <RateTutorView tutorAccountId={id} rating={rating} currentLanguage={currentLanguage} translate={translate} />
                        </div>
                    </div>
                    <div className='col-12 col-sm-4 p-2 order-2 order-sm-3'>
                        <div className='d-flex flex-row justify-content-center'>
                            <button style={{fontSize: '.85rem'}} onClick={this.handleShowBookingForm} className='btn btn-success mr-2'>{translate('tutorAccounts.bookMe')}</button>
                            <button style={{fontSize: '.85rem'}} onClick={this.handleShowCalendar} className='btn btn-default mx-2'>📆</button>
                        </div>
                    </div>
                </div>
                <div className='row justify-content-center'>
                    <div className="col-12 col-sm-10">
                    <Tabs defaultIndex={this.state.selectedTabIndex} onSelect = {(index) => {this.setState({selectedTabIndex: index})} }>
                        <TabList>
                            <Tab>{translate('tutorAccounts.aboutMe')}</Tab>
                            <Tab>{translate('tutorAccounts.reviews')}</Tab>
                            <Tab>{translate('tutorAccounts.calendar')}</Tab>
                        </TabList>
                        <TabPanel>
                            <AboutTutorView tutorData={tutorAccount} translate={translate} currentLanguage={currentLanguage} />
                        </TabPanel>
                        <TabPanel>
                            <div style={{maxHeight: '70vh', overflowY: 'scroll'}}>
                                <ReviewList reviewCount={reviewCount} tutorAccountId={id} isCountVisible={false} />
                            </div>
                        </TabPanel>
                        <TabPanel>
                            <div style={{minHeight: '50vh', overflowY: 'scroll'}} className="sc-2 d-flex justify-content-center align-items-center">
                                <TutorCalendar bookedDays={bookedDays} enabledDays={daysAvailable} locale={currentLanguage} />
                            </div>
                        </TabPanel>
                    </Tabs>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = StyleSheet.create({
    numbersBox: {
        textAlign: 'center',
    },
    numbersBoxHeader: {
        fontSize: '2.1rem',
        margin: '0'
    },
    numbersBoxSubHeader: {
        fontSize: '.7rem',
        textTransform: 'uppercase',
        margin: '0'
    },
    userDetails: {
        textAlign: 'center'
    },
    userAvatarCtn: {
        position: 'relative',
        height: '50px'
    }
})

TutorAccountDetailsView.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    tutorAccountId: PropTypes.string
}

const mapStateToProps = (state) => {
    const { entities: { regions, bookings } } = state
    return {
        regions,
        bookings,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default connect(mapStateToProps)(TutorAccountDetailsView)
