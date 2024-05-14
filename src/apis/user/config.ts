import { FN, M } from "../Const"
import { BaseUrl } from "../types"

export const GET_TRANSACTION: BaseUrl = {
  m: M.TRANSACTION,
  fn: FN.GET_TRANSACTION,
}

export const GET_TRANSACTION_DETAIL: BaseUrl = {
  m: M.TRANSACTION,
  fn: FN.DETAIL_TRANSACTION,
}

export const GET_NOTIFICATION: BaseUrl = {
  m: M.NOTIFICATION,
  fn: FN.GET_NOTIFICATION_LIST,
}

export const READ_ALL_NOTIFICATION: BaseUrl = {
  m: M.NOTIFICATION,
  fn: FN.READ_ALL_NOTIFICATION,
}

export const CHANGE_NOTIFICATION_: BaseUrl = {
  m: M.NOTIFICATION,
  fn: FN.CHANGE_NOTIFICATION_STATUS,
}

export const GET_LIST_PACKAGE: BaseUrl = {
  m: M.BOOKING,
  fn: FN.LIST_PACKAGE,
}

export const REMOVE_NOTIFICATION_: BaseUrl = {
  m: M.NOTIFICATION,
  fn: FN.REMOVE_NOTIFICATION,
}

export const SAVE_TOKEN: BaseUrl = {
  m: M.MEMBER_APP,
  fn: FN.ADD_TOKEN,
}

export const REMOVE_TOKEN: BaseUrl = {
  m: M.MEMBER_APP,
  fn: FN.LOGOUT,
}
export const REPORT: BaseUrl = {
  m: M.ERROR_REPORT,
  fn: FN.REPOR,
}
