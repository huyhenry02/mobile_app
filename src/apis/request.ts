import axios from "axios"
import Config from "react-native-config"
import { requestLog } from "./logger"
import TokenService from "./tokenServices"
import { log } from "/utils"
import { reset } from "/navigators/_root_navigator"
import Routes from "/navigators/Routes"

const headers = {
  "Content-Type": "application/json",
}

const BASE_URL = Config.API_URL

const Request = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers,
})

Request.interceptors.request.use(
  async (config) => {
    const accessToken = await TokenService.getLocalAccessToken()
    if (accessToken) {
      config.headers.Authorization = accessToken
    }

    requestLog(config.method, config?.url, config, "req")

    return config
  },
  (error) => {
    log("error", error)

    return Promise.reject(error)
  },
)

Request.interceptors.response.use(
  (res) => {
    requestLog(res.config.method, res?.config?.url, res, "res")

    return res
  },
  async (err) => {
    const originalConfig = err.config
    if (err?.response?.status === 401) {
      reset(Routes.AUTH, { screen: Routes.LOGIN })
    }

    requestLog(err.config.method, err?.config?.url, err, "err")

    return Promise.reject(err)
  },
)

export const setAccessToken = async () => {
  const accessToken = await TokenService.getLocalAccessToken()
  if (accessToken) {
    log("accessToken", accessToken)
    Request.defaults.headers.Authorization = accessToken
  }
}

export default Request
