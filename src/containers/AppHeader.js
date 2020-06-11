import { connect } from 'react-redux'
import { toggleDarkMode, logout } from '../actions'
import IconHeader from '../components/IconHeader'

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

const AppHeader = connect(mapStateToProps, mapDispatchToProps)(IconHeader)

export default AppHeader
