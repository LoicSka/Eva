import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { loadTutorAccounts, loadSubjects } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { values, find } from 'lodash'

class SubjectFilterSelectfield extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (option) => {
    const { handleFilter } = this.props
    handleFilter({ subject: option.value })
  }

  async componentDidMount() {
    const { loadSubjects } = this.props
    await loadSubjects()
  }

  render() {
    const { subjects, translate, title = null, selectedSubject } = this.props

    const subjectsArray = values(subjects).map((subject) => {
      return {
        label: subject.title,
        value: subject.id
      }
    })
    const subject = selectedSubject ? find(subjectsArray, { 'value': selectedSubject }) : null
    return (
      <RadioButtonGroup title={title} activeOption={subject} options={subjectsArray} handleSelect={this.handleChange}/>
    )
  }
}

SubjectFilterSelectfield.prototypes = {
  title: PropTypes.string,
  selectedSubject: PropTypes.string,
  subjects: PropTypes.object,
  handleFilter: PropTypes.func,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapSateToProps = (state) => {
  const { entities: { subjects } } = state
  return {
    subjects,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapSateToProps, { loadTutorAccounts, loadSubjects })(SubjectFilterSelectfield);


