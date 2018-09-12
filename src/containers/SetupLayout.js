import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import { Link } from 'react-router-dom'
import BookingFormModal from './BookingFormModal'
import TutorCalendarModal from './CalendarModal'
import DescriptionModal from './DescriptionModal'
import MainNavBar from './MainNavBar'
import Walkthrough from './Walkthrough'
import UserBottomMenu from './UserBottomMenu'

class SetupLayout extends Component {
  render() {
    return (
      <div>
        <DescriptionModal />
        <GlobalMessage />
        <UserBottomMenu />
        <TutorCalendarModal />
        <BookingFormModal />
        <MainNavBar />
        <Walkthrough />
        <div className="setup-container">
          {this.props.children}
          <div className="footer mt-4">
              <div className="d-flex justify-content-center align-items-center py-4">
                  <Link to='/'>Go back to Evamama.com</Link>
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SetupLayout