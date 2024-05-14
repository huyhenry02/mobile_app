import { MMKV } from "react-native-mmkv"

const storage = new MMKV()

import { log } from "/utils/log"

class Storage {
  static getString(key: string) {
    try {
      const value: string | undefined = storage.getString(key)
      log("Get Value", key, "Successes!", value)

      return value
    } catch (error) {
      throw error
    }
  }

  static getNumber(key: string) {
    try {
      const value: number | undefined = storage.getNumber(key)
      log("Get Value", key, "Successes!", value)

      return value
    } catch (error) {
      throw error
    }
  }

  static getBoolean(key: string) {
    try {
      const value: boolean | undefined = storage.getBoolean(key)
      log("Get Value", key, "Successes!", value)

      return value
    } catch (error) {
      throw error
    }
  }

  static getAllKeys() {
    try {
      const value: Array<string> = storage.getAllKeys()
      log("Get All Keys Successes!", value)

      return value
    } catch (error) {
      throw error
    }
  }

  static set(key: string, value: boolean | string | number) {
    try {
      log("Set Successes!", value)

      return storage.set(key, value)
    } catch (error) {
      throw error
    }
  }

  static getObject(key: string) {
    try {
      const value: string | undefined = storage.getString(key)
      const parseToObject = JSON.parse(value!)

      return parseToObject
    } catch (error) {
      throw error
    }
  }

  static setObject(key: string, value?: { [key: string]: string }) {
    try {
      const convertToString = JSON.stringify(value)

      return storage.set(key, convertToString)
    } catch (error) {
      throw error
    }
  }

  static delete(key: string) {
    try {
      log("Delete Successes!", key)

      return storage.delete(key)
    } catch (error) {
      throw error
    }
  }

  static async clearAll() {
    try {
      storage.clearAll()
      log("ClearAll Successes!")
    } catch (e) {
      log("clearAllError:", e)
    }
  }
}

export default Storage
