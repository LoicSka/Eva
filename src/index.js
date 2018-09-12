import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import { setCurrentUser, setActiveLocale, setWalkthroughStep } from'./actions'
import jwtDecode from 'jwt-decode'
import './styles/styles.css'
import { initialize } from 'react-localize-redux'
import { addTranslation, setActiveLanguage } from 'react-localize-redux'
import getBrowserLanguage from 'get-browser-language'
import { camelizeKeys } from 'humps'

const languages = [
  { name: 'English', code: 'en' },
  { name: 'Chinese', code: 'cn' } 
];
const locales = require('./locales/global.json')
const store = configureStore()

store.dispatch(initialize(languages, { defaultLanguage: 'en' }))

// localization
const { locale = null, walkthrough = null } = localStorage
if (locale) {
  store.dispatch(setActiveLanguage(localStorage.locale))
} else {
  store.dispatch(setActiveLocale(getBrowserLanguage().indexOf('zh-') === -1 ? 'en' : 'cn'))
}

if (walkthrough) {
  store.dispatch(setWalkthroughStep(walkthrough))
} else {
  store.dispatch(setWalkthroughStep(0))
}

store.dispatch(addTranslation(locales))

// authorization
if (localStorage.jwtToken) {
  store.dispatch(setCurrentUser(camelizeKeys(jwtDecode(localStorage.jwtToken))))
}

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)

