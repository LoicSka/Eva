import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import SetupLayout from './SetupLayout'

const SetupLayoutContainer = ({component: Component, ...rest}) => {
  return (
        <Route {...rest} render={matchProps => (
            <SetupLayout {...matchProps}>
                <Component {...matchProps} />
            </SetupLayout>
        )} />
    )
}

export default SetupLayoutContainer