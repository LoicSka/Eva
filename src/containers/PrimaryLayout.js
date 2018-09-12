import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'
import Footer from '../components/Footer'
import DescriptionModal from './DescriptionModal'
import UserBottomMenu from './UserBottomMenu'

class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primary-container">
        <DescriptionModal />
        <GlobalMessage />
        <UserBottomMenu />
        <MainNavBar />
        {this.props.children}
        <Footer/>
      </div>
    )
  }
}

export default PrimaryLayout