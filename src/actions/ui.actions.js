import history from '../history.js';

export const GO_TO_TASK = 'GO_TO_TASK'
export const goToTask = (id) => {
  history.push(`/task/${id}`)
  return {
    type: GO_TO_TASK,
    task_id: id
  }
}

export const GO_TO_PROFILE = 'GO_TO_PROFILE'
export const goToProfile = () => {
  history.push('/profile')
  return {
    type: GO_TO_PROFILE
  }
}

export const GO_TO_TOUR = 'GO_TO_TOUR'
export const goToTour = () => {
  history.push('/?product_tour_id=140175')
  return {
    type: GO_TO_TOUR
  }
}

export const GO_TO_CHECKOUT = 'GO_TO_CHECKOUT'
export const goToCheckout = (email) => {
  history.push('/signup/2/' + email + '/')
  return {
    type: GO_TO_CHECKOUT
  }
}

export const GO_TO_DASHBOARD = 'GO_TO_DASHBOARD'
export const goToDashboard = () => {
  history.push('/dashboard')
  return {
    type: GO_TO_DASHBOARD
  }
}

export const GO_TO_USERS = 'GO_TO_USERS'
export const goToUsers = () => {
  history.push('/users')
  return {
    type: GO_TO_USERS
  }
}

export const GO_TO_ROLES = 'GO_TO_ROLES'
export const goToRoles = () => {
  history.push('/roles')
  return {
    type: GO_TO_ROLES
  }
}

export const GO_TO_ROLE = 'GO_TO_ROLE'
export const goToRole = (role_id) => {
  history.push('/roles/' + role_id)
  return {
    type: GO_TO_ROLE
  }
}

export const GO_TO_SIGNUP = 'GO_TO_SIGNUP'
export const goToSignup = () => {
  history.push('/signup/1/')
  return {
    type: GO_TO_SIGNUP
  }
}

export const GO_TO_SIGNUP_SUCCESS = 'GO_TO_SIGNUP_SUCCESS'
export const goToSignupSuccess = (email) => {
  history.push('/signup/2/' + email + '/')
  return {
    type: GO_TO_SIGNUP_SUCCESS
  }
}

export const GO_TO_FORGOT_SUCCESS = 'GO_TO_FORGOT_SUCCESS'
export const goToForgotSuccess = () => {
  history.push('/forgotsuccess')
  return {
    type: GO_TO_FORGOT_SUCCESS
  }
}

export const GO_TO_ONBOARD_USER = 'GO_TO_ONBOARD_USER'
export const goToOnboardUser = () => {
  history.push('/onboard/user/')
  return {
    type: GO_TO_ONBOARD_USER
  }
}

export const GO_TO_ONBOARD_ORG = 'GO_TO_ONBOARD_ORG'
export const goToOnboardOrg = () => {
  history.push('/onboard/org/')
  return {
    type: GO_TO_ONBOARD_ORG
  }
}

export const GO_TO_ONBOARD_SUBSCRIPTION = 'GO_TO_ONBOARD_SUBSCRIPTION'
export const goToOnboardSubscription = () => {
  history.push('/onboard/subscription/')
  return {
    type: GO_TO_ONBOARD_SUBSCRIPTION
  }
}

export const GO_TO_RESET_SUCCESS = 'GO_TO_RESET_SUCCESS'
export const goToResetSuccess = () => {
  history.push('/resetsuccess')
  return {
    type: GO_TO_RESET_SUCCESS
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
  history.push('/')
  return {
    type: GO_TO_LOGIN
  }
}

export const GO_TO_LAYERS = 'GO_TO_LAYERS'
export const goToLayers = () => {
  history.push('/layers')
  return {
    type: GO_TO_LAYERS
  }
}

export const TOGGLE_DARK_MODE = 'TOGGLE_DARK_MODE'
export const toggleDarkMode = () => ({
  type: TOGGLE_DARK_MODE
});