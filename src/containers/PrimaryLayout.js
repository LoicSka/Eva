import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'
import SubNavBar from './SubNavBar'

class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primary-container">
        <MainNavBar />
        <SubNavBar/>
        <GlobalMessage />
        {this.props.children}
      </div>
    )
  }
}

export default PrimaryLayout