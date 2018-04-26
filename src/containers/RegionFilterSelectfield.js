import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RadioButtonGroup from '../components/RadioButtonGroup'
import { loadRegions } from '../actions'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import { values, find } from 'lodash'


class RegionFilterSelectfield extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (option) =>  { 
    const { handleFilter } = this.props
    handleFilter({ region: option.value})
  }

  async componentDidMount() {
    const { loadRegions } = this.props
    await loadRegions()
  }

  render() {
    const { regions, translate, title = null, selectedRegion } = this.props

    const regionsArray = values(regions).map((region) => {
      return {
        label: region.cityName,
        value: region.id
      }
    })
    const region = selectedRegion ? find(regionsArray, { 'value': selectedRegion }) : null
    return (
      <RadioButtonGroup 
      title={title} 
      options={regionsArray} 
      activeOption={region} 
      handleSelect={this.handleChange}/>
    )
  }
}

RegionFilterSelectfield.prototypes = {
  title: PropTypes.string,
  selectedRegion: PropTypes.string,
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


