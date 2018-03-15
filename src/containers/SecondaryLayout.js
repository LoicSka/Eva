import React, { Component } from 'react'
import GlobalMessage from './GlobalMessage'
import MainNavBar from './MainNavBar'

class SecondaryLayout extends Component {
  render() {
    return (
      <div className="secondary-container">
        <MainNavBar />
        <GlobalMessage />
        {this.props.children}
      </div>
    )
  }
}

export default SecondaryLayout