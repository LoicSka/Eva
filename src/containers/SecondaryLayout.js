import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'
import UserTypeSelectModal from './UserTypeSelectModal'
import TutorAccountModal from './TutorAccountModal'
import Footer from '../components/Footer'
import UserBottomMenu from './UserBottomMenu'

class SecondaryLayout extends Component {
  render() {
    return (
      <div className="secondary-container">
        <GlobalMessage />
        <UserBottomMenu />
        <MainNavBar />
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default SecondaryLayout