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
import { setFilters, loadTutorAccounts } from '../actions'

import FiltersContainer from './FiltersContainer'

class HomeFilterView extends Component {

  handleFilter = (newFilters) => {
    const { setFilters, loadTutorAccounts, filters } = this.props
    this.setState({
      filters: merge(filters, newFilters)
    })
    loadTutorAccounts(merge(filters, newFilters))
  }

  render() {
    const { translate, isFilterNavHidden = true, filters, filters: { day = null, region = null, ageGroup = null, subject = null, priceRange } } = this.props
    const selectedDay = day ? new Date(Number(day)) : day
    
    return (
      <div className={classnames('filter-nav', { ['hidden']: isFilterNavHidden})}>
        <FiltersContainer>
          <DateFilterTextfield selectedDay={selectedDay} title={translate('filterNav.dateFilterLabel')} handleFilter={this.handleFilter}/>
          <RegionFilterSelectfield selectedRegion={region} title={translate('filterNav.regionFilterLabel')} handleFilter={this.handleFilter}/>
          <SubjectFilterSelectfield selectedSubject={subject} title={translate('filterNav.subjectFilterLabel')} handleFilter={this.handleFilter}/>
          <AgeGroupFilterSelectfield selectedAgeGroup={ageGroup} title={translate('filterNav.ageGroup')} handleFilter={this.handleFilter}/>
          <RangeSelectSlider selectedPriceRange={priceRange} title={translate('filterNav.priceRange')} handleFilter={this.handleFilter} />
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
  currentLanguage: PropTypes.string,
  loadTutorAccounts: PropTypes.func,
  setFilters: PropTypes.func
}

const mapStateToProps = (state) => {
  const { navigation: { isFilterNavHidden }, filter: { filters }} = state
  return {
    isFilterNavHidden,
    filters,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  }
}

export default connect(mapStateToProps, { setFilters, loadTutorAccounts })(HomeFilterView);