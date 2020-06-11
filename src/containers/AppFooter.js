import { connect } from 'react-redux'
import { toggleDarkMode, logout } from '../actions'
import IconFooter from '../components/IconFooter'

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    toggleDarkMode: () => {
      dispatch(toggleDarkMode())
    },
    logout: () => {
      dispatch(logout())
    }
  }
}

const AppFooter = connect(mapStateToProps, mapDispatchToProps)(IconFooter)

export default AppFooter
