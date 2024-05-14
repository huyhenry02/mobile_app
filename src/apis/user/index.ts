import Request from "/apis/request"
import { API_DEFAULT } from "/apis/urls"

import { PageParams, ParamsError } from "../schedule/types"
import { BaseResponse, Paging } from "../types"
import {
  CHANGE_NOTIFICATION_,
  GET_LIST_PACKAGE,
  GET_NOTIFICATION,
  GET_TRANSACTION,
  GET_TRANSACTION_DETAIL,
  READ_ALL_NOTIFICATION,
  REMOVE_NOTIFICATION_,
  REMOVE_TOKEN,
  REPORT,
  SAVE_TOKEN,
} from "./config"
import { LIST_PACKAGE, NOTIFICATION_FULL, TRANSACTION_DATA, TRANSACTION_DETAIL } from "./types"

export const getWalletInfo = async (param: Paging) => {
  try {
    const res = await Request.post<BaseResponse<TRANSACTION_DATA>>(API_DEFAULT, {
      ...GET_TRANSACTION,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getPaymentDetail = async (param: { IdTransaction: number }) => {
  try {
    const res = await Request.post<BaseResponse<TRANSACTION_DETAIL>>(API_DEFAULT, {
      ...GET_TRANSACTION_DETAIL,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getNotification = async (param: PageParams) => {
  try {
    const res = await Request.post<BaseResponse<NOTIFICATION_FULL>>(API_DEFAULT, {
      ...GET_NOTIFICATION,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const readAllNotification = async () => {
  try {
    const res = await Request.post<BaseResponse<boolean>>(API_DEFAULT, {
      ...READ_ALL_NOTIFICATION,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const changeNotificationStatus = async (param: { notificationId: number }) => {
  try {
    const res = await Request.post<BaseResponse<string>>(API_DEFAULT, {
      ...CHANGE_NOTIFICATION_,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const getListPackage = async () => {
  try {
    const res = await Request.post<BaseResponse<Array<LIST_PACKAGE>>>(API_DEFAULT, {
      ...GET_LIST_PACKAGE,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const removeNotification = async (param: { id: number }) => {
  try {
    const res = await Request.post<BaseResponse<string>>(API_DEFAULT, {
      ...REMOVE_NOTIFICATION_,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const saveToken = async (param: { token: string; imei: string }) => {
  try {
    const res = await Request.post<BaseResponse<string>>(API_DEFAULT, {
      ...SAVE_TOKEN,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    // return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const removeToken = async (param: { token: string }) => {
  try {
    const res = await Request.post<BaseResponse<boolean>>(API_DEFAULT, {
      ...REMOVE_TOKEN,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    // return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}

export const reportError = async (param: ParamsError) => {
  try {
    const res = await Request.post<BaseResponse<boolean>>(API_DEFAULT, {
      ...REPORT,
      ...param,
    })
    if (!res || !res.data.success) {
      throw new Error(res.data.message)
    }

    // return res.data.data
  } catch (error) {
    throw new Error(error)
  }
}
