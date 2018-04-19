import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import values from 'lodash/values'

class AgeGroupFilterSelectfield extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ageGroup: null
    }
  }

  handleChange = (option) => {
    const { handleFilter } = this.props
    this.setState({ ageGroup: option })
    handleFilter({ ageGroup: option.value })
  }

  render() {
    const { translate, title = null } = this.props
    const { ageGroup } = this.state
    return (
        <RadioButtonGroup
        title={title}
        value={ageGroup}
        handleSelect={this.handleChange}
        activeOption={ageGroup}
        options={[{ label: 'All ages', value: '0' }, { label: '4-10y/o', value: '1' }, { label: '11-18y/o', value: '2' }, { label: 'Adults', value: '3' }, { label: 'Seniors', value: '4' }]}
      />
    )
  }
}

AgeGroupFilterSelectfield.prototypes = {
  title: PropTypes.string,
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


