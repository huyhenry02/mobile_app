import { isNumber } from "lodash"
import { CustomError } from "./CustomError"
import { BaseResponse } from "./types"

export const UNAUTHORIZED = new Error("error.unauthorized")
export const NOT_FOUND_ERROR = new Error("error.notFound")
export const NETWORK_ERROR = new Error("error.network")
export const TIMEOUT_ERROR = new Error("error.timeout")
export const SYSTEM_ERROR = new Error("error.system")

export const commonErrors: { [key: number]: Error } = {
  401: UNAUTHORIZED,
  404: NOT_FOUND_ERROR,
  500: SYSTEM_ERROR,
}

export const commonErrorMessage: { [key: string]: Error } = {
  GENERAL: SYSTEM_ERROR,
  "Network Error": NETWORK_ERROR,
  "timeout of 10000ms exceeded": TIMEOUT_ERROR,
}

export function handleApiResponse(res: BaseResponse<any>) {
  const statusCode = res?.data?.status || res?.data?.statusCode
  if (isNumber(statusCode) && statusCode !== 200) {
    // throw error
    const customError = new CustomError(statusCode || 0, res?.data?.message || `Đã có lỗi xảy ra ${statusCode}`)

    throw customError
  }
}
