import { connect } from 'react-redux'
import { toggleDarkMode, logout } from '../actions'
import IconSidebar from '../components/IconSidebar'

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

const AppSidebar = connect(mapStateToProps, mapDispatchToProps)(IconSidebar)

export default AppSidebar
