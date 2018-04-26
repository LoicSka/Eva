import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { hideFilterNav, loadTutorAccounts } from '../actions'
import TutorAccountThumbnail from './TutorAccountThumbnail'
import { chunk } from 'lodash'
import moment from 'moment'

class HomeTutorListView extends Component {
  async componentDidMount() {
    const { hideFilterNav, loadTutorAccounts } = this.props
    document.onkeydown = (evt) => {
      evt = evt || window.event
      var charCode = evt.keyCode || evt.which
      if (charCode === 27) {
        hideFilterNav()
      }
    }
    await loadTutorAccounts()
  }

  render() {
    const { filter: { filterKey }, paginatedTutorAccounts, tutorAccounts } = this.props
    const currentFilterState = paginatedTutorAccounts[filterKey]
    var tutorAccountIds = []
    if (typeof(currentFilterState) !== 'undefined') {
      tutorAccountIds = currentFilterState.ids
    } 
    const chunkedIds = chunk(tutorAccountIds, 4)

    const rows = chunkedIds.map((ids) => {
      const columns = ids.map((id) => {
        const tutorAccount = tutorAccounts[id]
        const age = tutorAccount.dob ? moment().diff(moment(new Date(tutorAccount.dob).getTime(), 'YYYYMMDD'), 'years') : null
        return (
          <div key={id} className='col-md-3'>
            <TutorAccountThumbnail 
            avatar={tutorAccount.avatarUrl} 
            fullName={tutorAccount.fullName} 
            location={tutorAccount.location} 
            age={age} 
            rating={4} 
            classesCount={tutorAccount.bookings.length} 
            coursesCount={tutorAccount.courses.length} 
            isPro={tutorAccount.pro}
            experience={tutorAccount.teachingExperience} />
          </div>
        )
      })

      return (
        <div className='row' style={{marginBottom: '15px'}}>
          {columns}
        </div>
      )
    })
    
    return (
      <div className="container" onClick={hideFilterNav} style={{padding: 0, marginTop: '15px'}}>
        <div className="row justify-content-center">
          <div className="col-md-10" style={{ padding: 0, height: '200px'}}>
            { rows }
          </div>
        </div>
      </div>
    )
  }
}

const mapSateToProps = (state) => {
  const { navigation: { isFilterNavHidden }, filter, pagination: {  paginatedTutorAccounts }, entities: { tutorAccounts } } = state
  return {
    filter,
    isFilterNavHidden,
    paginatedTutorAccounts,
    tutorAccounts
  }
}

export default connect(mapSateToProps, { hideFilterNav, loadTutorAccounts})(HomeTutorListView)