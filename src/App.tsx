import "react-native-gesture-handler"

import React, { useEffect } from "react"
import AppNavigator from "/navigators"
import { log, useDoubleBackPressExit } from "./utils"
import { BackHandler, PermissionsAndroid } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"
import { persistor, store } from "/redux/store"
import { PaperProvider } from "react-native-paper"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { useCameraPermission } from "react-native-vision-camera"

const Root = () => {
  const { hasPermission, requestPermission } = useCameraPermission()

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
    // requestCameraPermission()
  }, [])

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES, {
        title: "Cool Photo App Camera Permission",
        message: "Cool Photo App needs access to your library ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      })
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        log("You can use the camera")
      } else {
        log("Camera permission denied")
      }
    } catch (err) {
      log(err)
    }
  }

  return (
    // <Provider store={store}>
    //   <PersistGate persistor={persistor}>
    <PaperProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </PaperProvider>
    //   </PersistGate>
    // </Provider>
  )
}

export default Root
