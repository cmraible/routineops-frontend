import { connect } from 'react-redux'
import { toggleDarkMode } from '../actions'
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
    }
  }
}

const AppSidebar = connect(mapStateToProps, mapDispatchToProps)(IconSidebar)

export default AppSidebar
