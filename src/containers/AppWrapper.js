import React from 'react'
import { connect } from 'react-redux'
import { toggleDarkMode, login } from '../actions'
import App from '../components/App'
import operationallyTheme from '../operationallyTheme.js';
import AppHeader from './AppHeader.js';
import AppFooter from './AppFooter.js';



const mapStateToProps = state => {
  const header = <AppHeader />
  const footer = <AppFooter />
  return {
    darkMode: state.darkMode,
    theme: operationallyTheme,
    header: header,
    footer: footer,
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDarkMode: () => {
      dispatch(toggleDarkMode())
    },
    login: (username, password) => {
      dispatch(login(username, password))
    }
  }
}

const AppWrapper = connect(mapStateToProps, mapDispatchToProps)(App)

export default AppWrapper
