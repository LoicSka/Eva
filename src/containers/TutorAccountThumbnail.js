import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { times, constant } from 'lodash'
import { Link } from 'react-router-dom'
import Overdrive from 'react-overdrive'
import * as qs from 'query-string'

import ThumbnailAvatar from '../components/ThumbnailAvatar'
import RateTutorView from './RateTutorView'
import NumbersBox from '../components/NumbersBox'

class TutorAccountThumbnail extends Component {
  handleShowBookingForm = () => {
    const { tutorAccount: { id, daysAvailable, bookedDays }, studentId, navigateTo } = this.props
    navigateTo('/match/' + studentId + '?' + qs.stringify({turorAccountId: id, studentId, enabledDays: daysAvailable, bookedDays}))
  }

  handleShowCalendar = () => {
    const { tutorAccount: { daysAvailable, bookedDays }, studentId, navigateTo } = this.props
    navigateTo(`/match/${studentId}?${qs.stringify({calendar: true, enabledDays: daysAvailable, bookedDays})}` )
  }

  render() {
    const { tutorAccount: { id, avatarUrl, fullName, district, rating, reviewCount, studentCount, confirmedBookingCount , isPro }, translate, currentLanguage, regions, showTutorView, showTutorCalendar } = this.props
    const region = regions[this.props.tutorAccount.region]
    const { cityName } = region
    const regionName = `${district}, ${cityName[ currentLanguage === 'en' ? 0 : 1 ]}`
    return (
      <div onClick={showTutorView} className='card thumbnail-ctn'>
        <div className='card-body avatar-ctn'>
          <Overdrive id='avatar'>
            <ThumbnailAvatar width={95} imageSrc={avatarUrl} showProBadge={isPro}/>
          </Overdrive>
          <div className='user-dets d-flex flex-column align-items-center justify-content-center mt-2'>
            <h3 style={{fontSize: '1.4rem'}}>{fullName}</h3>
            <h4 className='mb-0'>{regionName}</h4>
          </div>
          <RateTutorView tutorAccountId={id} rating={rating} currentLanguage={currentLanguage} translate={translate}  />
          <div className='d-flex flex-row align-items-center justify-content-center mb-4'>
            <button onClick={this.handleShowBookingForm} className='btn btn-success'>{translate('tutorAccounts.bookMe')}</button>
            <button onClick={this.handleShowCalendar} style={{fontSize: '1.3rem', paddingLeft: '12px', paddingRight: '12px', paddingTop: '3px', paddingBottom: '1px' }} className='btn btn-default bordered ml-2'>📆</button>
          </div>
          <NumbersBox reviewCount={reviewCount} bookingCount={confirmedBookingCount} studentCount={studentCount} translate={translate} currentLanguage={currentLanguage} size='lg' />
        </div>
      </div>
    )
  }
}

TutorAccountThumbnail.propTypes = {
  tutorAccount: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  regions: PropTypes.object,
  navigateTo: PropTypes.func,
  showTutorView: PropTypes.func
}


const mapStateToProps = (state, ownProps) => {
  const { entities: { regions } } = state
  return {
      regions
  }
}

export default connect(mapStateToProps)(TutorAccountThumbnail)