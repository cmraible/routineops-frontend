import React from 'react'
import { connect } from 'react-redux'
import { toggleDarkMode, login } from '../actions'
import App from '../components/App'
import operationallyTheme from '../operationallyTheme.js';
import AppSidebar from './AppSidebar.js';


const mapStateToProps = state => {
  const sidebar = <AppSidebar />
  return {
    darkMode: state.darkMode,
    theme: operationallyTheme,
    sidebar: sidebar,
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
