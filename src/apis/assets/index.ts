import Request from "/apis/request"

import { BaseResponse } from "../types"

import * as ASSETS_TYPES from "./types"
import * as API_URL from "./config"
import { handleApiResponse } from "../errors"

export const getAssetDetail = async (
  params: ASSETS_TYPES.GetAssetDetailParams,
): Promise<ASSETS_TYPES.GetAssetDetailResponse> => {
  try {
    const res = await Request.get<BaseResponse<ASSETS_TYPES.GetAssetDetailResponse>>(API_URL.API_GET_ASSET_DETAIL, {
      params: params,
    })

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}

export const getDetailAssetDeliveryHistory = async (
  params: ASSETS_TYPES.GetDetailAssetDeliveryHistoryParams,
): Promise<ASSETS_TYPES.GetDetailAssetDeliveryHistoryResponse> => {
  try {
    const res = await Request.get<BaseResponse<ASSETS_TYPES.GetDetailAssetDeliveryHistoryResponse>>(
      API_URL.API_ASSET_DELIVERY_HISTORY_DETAIL,
      {
        params: params,
      },
    )

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}

export const getListAssetDeliveryHistoryByAssetId = async (
  params: ASSETS_TYPES.GetListAssetDeliveryHistoryByAssetIdParams,
): Promise<Array<ASSETS_TYPES.GetListAssetDeliveryHistoryByAssetIdResponse>> => {
  try {
    const res = await Request.get<BaseResponse<Array<ASSETS_TYPES.GetListAssetDeliveryHistoryByAssetIdResponse>>>(
      API_URL.API_ASSET_DELIVERY_HISTORY_LIST,
      {
        params: params,
      },
    )

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}

export const getListAssetMaintenanceByAssetId = async (
  params: ASSETS_TYPES.GetListAssetMaintenanceByAssetIdParams,
): Promise<Array<ASSETS_TYPES.GetListAssetMaintenanceByAssetIdResponse>> => {
  try {
    const res = await Request.get<BaseResponse<Array<ASSETS_TYPES.GetListAssetMaintenanceByAssetIdResponse>>>(
      API_URL.API_ASSET_MAINTENANCE_LIST,
      {
        params: params,
      },
    )

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}

export const getDetailAssetMaintenance = async (
  params: ASSETS_TYPES.GetDetailAssetMaintenanceParams,
): Promise<ASSETS_TYPES.GetDetailAssetMaintenanceResponse> => {
  try {
    const res = await Request.get<BaseResponse<ASSETS_TYPES.GetDetailAssetMaintenanceResponse>>(
      API_URL.API_ASSET_MAINTENANCE_DETAIL,
      {
        params: params,
      },
    )

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}

export const createAssetDeliveryHistory = async (
  params: ASSETS_TYPES.CreateAssetDeliveryHistoryParams,
): Promise<ASSETS_TYPES.CreateAssetDeliveryHistoryResponse> => {
  try {
    const res = await Request.post<BaseResponse<ASSETS_TYPES.CreateAssetDeliveryHistoryResponse>>(
      API_URL.API_ASSET_DELIVERY_HISTORY_CREATE,
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

export const createAssetMaintenance = async (
  params: ASSETS_TYPES.CreateAssetMaintenanceParams,
): Promise<ASSETS_TYPES.CreateAssetMaintenanceResponse> => {
  try {
    const res = await Request.post<BaseResponse<ASSETS_TYPES.CreateAssetMaintenanceResponse>>(
      API_URL.API_ASSET_MAINTENANCE_CREATE,
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

export const searchAsset = async (params: ASSETS_TYPES.SearchParams): Promise<ASSETS_TYPES.SearchResponse> => {
  try {
    const res = await Request.post<BaseResponse<ASSETS_TYPES.SearchResponse>>(API_URL.API_ASSET_SEARCH, {
      ...params,
    })

    handleApiResponse(res)
    const data = res.data.data

    return data
  } catch (error) {
    throw error
  }
}
