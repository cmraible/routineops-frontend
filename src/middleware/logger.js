const logger = store => next => action => {
  if (action.type) {
    console.group(action.type)
    console.info('dispatching', action.type)
    let result = next(action)
    console.log('next state', store.getState())
    console.groupEnd()
    return result
  } else {
    let result = next(action)
    return result
  }
}

export default logger
