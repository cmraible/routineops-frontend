import history from '../history.js';

export const GO_TO_PROFILE = 'GO_TO_PROFILE'
export const goToProfile = () => {
  history.push('/profile')
  return {
    type: GO_TO_PROFILE
  }
}

export const GO_TO_ROLES = 'GO_TO_ROLES'
export const goToRoles = () => {
  history.push('/roles')
  return {
    type: GO_TO_ROLES
  }
}

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP'
export const goToSignup = () => {
  history.push('/signup')
  return {
    type: GO_TO_SIGNUP
  }
}


export const GO_TO_HOME = 'GO_TO_HOME'
export const goToHome = () => {
  history.push('/')
  return {
    type: GO_TO_HOME
  }
}


export const GO_TO_ORG = 'GO_TO_ORG'
export const goToOrg = () => {
  history.push('/organization')
  return {
    type: GO_TO_ORG
  }
}

export const GO_TO_SETTINGS = 'GO_TO_SETTINGS'
export const goToSettings = () => {
  history.push('/settings')
  return {
    type: GO_TO_SETTINGS
  }
}

export const GO_TO_DASH = 'GO_TO_DASH'
export const goToDash = () => {
  history.push('/dash')
  return {
    type: GO_TO_DASH
  }
}

export const GO_TO_CALENDAR = 'GO_TO_CALENDAR'
export const goToCalendar = () => {
  history.push('/calendar')
  return {
    type: GO_TO_CALENDAR
  }
}

export const GO_TO_LIST = 'GO_TO_LIST'
export const goToList = () => {
  history.push('/list')
  return {
    type: GO_TO_LIST
  }
}

export const GO_TO_TASKS = 'GO_TO_TASKS'
export const goToTasks = () => {
  history.push('/tasks')
  return {
    type: GO_TO_TASKS
  }
}

export const GO_TO_LOGIN = 'GO_TO_LOGIN'
export const goToLogin = () => {
  history.push('/login')
  return {
    type: GO_TO_LOGIN
  }
}

export const GO_TO_MATRIX = 'GO_TO_MATRIX'
export const goToMatrix = () => {
  history.push('/matrix')
  return {
    type: GO_TO_MATRIX
  }
}

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE
});