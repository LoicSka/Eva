import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import filter from '../styles/images/filter.svg'
import PropTypes from 'prop-types'
import SortTutorAccountSelect from '../containers/SortTutorAccountSelect'
import HomeFilterView from '../containers/HomeFilterView'
import ClearFiltersButton from './ClearFiltersButton'

class SubNavBarItemLeft extends Component {
  render() {
    const { toggleFilterNav } = this.props
    return (
      <div className="nav-item-ctn sub-nav-left">
        <ul className="nav">
          <li className="nav-item dropdown">
            <a 
            href="#"
            id="navbarDropdownMenuLink" 
            data-toggle="dropdown" 
            aria-haspopup="true"
            aria-expanded="false"
            className='nav-link dropdown-toggle btn sub-nav-btn' 
            onClick={(e) => { 
              e.preventDefault() 
              toggleFilterNav()
            }}>
              Filters
            </a>
            <div style={{backgroundColor: 'transparent', border: 'none'}} className="dropdown-menu show" aria-labelledby="navbarDropdownMenuLink">
              <HomeFilterView/>
            </div>
          </li>
          <li className='nav-item'>
            <ClearFiltersButton />
          </li>
        </ul>
      </div>
    )
  }
}

SubNavBarItemLeft.prototypes = {
  toggleFilterNav: PropTypes.func
}

export default SubNavBarItemLeft