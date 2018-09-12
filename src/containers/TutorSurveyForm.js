import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import RadioSelectfield from '../components/RadioSelectfield'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Overdrive from 'react-overdrive'
import { pull, values, keys, omit } from 'lodash'
import { loadRegions, loadSubjects, updateUserAccount } from '../actions'
import { locale, weekdays } from 'moment'
import classnames from 'classnames'
import scrollToComponent from 'react-scroll-to-component'
import validateTutorSurveyInput from '../validations/tutorSurveyValidations'
import 'moment/locale/zh-cn'
import Loader from '../components/Loader'
import Container from './Container'

import leftArrow from '../styles/images/left-arrow.svg'

var china = require('china-province-city-district')

class TutorSurveyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            occupation: '',
            district: '',
            weiboUrl: '',
            wechatId: '',
            phoneNumber: '',
            levels: [],
            gender: 'male',
            countryOfOrigin: '',
            introduction: '',
            regionId: '',
            daysAvailable: [],
            subjectIds: [],
            teachingExperience: '',
            hourlyRate: null,
            certifications: [],
            errors: {},
            ageGroups: []
        }
    }

    isValid() {
        const { errors, isValid } = validateTutorSurveyInput(this.state)
        if (!isValid) {
            this.setState({ errors })
        }
        return isValid
    }

    handleSelectGender = (gender) => {
        this.setState({gender})
    }

    handleSelectOccupation = (occupation) => {
        this.setState({occupation, errors: omit(this.state.errors, 'occupation')})
    }

    handleSelectDistrict = (district) => {
        this.setState({district, errors: omit(this.state.errors, 'district')})
    }

    handleSelectRegion = (regionId) => {
        this.setState({regionId, errors: omit(this.state.errors, 'region')})
    }

    handleSelectDays = (day) => {
        var { daysAvailable } = this.state
        daysAvailable.indexOf(day) === -1 ? daysAvailable.push(day) : pull(daysAvailable, day)
        this.setState({daysAvailable, errors: omit(this.state.errors, 'daysAvailable')})
    }

    handleSelectAgeGroups = (age) => {
        var { ageGroups } = this.state
        ageGroups.indexOf(age) === -1 ? ageGroups.push(age) : pull(ageGroups, age)
        this.setState({ageGroups, errors: omit(this.state.errors, 'ageGroups')})
    }

    handleSelectLevels = (level) => {
        var { levels } = this.state
        levels.indexOf(level) === -1 ? levels.push(level) : pull(levels, level)
        this.setState({levels, errors: omit(this.state.errors, 'levels')})
    }

    handleSelectSubject = (subjectId) => {
        this.setState({subjectIds: [subjectId], errors: omit(this.state.errors, 'subjectIds')})
    }

    handleSelectTeachingExperience = (teachingExperience) => {
        this.setState({teachingExperience, errors: omit(this.state.errors, 'teachingExperience')})
    }

    handleSelectCertifications = (certification) => {
        var { certifications } = this.state
        certifications.indexOf(certification) === -1 ? certifications.push(certification) : pull(certifications, certification)
        this.setState({certifications, errors: omit(this.state.errors, 'certifications')})
    }

    onChange = (e) => this.setState({ [[e.target.name]]: e.target.value, errors: omit(this.state.errors, e.target.name) })

    setupLocale = () => {
        const { currentLanguage } = this.props
        currentLanguage === 'cn' ? locale('zh-cn') : locale('en')
    }

    componentDidUpdate = (prevProps, prevState) => {
        const { errors } = this.state
        const errorKeys = keys(errors)
        if (errorKeys.length > 0 && prevProps.error !== errors) {
            scrollToComponent(this[errorKeys.pop()], { offset: -100, align: 'top', duration: 500, ease:'inExpo'})
        }
    }

    componentDidMount = () => {
        const { loadRegions, loadSubjects } = this.props
        loadRegions()
        loadSubjects()
        this.setupLocale()
    }

    componentWillReceiveProps = (newProps) => {
        const { subjects, currentLanguage, regions, user: { updatedAt } } = newProps
        const regionIds = keys(regions)
        if (this.props.subjects !== subjects &&  values(subjects).length !== 0) {
            this.setState({subjectIds: [values(subjects)[0].id]})
        }
        if (currentLanguage !== this.props.currentLanguage) {
            this.setupLocale()
        }

        if (this.state.regionId.length === 0 && regionIds.length > 0) {
            this.setState({regionId: regionIds[0]});
        }

        if (updatedAt !== this.props.user.updatedAt) {
            this.props.history.push({ pathname: '/dashboard', state: {} })
        }

    }

    tutorAccountData = () => {
        const { occupation, district, weiboUrl, wechatId, levels, daysAvailable, subjectIds, teachingExperience, certifications, regionId, phoneNumber, countryOfOrigin, introduction, gender, ageGroups, hourlyRate } = this.state
        return {
            occupation,
            district,
            weiboUrl,
            wechatId,
            levels,
            phoneNumber,
            daysAvailable,
            subjectIds,
            regionId,
            teachingExperience,
            certifications,
            countryOfOrigin,
            introduction,
            gender,
            ageGroups,
            hourlyRate
        }
    }

    handleSubmit = () => {
        const { updateUserAccount } = this.props
        if (this.isValid()) {
            updateUserAccount(this.tutorAccountData(), this.props.user.id)
        }
    }

    render() {
        const { translate, currentLanguage, isLoading, history } = this.props
        const subjects = values(this.props.subjects).map((subject) => {
            return (
                {
                    label: subject.title[currentLanguage === 'en' ? 0 : 1],
                    value: subject.id,
                    title: subject.title[1]
                }
            )
        })

        const regions = values(this.props.regions).map((region) => {
            return {
                label: currentLanguage === 'en' ? `${region.cityName[0]}, ${region.countryName[0]}`: `${region.cityName[1]}, ${region.countryName[1]}`,
                value: region.id
            }
        })

        const genders = [{label: translate('survey.gender.answer.student.1'), value: 'male'}, {label: translate('survey.gender.answer.student.2'), value: 'female'}]
        const region = this.props.regions[`${this.state.regionId}`]
        const districtList = typeof (region) !== 'undefined' ? china.query(region.cityName[1]) : []
        const days = weekdays().map((day, index) => {
            return {
                label: day,
                value: index === 0 ? 7 : index 
            }
        })
        
        const occupations = [{label: translate('survey.occupation.answer.1'), value: 'Full-time tutor'}, {label: translate('survey.occupation.answer.2'), value: 'Part-time tutor'}]
        const teachingExperiences = [{label: translate('survey.teachingExperience.answer.1'), value: 1}, {label: translate('survey.teachingExperience.answer.2'), value: 2}, {label: translate('survey.teachingExperience.answer.3'), value: 3}, {label: translate('survey.teachingExperience.answer.4'), value: 4}, {label: translate('survey.teachingExperience.answer.5'), value: 5}, {label: translate('survey.teachingExperience.answer.6'), value: 6}]
        const levels = [{label: translate('survey.levels.answer.1'), value: 1}, {label: translate('survey.levels.answer.2'), value: 2}, {label: translate('survey.levels.answer.3'), value: 3}, {label: translate('survey.levels.answer.4'), value: 4}, {label: translate('survey.levels.answer.5'), value: 5}, {label: translate('survey.levels.answer.6'), value: 6}, {label: translate('survey.levels.answer.7'), value: 7}]
        const certifications = [{label: translate('survey.certifications.answer.1'), value: 1}, {label: translate('survey.certifications.answer.2'), value: 2}, {label: translate('survey.certifications.answer.3'), value: 3}, {label: translate('survey.certifications.answer.4'), value: 4}, {label: translate('survey.certifications.answer.5'), value: 5}]

        const loaderView = (
            <Container style={{height: '100vh'}} className={`row align-items-center justify-content-center py-4 ${currentLanguage}`}>
                <div className='col-4 col-md-1 my-0 my-sm-4'>
                    <Overdrive id='card-ctn'>
                        <div className='card my-0 my-sm-4'>
                            <Loader /> 
                        </div>
                    </Overdrive>
                </div>
            </Container>
        )

        const surveyView = (
            <Container className={`row align-items-center justify-content-center py-0 ${currentLanguage}`}>
                <div className='col-12 col-md-8 my-0 my-sm-4'>
                    <button onClick={() => { history.goBack() }} className="btn btn-transparent btn-lg">
                        <img style={{width: '20px', height: 'auto', marginRight: '5px', marginTop: '-3px'}} src={leftArrow} alt='left-arrow'/>
                        <span>{translate('goBack')}</span>
                    </button>
                    <Overdrive id='card-ctn'>
                        <div className='card my-0 my-sm-4'>
                            <div className='card-body p-4'>
                                <div className='row'>
                                    <div ref={(field) => { this.wechatId = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.wechatId})}>
                                                <strong>1. {translate('survey.wechatId.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-6 px-4 pb-4'>
                                                <input
                                                value={this.state.wechatId}
                                                onChange={this.onChange}
                                                name='wechatId'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.wechatId')} 
                                                type='text'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={(field) => { this.weiboUrl = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className='radio-select-question'>
                                                <strong>2. {translate('survey.weiboUrl.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-6 px-4 pb-4'>
                                                <input
                                                value={this.state.weiboUrl}
                                                onChange={this.onChange}
                                                name='weiboUrl'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.weibo')} 
                                                type='text'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={(field) => { this.phoneNumber = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.phoneNumber})}>
                                                <strong>3. {translate('survey.phoneNumber.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-6 px-4 pb-4'>
                                                <input
                                                value={this.state.phoneNumber}
                                                onChange={this.onChange}
                                                name='phoneNumber'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.phoneNumber')} 
                                                type='number'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={(field) => { this.hourlyRate = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.hourlyRate})}>
                                                <strong>4. {translate('survey.hourlyRate.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-6 px-4 pb-4'>
                                                <input
                                                value={this.state.hourlyRate}
                                                onChange={this.onChange}
                                                name='hourlyRate'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.hourlyRate')} 
                                                type='number'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={(field) => { this.countryOfOrigin = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.countryOfOrigin})}>
                                                <strong>5. {translate('survey.countryOfOrigin.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-6 px-4 pb-4'>
                                                <input
                                                value={this.state.countryOfOrigin}
                                                onChange={this.onChange}
                                                name='countryOfOrigin'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.countryOfOrigin')} 
                                                type='text'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div ref={(field) => { this.introduction = field }} className='col-12'>
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.introduction})}>
                                                <strong>6. {translate('survey.introduction.question')}</strong>
                                            </h4>
                                        </div>
                                        <div className='row py-2'>
                                            <div className='col-12 col-md-11 px-4 pb-4'>
                                                <textarea
                                                value={this.state.introduction}
                                                onChange={this.onChange}
                                                name='introduction'
                                                className='survey-textfield'
                                                type='text'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.gender = field }} number={7} question={translate('survey.gender.question.student')} choices={genders} type='SINGLE' selected={[this.state.gender]} handleSelect={this.handleSelectGender} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.subjectIds = field }} error={this.state.errors.subjectIds} number={8} question={translate('survey.subject.question.tutor')} choices={subjects} type='SINGLE' selected={this.state.subjectIds} handleSelect={this.handleSelectSubject} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.occupation = field }} error={this.state.errors.occupation} number={9} question={translate('survey.occupation.question')} choices={occupations} type='SINGLE' selected={[this.state.occupation]} handleSelect={this.handleSelectOccupation} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.daysAvailable = field }} error={this.state.errors.daysAvailable} number={10} question={translate('survey.daysAvailable.question.tutor')} choices={days} type='MULTI' selected={this.state.daysAvailable} handleSelect={this.handleSelectDays} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.levels = field }} error={this.state.errors.levels} number={11} question={translate('survey.levels.question')} choices={levels} type='MULTI' selected={this.state.levels} handleSelect={this.handleSelectLevels} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.teachingExperience = field }} error={this.state.errors.teachingExperience} number={12} question={translate('survey.teachingExperience.question')} choices={teachingExperiences} type='SINGLE' selected={[this.state.teachingExperience]} handleSelect={this.handleSelectTeachingExperience} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.certifications = field }} number={13} question={translate('survey.certifications.question')} choices={certifications} type='MULTI' selected={this.state.certifications} handleSelect={this.handleSelectCertifications} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.regionId = field }} error={this.state.errors.regionId} number={14} question={translate('survey.region.question')} choices={regions} type='SINGLE' selected={[this.state.regionId]} handleSelect={this.handleSelectRegion} />
                                    </div>
                                    <div className='col-12 mb-4'>
                                        <RadioSelectfield ref={(field) => { this.district = field }} error={this.state.errors.district} number={15} question={translate('survey.district.question')} choices={districtList} type='SINGLE' selected={[this.state.district]} handleSelect={this.handleSelectDistrict} />
                                    </div>
                                    <div className='d-flex flex-row align-items-center col-12'>
                                        <button onClick={this.handleSubmit} className='btn btn-primary'>{translate('userActions.submitSurvey')}</button>
                                        <p className='px-4 py-0 my-0'>({translate('answers')})</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Overdrive>
                </div>
            </Container>
        )

        return ( isLoading ? loaderView : surveyView )
    }


}

TutorSurveyForm.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    isLoading: PropTypes.bool,
    verified: PropTypes.bool,
    user: PropTypes.object,
    regions: PropTypes.object,
    subjects: PropTypes.object,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { account: { 
            isAuthenticated, 
            user: { verified },
            user,
            isUpdating,
            hasUpdated
        }, 
        entities: { regions, subjects, isLoading: { region = true, subject = true, student = false } } } = state
    return {
        isAuthenticated,
        verified,
        user,
        regions,
        subjects,
        isLoading: region || student || subject || isUpdating,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, { loadRegions, loadSubjects, updateUserAccount })(TutorSurveyForm))