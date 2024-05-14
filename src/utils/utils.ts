import _, { isArray, isObject } from "lodash"
import { CreateAssetDeliveryHistoryParams, CreateAssetMaintenanceParams, ImageAsset } from "/apis/assets/types"
import { log } from "./log"
import { AppointmentCreateRequest } from "/apis/appointment/types"

export function validateParams(
  params: CreateAssetDeliveryHistoryParams | CreateAssetMaintenanceParams | AppointmentCreateRequest,
): boolean {
  let isValid = false
  _.forIn(params, function (value, key) {
    if (value?.length === 0 || isOnlyWhiteSpace(value) || value === undefined || value === null) {
      isValid = false

      return false
    }
    isValid = true
  })

  return isValid
}

export function isOnlyWhiteSpace(params: string): boolean {
  var regex = /^\s*$/

  return regex.test(params)
}
export function isJSONString(str: string) {
  try {
    JSON.parse(str)

    return true
  } catch (e) {
    return false
  }
}

export function formatMoney(money: string): string {
  const moneyValue = Number(money)

  if (isNaN(moneyValue)) {
    return money
  }

  const formatted = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(moneyValue)

  return formatted
}

export const getAssetImage = (asset_images: { [key: string]: ImageAsset } | Array<any>): string => {
  const defaultImage =
    "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"

  if (isObject(asset_images)) {
    const imageValues = _.head(_.values(asset_images)) as ImageAsset

    return imageValues?.original_url ?? defaultImage
  }

  return defaultImage
}

export const keyExtractor = (item: any, index: number): string => {
  return index.toString()
}
