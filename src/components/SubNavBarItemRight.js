import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import filter from '../styles/images/filter.svg'
import PropTypes from 'prop-types'
import SortTutorAccountSelect from '../containers/SortTutorAccountSelect'
import LanguageSelectfield from '../containers/LanguageSelectfield'
import HomeFilterView from '../containers/HomeFilterView'
import ClearFiltersButton from './ClearFiltersButton'


class SubNavBarItemRight extends Component {
  render() {
    return (
      <div className="nav-item-ctn sub-nav-right float-right">
        <ul className="nav">
          <li className='nav-item'>
            <SortTutorAccountSelect />
          </li>
          <li className='nav-item'>
            <LanguageSelectfield />
          </li>
        </ul>
      </div>
    )
  }
}

export default SubNavBarItemRight