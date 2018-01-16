const logger = store => next => action => {
  if (action.type) {
    console.log(action.type, action.data)
  }
  next(action)
}

export default logger
