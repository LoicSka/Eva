import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { loadTags, loadSubjects, createCourse, updateCourse, resetCourse, loadCoursesForAccount, deleteCourse } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import CourseForm from './CourseForm'
import CourseList from './CourseList'
import values from 'lodash/values'

class SetUpCoursesPage extends Component {
  
  componentDidMount() {
    const { loadTags, loadSubjects, tutorAccountId, loadCoursesForAccount } = this.props
    loadTags()
    loadSubjects()
    loadCoursesForAccount(tutorAccountId)
  }

  render() {
    const { translate, currentLanguage, isAuthenticated, isUpdating, hasUpdated, tutorAccountId, errors, updateUserAccount, resetAccount, history, submiting, success, fetching, createCourse, subjects, tags, updateCourse, resetCourse, deleteCourse, match: { params: { courseId = null } } } = this.props

    const tagOptions = values(tags).map((tag) => {
      return (
        {
          label: tag.title,
          value: tag.id
        }
      )
    })

    const subjectOptions = values(subjects).map((sub) => {
      return (
        {
          name: sub.title,
          value: sub.id
        }
      )
    })

    const courses = values(this.props.courses).map((course) => {
      return course
    })

    const currentCourse = courseId && courses.length > 0 ? this.props.courses[`${courseId}`] : null
    return (
      <div className="container" style={{ 'padding': 0 }}>
        <div className={`row panel-ctn py-3 justify-content-center align-items-center ${currentLanguage}`}>
          <div className="panel col-11 col-md-9">
            <div className="row">
              <div className="col-12 col-md-6">
                <CourseForm updateCourse={updateCourse} currentCourse={currentCourse} success={success} tutorAccountId={tutorAccountId} fetching={fetching} submiting={submiting} tagOptions={tagOptions} createCourse={createCourse} subjectOptions={subjectOptions} resetCourse={resetCourse} translate={translate} serverErrors={errors} history={history} />
              </div>
              <div className="col-12 col-md-6 fixed-container sep-right">
                <div className="vertical-divider"></div>
                <CourseList deleteCourse={deleteCourse} translate={translate} subjects={subjects} courses={courses} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SetUpCoursesPage.proptypes = {
  isAuthenticated: PropTypes.bool,
  hasUpdated: PropTypes.bool,
  isUpdating: PropTypes.bool,
  errors: PropTypes.object,
  regions: PropTypes.object,
  user: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string,
  updateCourse: PropTypes.func,
  createCourse: PropTypes.func,
  resetAccount: PropTypes.func,
  updateUserAccount: PropTypes.func,
  tags: PropTypes.array
}

const mapStateToProps = (state, ownProps) => {
  const {
    account: { isAuthenticated, user: { tutorAccountId } , isUpdating, hasUpdated },
    errors,
    courseState: { submiting, fetching, success},
    entities: { tags, subjects, courses }
  } = state

  return {
    isAuthenticated,
    errors,
    tutorAccountId,
    tags,
    subjects,
    courses,
    submiting,
    fetching,
    success,
    isUpdating,
    hasUpdated,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default withRouter(connect(mapStateToProps, { loadTags, loadSubjects, loadCoursesForAccount, createCourse, resetCourse, updateCourse, deleteCourse })(SetUpCoursesPage))