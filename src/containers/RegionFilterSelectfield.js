import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { loadRegions } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import values from 'lodash/values'

class RegionFilterSelectfield extends Component {
  constructor(props) {
    super(props)
    this.state = {
      region: null
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (option) =>  { 
    const { handleFilter } = this.props
    this.setState({region: option})
    handleFilter({ region: option.value})
  }

  async componentDidMount() {
    const { loadRegions } = this.props
    await loadRegions()
  }

  render() {
    const { regions, translate, title = null } = this.props
    const { region } = this.state

    const regionsArray = values(regions).map((region) => {
      return {
        label: region.cityName,
        value: region.id
      }
    })
    return (
      <RadioButtonGroup title={title} options={regionsArray} activeOption={region} handleSelect={this.handleChange}/>
    )
  }
}

RegionFilterSelectfield.prototypes = {
  title: PropTypes.string,
  regions: PropTypes.object,
  handleFilter: PropTypes.func,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapSateToProps = (state) => {
  const { entities: { regions } } = state
  return {
    regions,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapSateToProps, { loadRegions })(RegionFilterSelectfield);


