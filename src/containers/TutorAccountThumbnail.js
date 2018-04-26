import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import image from '../styles/images/IMG_0296.jpg'
import { times, constant } from 'lodash'
import ThumbnailAvatar from '../components/ThumbnailAvatar'

class TutorAccountThumbnail extends Component {

  render() {
    const { avatar = image, fullName, age, location, rating, classesCount, experience, coursesCount, isPro, translate } = this.props
    const stars = times(Number(rating), constant('⭐'))
    
    return (
      <div className='panel thumbnail-ctn'>
        <div className='thumbnail-bg'></div>
        <div className='thumbnail-curve'></div>
        <div className='avatar-ctn'>
          <ThumbnailAvatar imageSrc={avatar} showProBadge={true} />
          <div>
            <p className='text-ctn'><strong>{`${fullName}, ${age}`}</strong></p>
          </div>
          <div>
            <p className='text-ctn'>{location ? `📍${location}` : null}</p>
          </div>
          <div>
            <p className='text-ctn'>{stars}</p>
          </div>
          <div>
            <button className='btn btn-sm btn-success'>{translate('tutorAccounts.bookMe')}</button>
          </div>
          <div className='thumbnail-numbers-ctn'>
            <div className='thumbnail-number'>
              <h4>{classesCount}</h4>
              <p>{coursesCount === 1 ? translate('tutorAccounts.class') : translate('tutorAccounts.classes')}</p>
            </div>
            <div className='thumbnail-number'>
              <h4>{`${experience ? experience : '0-1'}Y`}</h4>
              <p>{translate('tutorAccounts.experience')}</p>
            </div>
            <div className='thumbnail-number'>
              <h4>{coursesCount}</h4>
              <p>{coursesCount === 1 ? translate('tutorAccounts.course') : translate('tutorAccounts.courses')}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

TutorAccountThumbnail.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string,
  age: PropTypes.string,
  rating: PropTypes.string,
  classesCount: PropTypes.string,
  experience: PropTypes.string,
  coursesCount: PropTypes.string,
  location: PropTypes.string,
  isPro: PropTypes.bool,
  translate: PropTypes.func
}

const mapSateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapSateToProps)(TutorAccountThumbnail);