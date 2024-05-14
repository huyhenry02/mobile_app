import { log } from "/utils"

/**
 * A simple {@link Promise} timeout to give some delay
 *
 * @param ms The time to delay (in millisecond)
 */
export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms))

export const requestLog = (method: string = "", url: string = "", data: unknown, type: "req" | "res" | "err") => {
  const tag = type === "req" || type === "res" ? method : "error"
  const colors = {
    req: "blue",
    res: "green",
    err: "red",
  }
  const icons = {
    req: ">>>",
    res: "<<<",
    err: "xxx",
  }

  log(
    `%c${icons[type]} [${tag.toUpperCase()}] | %c${url.toUpperCase()} \n`,
    `color: ${colors[type]}; font-weight: bold`,
    "color: violet; font-weight: bold",
    data,
  )
}
