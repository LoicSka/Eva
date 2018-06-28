import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const AboutTutorView = ({tutorData = {}, translate, currentLanguage}) => {
    const {
        introduction,
        email = null,
        countryOfOrigin = null,
        occupation = null,
        gender = null,
        phoneNumber = null,
        wechatId = null,
        weiboUrl = null, 
        subjectTitles = [],
        district = null,
        teachingExperience = null,
        hourlyRate = null
    } = tutorData
    return (
        <div className='px-lg-3 py-2 about-tutor'>
            <div id="intro" className="row px-2">
                <p>{introduction}</p>
            </div>
            <div className="about-tutor-content p-3">
                {layoutForField(translate('userFields.countryOfOrigin'), countryOfOrigin)}
                {layoutForField(translate('userFields.email'), email)}
                {layoutForField(translate('userFields.phoneNumber'), phoneNumber)}
                {layoutForField(translate('userFields.wechatId'), wechatId)}
                {layoutForField(translate('userFields.weibo'), weiboUrl)}
                {layoutForField(translate('userFields.hourlyRate'), hourlyRate ? `${hourlyRate}¥` : null)}
                {layoutForField(translate('userFields.teachingExperience'), teachingExperience ? translate('survey.teachingExperience.answer.' + teachingExperience) : null)}
                {layoutForField(translate('userFields.subject'), subjectTitles[currentLanguage === 'en' ? 0 : 1] || null)}
            </div>
        </div>
    )
}

const layoutForField = (label, value) => {
    if (!value) {
        return value
    }
    return (
        <div className="row">
            <div className="col-12 col-md-6">
                <p className='label'>{label}</p>
            </div>
            <div className="col-12 col-md-6">
                <p className='value'>{value}</p>
            </div>
        </div>
    )
}

export default AboutTutorView;