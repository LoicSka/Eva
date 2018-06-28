import React, { Component } from 'react'
import { Link } from 'react-router-dom' 
import SelectfieldGroup from '../components/SelectfieldGroup'
import TextfieldGroup from '../components/TextfieldGroup'
import TextareaGroup from '../components/TextareaGroup'
import validateCourseInput from '../validations/courseValidations'
import PropTypes from 'prop-types'
import omit from 'lodash/omit'
import values from 'lodash/values'
import merge from 'lodash/merge'
import filter from 'lodash/filter'
import includes from 'lodash/includes'
import Select from 'react-select'
import 'react-select/dist/react-select.css'
import { updateCourse } from '../actions';

class CourseForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tutorAccountId: '',
      title: '',
      subject: '',
      description: '',
      ageGroup: null,
      expertise: null,
      teachingExperience: '',
      hourlyRate: null,
      tagIds: [],
      errors: {},
      hasSetCurrent: false
    }
  }

  isValid() {
    const { errors, isValid } = validateCourseInput(this.state)
    // console.log(this.state, errors)
    if (!isValid) {
      this.setState({ errors })
    }
    return isValid
  }

  onChange = (e) => this.setState({ [[e.target.name]]: e.target.value })
  getTranslation = value => value && typeof(value) !== 'undefined' ? this.props.translate(value) : null

  handleSelectChange = tagIds => {
    this.setState({ tagIds })
  }

  componentDidMount() {
    const { tutorAccountId, resetCourse } = this.props
    resetCourse()
    this.setState({ tutorAccountId })
  }

  componentWillReceiveProps(newProps) {
    const { currentCourse, tagOptions } = newProps
    if (currentCourse) {
      let { tags } = currentCourse
      console.log(tags)
      const tagIds = filter(tagOptions, (t) => { return (includes(tags, t.value)) })
      console.log("TAGS", tags,)
      this.setState({ tagIds })
    }
  }

  /*
    Reset to initial state
  */
  handleAddNewCourse = () => {
    this.setState({
      title: '',
      subject: '',
      description: '',
      ageGroup: null,
      expertise: null,
      teachingExperience: '',
      hourlyRate: null,
      updatedAt: '',
      tagIds: [],
      errors: {},
      hasSetCurrent: false
    })
    const { resetCourse, history } = this.props
    resetCourse()
    history.push({ pathname: '/setup-courses'})
    
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { createCourse, updateCourse, currentCourse } = this.props
    if (true) {
      var tagIds = this.state.tagIds.map((tag) => {
        return tag.value
      })
      currentCourse ? updateCourse(merge(omit(this.state, ['errors', 'tags']), { tagIds })) : createCourse(merge(omit(this.state, ['errors', 'tags']), { tagIds }))
    }
  }

  render() {
    const { translate, currentLanguage, serverErrors, tagOptions, subjectOptions, submiting, success, currentCourse, resetCourse } = this.props
    const { title, description, ageGroup, expertise, subject, errors, tagIds, hourlyRate, teachingExperience, hasSetCurrent, updatedAt } = this.state
    const combinedErrors = merge(errors, serverErrors)

    if (currentCourse) {
      if (currentCourse.id !== this.state.id || updatedAt !== currentCourse.updatedAt) {
        // resetCourse()
        this.setState({ hasSetCurrent: false })
      }
    }

    if (hasSetCurrent === false && currentCourse) {
      this.setState(omit(currentCourse, ['tags']));
      this.setState({ hasSetCurrent: true })
    }

    return success ? (
    <div className="row">
        <h2 className="panel-title">{translate('courses.createHeader')}</h2>
        <div className="col-12 px-3 mt-2">
          <Link
            onClick={this.handleAddNewCourse}
            to='#'
            className='btn btn-outline-primary btn-block'>
            Add a course
          </Link>
          <button
            className='btn btn-success btn-block'>
            Finish
          </button>
        </div>
    </div>) : (
      <form onSubmit={this.onSubmit}>
        <div className="row">
          <h2 className="panel-title">{translate('courses.createHeader')}</h2>
          <div className="col-12 px-3 mt-2">
            <TextfieldGroup
              error={this.getTranslation(combinedErrors.title)}
              value={title}
              onChange={this.onChange}
              field='title'
              placeholder={translate('courseFields.titlePlaceholder')}
              type='text'
              label={`${translate('courseFields.title')} *`}
            />
            <TextareaGroup
              error={this.getTranslation(combinedErrors.description)}
              value={description}
              onChange={this.onChange}
              field='description'
              type='text'
              subLabel={translate('courseFields.subDescription')}
              label={translate('courseFields.description')}
            />
            <SelectfieldGroup
              error={this.getTranslation(combinedErrors.subject)}
              value={subject}
              onChange={this.onChange}
              field='subject'
              options={subjectOptions}
              type='text'
              label={translate('courseFields.language')}
            />
            <SelectfieldGroup
              error={this.getTranslation(combinedErrors.ageGroup)}
              value={ageGroup}
              onChange={this.onChange}
              field='ageGroup'
              options={[{ name: 'All ages', value: 0 }, { name: '4-10y/o', value: 1 }, { name: '11-18y/o', value: 2 }, { name: 'Adults', value: 3 }, { name: 'Seniors', value: 4 }]}
              type='text'
              label={translate('courseFields.ageGroup')}
            />
            <SelectfieldGroup
              error={this.getTranslation(combinedErrors.expertise)}
              value={expertise}
              onChange={this.onChange}
              field='expertise'
              options={[{ name: 'Certified Tutor', value: 0 }, { name: 'Native speaker', value: 1 }, { name: 'Second language', value: 2 } , { name: 'Hobysist', value: 3 }]}
              type='text'
              label={translate('courseFields.expertise')}
            />
            <SelectfieldGroup
              error={this.getTranslation(combinedErrors.teachingExperience)}
              value={teachingExperience}
              onChange={this.onChange}
              field='teachingExperience'
              options={[{ name: '0-1 year', value: 0 }, { name: '2-5 years', value: 1 }, { name: '5-10 years', value: 2 }, { name: '10+ years', value: 3 }]}
              type='text'
              label={translate('courseFields.teachingExperience')}
            />
            <TextfieldGroup
              error={this.getTranslation(combinedErrors.hourlyRate)}
              value={hourlyRate}
              onChange={this.onChange}
              field='hourlyRate'
              type='number'
              label={`${translate('courseFields.hourlyRate')} *`}
            />
            <div className="form-group">
              <label>{translate('courseFields.tags')}</label>
              <p className='sub-label'>{translate('courseFields.tagsSub')}</p>
              <Select
                multi
                onChange={this.handleSelectChange}
                options={tagOptions}
                placeholder=""
                name="tagIds"
                value={tagIds}
                className="select-form-control"
                closeOnSelect={false}
              />
            </div>
            <button
              type='submit'
              className='btn btn-success btn-block'
              disabled={submiting}>{submiting ? translate('userActions.saving') : translate('userActions.save')}
            </button>
          </div>
        </div>
      </form>
    )
  }
}

CourseForm.propTypes = {
  translate: PropTypes.func.isRequired,
  serverErrors: PropTypes.object,
  tagOptions: PropTypes.array,
  subjects: PropTypes.array,
  submiting: PropTypes.bool,
  fetching: PropTypes.bool,
  success: PropTypes.bool,
  tutorAccountId: PropTypes.string,
  updateCourse: PropTypes.func,
  createCourse: PropTypes.func,
  resetCourse: PropTypes.func,
  currentCourse: PropTypes.object
}

export default CourseForm
