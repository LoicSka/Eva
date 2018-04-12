import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import PrimaryLayout from './PrimaryLayout'

const PrimaryLayoutContainer = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <PrimaryLayout {...matchProps}>
        <Component {...matchProps} />
      </PrimaryLayout>
    )} />
  )
}

export default PrimaryLayoutContainer