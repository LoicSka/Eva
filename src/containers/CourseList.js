import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom' 
import { CREATE_COURSE_FAILURE } from '../actions';

class CourseList extends Component {
  formatTE = (value) => {
    const { translate } = this.props
    switch (value) {
      case 0:
        return translate('courses.period.zero')
      case 1:
        return translate('courses.period.one')
      case 2:
        return translate('courses.period.two')
      case 3:
        return translate('courses.period.three')
      case 4:
        return translate('courses.period.four')
      default:
        break;
    }
  }

  formatExpertise = (value) => {
    const { translate } = this.props
    switch (value) {
      case 0:
        return translate('courses.expertise.zero')
      case 1:
        return translate('courses.expertise.one')
      case 2:
        return translate('courses.expertise.two')
      case 3:
        return translate('courses.expertise.three')
      case 4:
        return translate('courses.expertise.four')
      default:
        break;
    }
  }
  formatAgeGroup = (value) => {
    const { translate } = this.props
    switch (value) {
      case 0:
        return translate('courses.ageGroup.zero')
      case 1:
        return translate('courses.ageGroup.one')
      case 2:
        return translate('courses.ageGroup.two')
      case 3:
        return translate('courses.ageGroup.three')
      case 4:
        return translate('courses.ageGroup.four')
      default:
        break;
    }
  }

  render() {
    const { subjects } = this.props
    const courses = this.props.courses.map((course) => {
      return (
        <div className="card mb-3 border-0">
          <div className="card-header text-white bg-secondary">
            <strong>{course.title}</strong>
          </div>
          <div className="card-body border border-top-0 rounded-bottom">
            {course.description ? (<div className="clearfix">
              <p className="float-left">Description:</p>
              <p className="float-right" style={{ color: "#8692A0" }}> {course.description}</p>
            </div>) : null }
            <div className="clearfix">
              <p className="float-left">Language:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{subjects[course.subject].title}</p>
            </div>
            <div className="clearfix">
              <p className="float-left">Proficiency:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{this.formatExpertise(course.expertise)}</p>
            </div>
            <div className="clearfix">
              <p className="float-left">Experience:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{this.formatTE(course.teachingExperience)}</p>
            </div>
            <div className="clearfix">
              <p className="float-left">Preferred age group:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{this.formatAgeGroup(course.ageGroup)}</p>
            </div>
            <div className="clearfix">
              <p className="float-left">Hourly rate:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{course.hourlyRate}</p>
            </div>
            <div className="clearfix">
              <p className="float-left">Students taught:</p>
              <p className="float-right" style={{ color: "#8692A0" }}>{course.acceptedBookings}</p>
            </div>
            <Link to={`/setup-courses/${course.id}`} className="card-link">Edit</Link>
            <Link to={'/#'} className="card-link">Delete</Link>
          </div>
        </div>
      )
    })
    return (
      <div className="container" style={{ 'padding': 0 }}>
        { courses }
      </div>
    )
  }
}

CourseList.propTypes = {
  courses: PropTypes.array,
  subjects: PropTypes.array,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

export default CourseList