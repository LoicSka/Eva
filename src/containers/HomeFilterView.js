import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { getTranslate, getActiveLanguage } from 'react-localize-redux'
import classnames from 'classnames';
import DateFilterTextfield from './DateFilterTextfield'
import RegionFilterSelectfield from './RegionFilterSelectfield'
import SubjectFilterSelectfield from './SubjectFilterSelectfield'
import AgeGroupFilterSelectfield from './AgeGroupFilterSelectfield'
import RangeSelectSlider from '../components/RangeSelectSlider'
import merge from 'lodash/merge'
import { setFilters } from '../actions'

import FiltersContainer from './FiltersContainer'

class HomeFilterView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      filters: {}
    }
  }

  handleFilter = (newFilters) => {
    const { setFilters } = this.props
    const { filters } = this.state
    this.setState({
      filters: merge(filters, newFilters)
    })
    setFilters(merge(filters, newFilters))
  }

  render() {
    const { translate, isFilterNavHidden = true, filters, filters: { day = null, region, ageGroup } } = this.props
    const selectedDay = day ? new Date(day) : day
    console.log('FILTERS', selectedDay, day)
    return (
      <div className={classnames('filter-nav', { ['hidden']: isFilterNavHidden})}>
        <FiltersContainer>
          <DateFilterTextfield selectedDay={selectedDay} title={translate('filterNav.dateFilterLabel')} handleFilter={this.handleFilter}/>
          <RegionFilterSelectfield title={translate('filterNav.regionFilterLabel')} handleFilter={this.handleFilter}/>
          <SubjectFilterSelectfield title={translate('filterNav.subjectFilterLabel')} handleFilter={this.handleFilter}/>
          <AgeGroupFilterSelectfield title={translate('filterNav.ageGroup')} handleFilter={this.handleFilter}/>
          <RangeSelectSlider title={translate('filterNav.priceRange')} handleFilter={this.handleFilter} />
        </FiltersContainer>
        <br />
      </div>
    )
  }
}

HomeFilterView.propTypes = {
  isFilterNavHidden: PropTypes.bool,
  filters: PropTypes.object,
  translate: PropTypes.func,
  currentLanguage: PropTypes.string
}

const mapStateToProps = (state) => {
  const { navigation: { isFilterNavHidden }, tutorAccounts: { filters }} = state
  return {
    isFilterNavHidden,
    filters,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, { setFilters })(HomeFilterView);