export interface GetAssetDetailParams {
  id: string
}

export interface GetAssetDetailResponse {
  id: string
  name: string
  code: string
  management_code: string
  management_unit: string
  original_price: string
  residual_price: string
  insurance_contract: string
  image: string
  asset_images: { [key: string]: ImageAsset } | Array<any>
}

export interface ImageAsset {
  name: string
  file_name: string
  uuid: string
  preview_url: string
  original_url: string
  order: number
  custom_properties: Array<any>
  extension: string
  size: number
}

export interface GetDetailAssetDeliveryHistoryParams {
  id: string
}

export interface GetDetailAssetDeliveryHistoryResponse {
  id: string
  asset_id: string
  created_date: string
  receiver: string
  deliver: string
  reason: string
  place_of_use: string
  attachments: string
  code: string
}

export interface GetListAssetDeliveryHistoryByAssetIdParams {
  asset_id: string
  page?: number
  per_page?: number
}

export interface GetListAssetDeliveryHistoryByAssetIdResponse {
  id: string
  asset_id: string
  created_date: string
  receiver: string
  deliver: string
  reason: string
  place_of_use: string
  attachments: string
  code: string
}

export interface GetListAssetMaintenanceByAssetIdParams {
  asset_id: string
  page?: number
  per_page?: number
}

export interface GetListAssetMaintenanceByAssetIdResponse {
  id: string
  asset_id: string
  created_date: string
  created_by: string
  reason: string
  description: string
  proposal: string
}

export interface GetDetailAssetMaintenanceParams {
  id: string
}

export interface GetDetailAssetMaintenanceResponse {
  id: string
  asset_id: string
  created_date: string
  created_by: string
  reason: string
  description: string
  proposal: string
  causal: string
  code: string
}

export interface CreateAssetDeliveryHistoryParams {
  asset_id: string
  name: string
  created_date: string
  receiver: string
  deliver: string
  reason: string
  place_of_use: string
  attachments: string
  code: string
}

export interface CreateAssetDeliveryHistoryResponse extends CreateAssetDeliveryHistoryParams {
  id: string
}

export interface CreateAssetMaintenanceParams {
  asset_id: string
  created_date: string
  created_by: string
  reason: string
  description: string
  proposal: string
  causal: string
  code: string
}

export interface CreateAssetMaintenanceResponse extends CreateAssetMaintenanceParams {
  id: string
}

export interface QrCodeTypes {
  asset: QrAssetType
}

interface QrAssetType {
  id: string
}

export interface SearchParams {
  keyword: string
  module: "asset_delivery" | "asset_maintenance" | string
  page?: number
  per_page?: number
  module_parent_id?: string
}

export interface SearchResponse {
  assets: Array<AssetSearchDetail>
  asset_delivery_histories: Array<AssetSearchDetail>
  asset_maintenances: Array<AssetSearchDetail>
}

export interface AssetSearchDetail {
  id: string
  name: string
  code: string
  created_at: string
}
