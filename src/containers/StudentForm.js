import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import RadioSelectfield from '../components/RadioSelectfield'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import Overdrive from 'react-overdrive'
import { pull, findLast, values, keys, omit } from 'lodash'
import TextfieldGroup from '../components/TextfieldGroup'
import { loadRegions, loadSubjects, createStudent } from '../actions'
import chinaDistricts from '../chinaCities'
import LanguageSelectfield from './LanguageSelectfield'
import { locale, weekdays } from 'moment'
import classnames from 'classnames'
import scrollToComponent from 'react-scroll-to-component'
import validateParentSurveyInput from '../validations/parentSurveyValidations'
import 'moment/locale/zh-cn'
import Loader from '../components/Loader';

var china = require('china-province-city-district');

class StudentForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gender: 'male',
            ageGroup: 1,
            currentLevel: 1,
            weakPoints: [],
            fullName: '',
            regionId: null,
            subjectId: null,
            district: '',
            tutorGender: 'none',
            daysAvailable: [],
            errors: {},
            isParent: false
        }
    }

    isValid() {
        const { errors, isValid } = validateParentSurveyInput(this.state)
        if (!isValid) {
        this.setState({ errors })
        }
        return isValid
    }

    handleSelectGender = (gender) => {
        this.setState({gender})
    }

    handleSelectAgeGroup = (ageGroup) => {
        this.setState({ageGroup})
    }

    handleSelectLevel = (currentLevel) => {
        this.setState({currentLevel})
    }

    handleSelectWeakPoints = (weakPoint) => {
        var { weakPoints } = this.state
        weakPoints.indexOf(weakPoint) === -1 ? weakPoints.push(weakPoint) : pull(weakPoints, weakPoint)
        this.setState({weakPoints, errors: omit(this.state.errors, 'weakPoints')})
    }

    handleSelectRegion = (regionId) => {
        this.setState({regionId})
    }

    handleSelectSubject = (subjectId) => {
        this.setState({subjectId})
    }

    handleSelectDistrict = (district) => {
        this.setState({district, errors: omit(this.state.errors, 'district')})
    }

    handleSelectTutorGender = (tutorGender) => {
        this.setState({tutorGender})
    }

    handleSelectDays = (day) => {
        var { daysAvailable } = this.state
        daysAvailable.indexOf(day) === -1 ? daysAvailable.push(day) : pull(daysAvailable, day)
        this.setState({daysAvailable, errors: omit(this.state.errors, 'daysAvailable')})
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
        const { loadRegions, loadSubjects, regions } = this.props
        loadRegions()
        loadSubjects()
        this.setupLocale()
    }

    componentWillReceiveProps = (newProps) => {
        const { regions, subjects, currentLanguage, students } = newProps
        if (this.props.regions !== regions &&  values(regions).length !== 0) {
            this.setState({regionId: values(regions)[0].id})
        }
        if (this.props.subjects !== subjects &&  values(subjects).length !== 0) {
            this.setState({subjectId: values(subjects)[0].id})
        }
        if (currentLanguage !== this.props.currentLanguage) {
            this.setupLocale()
        }
        if (keys(students).length > keys(this.props.students).length) {
            const studentArray = values(students)
            const newStudent = studentArray[studentArray.length - 1]
            this.props.history.push({ pathname: `/match/${newStudent.id}`, state: {} })
        }
    }

    studentData = () => {
        const { userId } = this.props
        const { gender, ageGroup, currentLevel, weakPoints, fullName, regionId, subjectId, district, tutorGender, daysAvailable } = this.state
        return {
            gender,
            fullName,
            daysAvailable,
            regionId,
            subjectId,
            ageGroup,
            userId,
            criteriaAttributes: [
                {
                    type: 'TUTOR_GENDER',
                    values: [tutorGender]
                },
                {
                    type: 'CURRENT_LEVEL',
                    values: [currentLevel]
                },
                {
                    type: 'WEAK_POINTS',
                    values: weakPoints
                },
                {
                    type: 'DISTRICT',
                    values: [district]
                },
                {
                    type: 'AGE_GROUP',
                    values: [ageGroup]
                }
            ]
        }

    }

    handleSubmit = () => {
        const { createStudent } = this.props
        if (this.isValid()) {
            createStudent(this.studentData())
        }
    }

    render() {
        const { translate, currentLanguage, isLoading, isParent = false } = this.props
        const regions = values(this.props.regions).map((region) => {
            return (
                {
                    label: `${region.cityName[currentLanguage === 'en' ? 0 : 1]}, ${region.countryName[currentLanguage === 'en' ? 0 : 1]}`,
                    value: region.id,
                    cityName: region.cityName[1]
                }
            )
        })

        const subjects = values(this.props.subjects).map((subject) => {
            return (
                {
                    label: subject.title[currentLanguage === 'en' ? 0 : 1],
                    value: subject.id,
                    title: subject.title[1]
                }
            )
        })

        const region = findLast(regions, (n) => n.value === this.state.regionId)
        const districtList = typeof (region) !== 'undefined' ? china.query(region.cityName) : []
        const genders = [{label: translate( isParent ? 'survey.gender.answer.parent.1' : 'survey.gender.answer.student.1' ), value: 'male'}, {label: translate( isParent ? 'survey.gender.answer.parent.2' : 'survey.gender.answer.student.2'), value: 'female'}]
        const tutorGenders = [{ label: translate('survey.tutorGender.answer.1'), value: 'male'}, { label: translate('survey.tutorGender.answer.2'), value: 'female'}, { label: translate('survey.tutorGender.answer.3'), value: 'none'}]
        const ageGroups = [{label: translate('survey.ageGroup.answer.1'), value: 1}, {label: translate('survey.ageGroup.answer.2'), value: 2}, {label: translate('survey.ageGroup.answer.3'), value: 3}, {label: translate('survey.ageGroup.answer.4'), value: 4}, {label: translate('survey.ageGroup.answer.5'), value: 5}, {label: translate('survey.ageGroup.answer.6'), value: 6}, {label: translate('survey.ageGroup.answer.7'), value: 7}, {label: translate('survey.ageGroup.answer.8'), value: 8}]
        const levels = [{label: translate('survey.currentLevel.answer.1'), value: 1}, {label: translate('survey.currentLevel.answer.2'), value: 2}, {label: translate('survey.currentLevel.answer.3'), value: 3}, {label: translate('survey.currentLevel.answer.4'), value: 4}]
        const weakPoints = [{label: translate('survey.weakPoints.answer.1'), value: 1}, {label: translate('survey.weakPoints.answer.2'), value: 2}, {label: translate('survey.weakPoints.answer.3'), value: 3}, {label: translate('survey.weakPoints.answer.4'), value: 4}, {label: translate('survey.weakPoints.answer.5'), value: 5}, {label: translate('survey.weakPoints.answer.6'), value: 0}]
        const days = weekdays().map((day, index) => {
            return {
                label: day,
                value: index + 1
            }
        })
        const loaderView = (
            <div style={{height: '100vh'}} className={`row align-items-center justify-content-center py-4`}>
                <div className="col-4 col-md-1 my-0 my-sm-4">
                    <Overdrive id='card-ctn'>
                        <div className='card my-0 my-sm-4'> 
                            <div className='card-body'>
                                <Loader />
                            </div>
                        </div>
                    </Overdrive>
                </div>
            </div>
        )

        const surveyView = (
            <div className={`row align-items-center justify-content-center py-4 ${currentLanguage}`}>
                <div className="col-12 col-md-8 my-0 my-sm-4">
                    <Overdrive id='card-ctn'>
                        <div className='card my-0 my-sm-4'>
                            <div className='card-body p-4'>
                                <div className="row">
                                    <div ref={(field) => { this.fullName = field }} className="col-12">
                                        <div className='row pl-2'>
                                            <h4 className={classnames('radio-select-question', {'error': this.state.errors.fullName})}>
                                                <strong>1. {translate(isParent ? 'survey.fullName.question.parent' : 'survey.fullName.question.student')}</strong>
                                            </h4>
                                        </div>
                                        <div className="row py-2">
                                            <div className="col-12 col-sm-6 px-4 pb-4">
                                                <input
                                                value={this.state.fullName}
                                                onChange={this.onChange}
                                                name='fullName'
                                                className='survey-textfield'
                                                placeholder={translate('userFields.fullName')} 
                                                type='text'
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.gender = field }} number={2} question={translate(isParent ? 'survey.gender.question.parent' : 'survey.gender.question.student')} choices={genders} type='SINGLE' selected={[this.state.gender]} handleSelect={this.handleSelectGender} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.ageGroup = field }} number={3} question={translate(isParent ? 'survey.ageGroup.question.parent' : 'survey.ageGroup.question.student')} choices={ageGroups} type='SINGLE' selected={[this.state.ageGroup]} handleSelect={this.handleSelectAgeGroup} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.subjectId = field }} number={4} question={translate(isParent ? 'survey.subject.question.parent' : 'survey.subject.question.student')} choices={subjects} type='SINGLE' selected={[this.state.subjectId]} handleSelect={this.handleSelectSubject} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.currentLevel = field }} number={5} question={translate(isParent ? 'survey.currentLevel.question.parent' : 'survey.currentLevel.question.student')} choices={levels} type='SINGLE' selected={[this.state.currentLevel]} handleSelect={this.handleSelectLevel} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.weakPoints = field }} error={this.state.errors.weakPoints} number={6} question={translate('survey.weakPoints.question')} choices={weakPoints} type='MULTI' selected={this.state.weakPoints} handleSelect={this.handleSelectWeakPoints} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.tutorGender = field }} number={7} question={translate('survey.tutorGender.question')} choices={tutorGenders} type='SINGLE' selected={[this.state.tutorGender]} handleSelect={this.handleSelectTutorGender} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.daysAvailable = field }} error={this.state.errors.daysAvailable} number={8} question={translate(isParent ? 'survey.daysAvailable.question.parent' : 'survey.daysAvailable.question.student')} choices={days} type='MULTI' selected={this.state.daysAvailable} handleSelect={this.handleSelectDays} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.regionId = field }} error={this.state.errors.regionId} number={9} question={translate('survey.region.question')} choices={regions} type='SINGLE' selected={[this.state.regionId]} handleSelect={this.handleSelectRegion} />
                                    </div>
                                    <div className="col-12 mb-4">
                                        <RadioSelectfield ref={(field) => { this.district = field }} error={this.state.errors.district} number={10} question={translate('survey.district.question')} choices={districtList} type='SINGLE' selected={[this.state.district]} handleSelect={this.handleSelectDistrict} />
                                    </div>
                                    <div className="col-12">
                                        <button onClick={this.handleSubmit} className="btn btn-primary">{translate('userActions.submitSurvey')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Overdrive>
                </div>
            </div>
        )
        return ( isLoading ? loaderView : surveyView )
    }
}

StudentForm.propTypes = {
    translate: PropTypes.func,
    currentLanguage: PropTypes.string,
    isLoading: PropTypes.bool,
    regions: PropTypes.array,
    subjects: PropTypes.array,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => {
    const { account: { 
            isAuthenticated, 
            user 
        },
        entities: { regions, subjects, students, isLoading: { region = true, subject = true, student = false } } } = state

    return {
        isAuthenticated,
        userId: user.id || null,
        regions,
        subjects,
        students,
        isLoading: region || student || subject,
        translate: getTranslate(state.locale),
        currentLanguage: getActiveLanguage(state.locale).code
    }
}

export default withRouter(connect(mapStateToProps, { loadRegions, loadSubjects, createStudent })(StudentForm))