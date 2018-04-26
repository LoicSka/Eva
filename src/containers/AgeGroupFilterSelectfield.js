import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { values, find } from 'lodash'

class AgeGroupFilterSelectfield extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (option) => {
    const { handleFilter } = this.props
    handleFilter({ ageGroup: option.value })
  }

  render() {
    const { translate, title = null, selectedAgeGroup } = this.props
    const ageGroupsArray = [{ label: translate('courses.ageGroup.zero'), value: '0' }, { label: translate('courses.ageGroup.one'), value: '1' }, { label: translate('courses.ageGroup.two'), value: '2' }, { label: translate('courses.ageGroup.three'), value: '3' }, { label: translate('courses.ageGroup.four'), value: '4' }]
    const ageGroup = selectedAgeGroup ? find(ageGroupsArray, { 'value': selectedAgeGroup }) : null
    return (
        <RadioButtonGroup
        title={title}
        handleSelect={this.handleChange}
        activeOption={ageGroup}
        options={ageGroupsArray}
      />
    )
  }
}

AgeGroupFilterSelectfield.propTypes = {
  title: PropTypes.string,
  selectedAgeGroup: PropTypes.string,
  handleFilter: PropTypes.func,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapSateToProps = (state) => {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapSateToProps)(AgeGroupFilterSelectfield);


