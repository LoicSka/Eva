import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import { Link } from 'react-router-dom'
import BookingFormModal from './BookingFormModal'
import TutorCalendarModal from './CalendarModal'
import MainNavBar from './MainNavBar'
import UserBottomMenu from './UserBottomMenu'

class SetupLayout extends Component {
  render() {
    return (
      <div>
        <GlobalMessage />
        <UserBottomMenu />
        <TutorCalendarModal />
        <BookingFormModal />
        <MainNavBar />
        <div className="setup-container">
        {this.props.children}
        <div className="footer mt-4">
            <div className="d-flex justify-content-center align-items-center py-4">
                <Link to='/'>Go back to Evasmom.com</Link>
            </div>
        </div>
      </div>
      </div>
    )
  }
}

export default SetupLayout