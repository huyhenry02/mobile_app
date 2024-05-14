import { KEY_STORAGE } from "/common/common"
import { log } from "/utils"
import Storage from "/utils/storage"

export interface TOKEN_SERVICES_TYPES {
  refreshToken: string
  accessToken: string
}

const getLocalRefreshToken = () => {
  const tokenServices: TOKEN_SERVICES_TYPES = Storage.getObject(KEY_STORAGE.TOKEN_SERVICES)

  return tokenServices?.refreshToken
}

const getLocalAccessToken = async () => {
  try {
    const tokenServices: TOKEN_SERVICES_TYPES = await Storage.getObject(KEY_STORAGE.TOKEN_SERVICES)

    return tokenServices?.accessToken
  } catch (error) {
    log("getLocalAccessToken error", error)

    return ""
  }
}

const updateLocalTokenServices = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
  const tokenServices: TOKEN_SERVICES_TYPES = Storage.getObject(KEY_STORAGE.TOKEN_SERVICES)

  tokenServices.accessToken = accessToken
  tokenServices.refreshToken = refreshToken

  Storage.setObject(KEY_STORAGE.TOKEN_SERVICES, tokenServices as unknown as { [key: string]: string })
}

const getLocalTokenServices = () => {
  return Storage.getObject(KEY_STORAGE.TOKEN_SERVICES)
}

const setLocalTokenServices = (tokenServices: { accessToken: string; refreshToken: string }) => {
  Storage.setObject(KEY_STORAGE.TOKEN_SERVICES, tokenServices)
}

const removeLocalTokenServices = () => {
  Storage.delete(KEY_STORAGE.TOKEN_SERVICES)
}

const TokenService = {
  getLocalRefreshToken,
  getLocalAccessToken,
  updateLocalTokenServices,
  getLocalTokenServices,
  setLocalTokenServices,
  removeLocalTokenServices,
}

export default TokenService
