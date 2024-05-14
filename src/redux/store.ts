import { AppState } from "./"
import { applyMiddleware, createStore } from "redux"
import { persistReducer, PersistConfig, persistStore, createTransform, Storage } from "redux-persist"
import reducers, { AppReducerType } from "./reducers"
import { MMKV } from "react-native-mmkv"
import middlewares, { setupMiddleware } from "./middlewarer"
import { ReduxStateType } from "./types"
import { setAccessToken } from "/apis/request"

const storage = new MMKV()
export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value)

    return Promise.resolve(true)
  },
  getItem: (key) => {
    const value = storage.getString(key)

    return Promise.resolve(value)
  },
  removeItem: (key) => {
    storage.delete(key)

    return Promise.resolve()
  },
}

export const persistOptions: PersistConfig<AppState> = {
  key: "root",
  version: 0,
  storage: reduxStorage,
  whitelist: [],
  transforms: [
    createTransform(
      (states) => {
        return { ...states, state: ReduxStateType.INIT, error: undefined }
      },
      (states) => {
        // if (states && states.token) {
        //   setAccessToken()
        // }

        return states
      },
    ),
  ],
}
const persistedReducer = persistReducer(persistOptions, reducers)

const store = createStore(persistedReducer, applyMiddleware(...middlewares))
const persistor = persistStore(store)

setupMiddleware()

export { store, persistor }
