import history from '../history.js';

export const GO_TO_PROFILE = 'GO_TO_PROFILE'
export function goToProfile() {
  history.push('/profile')
  return {
    type: GO_TO_PROFILE
  }
}

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP'
export function goToSignup() {
  history.push('/signup')
  return {
    type: GO_TO_SIGNUP
  }
}

export const GO_TO_ORG = 'GO_TO_ORG'
export function goToOrg() {
  history.push('/organization')
  return {
    type: GO_TO_ORG
  }
}

export const GO_TO_DASH = 'GO_TO_DASH'
export function goToDash() {
  history.push('/dash')
  return {
    type: GO_TO_DASH
  }
}

export const GO_TO_GRID = 'GO_TO_GRID'
export function goToGrid() {
  history.push('/grid')
  return {
    type: GO_TO_GRID
  }
}

export const GO_TO_LIST = 'GO_TO_LIST'
export function goToList() {
  history.push('/list')
  return {
    type: GO_TO_LIST
  }
}

export const GO_TO_ADD_TASK = 'GO_TO_ADD_TASK'
export function goToAddTask() {
  history.push('/addtask')
  return {
    type: GO_TO_ADD_TASK
  }
}

export const GO_TO_LOGIN = 'GO_TO_LOGIN'
export function goToLogin() {
  history.push('/login')
  return {
    type: GO_TO_LOGIN
  }
}

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export function toggleDarkMode() {
  return {
    type: TOGGLE_DARK_MODE
  }
}
