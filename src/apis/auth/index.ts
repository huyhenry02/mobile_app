import Request from "/apis/request"

import { BaseResponse } from "../types"

import { LoginParams } from "./types"
import { LoginResponse } from "/models/Token"
import { log } from "/utils"
import TokenService from "../tokenServices"
import { API_LOGIN } from "./config"
import { CustomError } from "../CustomError"
import { isNumber } from "lodash"
import { handleApiResponse } from "../errors"

export const login = async (params: LoginParams): Promise<LoginResponse> => {
  try {
    const res = await Request.post<BaseResponse<LoginResponse>>(API_LOGIN, {
      ...params,
    })
    const data = res.data.data

    handleApiResponse(res)

    TokenService.setLocalTokenServices({ accessToken: `Bearer ${data?.access_token}`, refreshToken: "" })

    return data
  } catch (error) {
    throw error
  }
}
