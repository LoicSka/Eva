import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'
import SubNavBar from './SubNavBar'
import Footer from '../components/Footer'
import UserBottomMenu from './UserBottomMenu'

class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primary-container">
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