import React, { Component } from 'react'
import PropTypes from 'prop-types'
import StudentForm from './StudentForm'
import TutorSurveyForm from './TutorSurveyForm'


class SurveyPage extends Component {
    render() {
        const { match: { params: { surveyType } } } = this.props
        return ( surveyType === 'tutor' ? <TutorSurveyForm /> : <StudentForm isParent={ surveyType === 'parent' }/> )
    }
}

export default SurveyPage