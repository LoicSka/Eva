import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SecondaryLayout from './SecondaryLayout'

const SecondaryLayoutContainer = ({component: Component, ...rest}) => {
  return (
        <Route {...rest} render={matchProps => (
            <SecondaryLayout {...matchProps}>
                <Component {...matchProps} />
            </SecondaryLayout>
        )} />
    )
}

export default SecondaryLayoutContainer