import { connect } from 'react-redux'
import { addTask } from '../actions'
import AddTask from '../components/AddTask.js'

const mapStateToProps = state => {
  return {
    darkMode: state.darkMode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addTask: () => {
      dispatch(addTask())
    }
  }
}

const AddTaskWrapper = connect(mapStateToProps, mapDispatchToProps)(AddTask)

export default AddTaskWrapper
