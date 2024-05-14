import Request from "/apis/request"

import { BaseResponse } from "../types"

import * as ASSETS_TYPES from "./types"
import * as API_URL from "./config"
import { handleApiResponse } from "../errors"

export const appointmentCreate = async (
  params: ASSETS_TYPES.AppointmentCreateRequest,
): Promise<ASSETS_TYPES.AppointmentCreateResponse> => {
  try {
    const res = await Request.post<BaseResponse<ASSETS_TYPES.AppointmentCreateResponse>>(
      API_URL.API_APPOINTMENT_CREATE,
      {
        ...params,
      },
    )

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}
