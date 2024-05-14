export const log = (...params: Array<unknown>) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.log(...params)
  }
}

export const warn = (...params: Array<unknown>) => {
  if (process.env.NODE_ENV === "development") {
    // eslint-disable-next-line no-console
    console.warn(...params)
  }
}
