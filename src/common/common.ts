import moment from "moment"
import { CreateAssetDeliveryHistoryParams, CreateAssetMaintenanceParams } from "/apis/assets/types"
import { AppointmentCreateRequest } from "/apis/appointment/types"

export const KEY_STORAGE = {
  TOKEN_SERVICES: "TokenServices",
  SCAN_HISTORY: "SCAN_HISTORY",
}

export const DATE_FORMAT = "YYYY-MM-DD HH:mm:ss"
export const PER_PAGE = 10
export const DEFAULT_CREATE_DELIVERY_PARAMS: CreateAssetDeliveryHistoryParams = {
  asset_id: "",
  attachments: "",
  code: "",
  created_date: moment().format(DATE_FORMAT),
  deliver: "",
  name: "",
  place_of_use: "",
  reason: "",
  receiver: "",
}

export const DEFAULT_CREATE_MAINTENANCE_PARAMS: CreateAssetMaintenanceParams = {
  asset_id: "",
  created_by: "",
  created_date: moment().format(DATE_FORMAT),
  description: "",
  proposal: "",
  reason: "",
  causal: "",
  code: "",
}

export const DEFAULT_APPOINTMENT_CREATE_REQUEST: AppointmentCreateRequest = {
  email: "",
  employee_id: "",
  end_time: moment().format(DATE_FORMAT),
  identification: "",
  name: "",
  phone: "",
  reason: "",
  start_time: moment().format(DATE_FORMAT),
}
