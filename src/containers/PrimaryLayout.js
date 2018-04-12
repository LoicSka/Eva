import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'

class PrimaryLayout extends Component {
  render() {
    return (
      <div className="primary-container">
        <MainNavBar />
        <GlobalMessage />
        {this.props.children}
      </div>
    )
  }
}

export default PrimaryLayout