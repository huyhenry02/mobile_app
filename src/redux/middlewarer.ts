import createSagaMiddleware from "redux-saga"
import { ReduxLoggerOptions } from "redux-logger"
import rootSaga from "./sagas"
import { SagaMiddlewareOptions } from "redux-saga"

export const loggerOptions: ReduxLoggerOptions = {
  collapsed: true,
  duration: true,
  timestamp: true,
}

export const sagaOptions: SagaMiddlewareOptions = {}

const sagaMiddleware = createSagaMiddleware(sagaOptions)

/**
 * Setup and return all middlewares needed for the development
 */
const getDevMiddlewares = () => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line global-require
    const { createLogger } = require("redux-logger")
    const logger = createLogger(loggerOptions)

    return [
      logger,
      // Add more dev middlewares here...
    ]
  }

  return []
}

/**
 * Setup middlewares
 *
 * This must be run after the redux's [applyMiddleware] function
 */
export const setupMiddleware = () => {
  sagaMiddleware.run(rootSaga)
}

const middlewares = [sagaMiddleware, ...getDevMiddlewares()]

export default middlewares
