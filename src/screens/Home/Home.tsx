import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { Header, Indicator, QRScanner } from "/components"
import styles from "./styles"
import { DrawerActions, useNavigation } from "@react-navigation/native"
import { log, useDoubleBackPressExit, width } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera"
import { BackHandler, StyleSheet, TouchableOpacity } from "react-native"
import { Appbar, Snackbar } from "react-native-paper"
import { View } from "react-native"
import { GetAssetDetailResponse, QrCodeTypes } from "/apis/assets/types"
import Routes from "/navigators/Routes"
import { isJSONString } from "/utils/utils"
import LottieView from "lottie-react-native"
import { QR_ICON_SCANNER } from "/assets/lotties"
import { launchImageLibrary } from "react-native-image-picker"
import RNQRGenerator from "rn-qr-generator"
import { useMMKVObject } from "react-native-mmkv"
import { KEY_STORAGE } from "/common"

const Home = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [isShowScanner, setIsShowScanner] = useState<Boolean>(false)
  const [isEnableTorch, setIsEnableTorch] = useState<"on" | "off">("off")
  const { hasPermission, requestPermission } = useCameraPermission()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)
  const [snackBarMessage] = useState<string>("Mã QR không hợp lệ")
  const [scanHistory, setScanHistory] = useMMKVObject<Array<GetAssetDetailResponse>>(KEY_STORAGE.SCAN_HISTORY)

  useDoubleBackPressExit(() => {
    BackHandler.exitApp()
  })

  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      const value = codes?.[0]?.value
      setIsShowScanner(false)
      performQRCodeValue(value ?? "")
    },
    regionOfInterest: { height: width, width: width, x: 0, y: 0 },
  })

  const device = useCameraDevice("back")

  useEffect(() => {
    if (!hasPermission) {
      requestPermission()
    }
  }, [])

  const navigationToEquipmentDetail = (assetId: string) => {
    navigator.navigate(Routes.EQUIPMENT_DETAIL, { id: assetId })
  }

  const handleTorch = () => {
    setIsEnableTorch(isEnableTorch === "on" ? "off" : "on")
  }

  const readQRFromGallery = () => {
    setIsShowScanner(false)
    setIsLoading(true)
    launchImageLibrary(
      {
        selectionLimit: 1,
        mediaType: "photo",
        includeBase64: true,
      },
      ({ didCancel, assets, errorCode }) => {
        if (didCancel || errorCode || !assets || assets.length === 0) {
          return
        }
        const image = assets?.[0]
        RNQRGenerator.detect({ uri: image?.uri })
          .then((response) => {
            const values = response?.values
            performQRCodeValue(values?.[0])
          })
          .catch((error) => log("Cannot detect QR code in image", error))
      },
    )
    setIsLoading(false)
  }

  const performQRCodeValue = (qrCodeValue: string) => {
    const validatedJSON = isJSONString(qrCodeValue ?? "")
    if (validatedJSON && qrCodeValue) {
      const assetDetail: QrCodeTypes = JSON.parse(qrCodeValue)
      const id = assetDetail?.asset?.id
      if (id) {
        if (scanHistory === undefined) {
          setScanHistory([])
        }
        navigationToEquipmentDetail(id)
      } else {
        setIsShowSnackBar(true)
      }
    } else {
      setIsShowSnackBar(true)
    }
  }

  const onCloseQrScanner = () => {
    setIsShowScanner(false)
    setIsEnableTorch("off")
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header
        label=""
        leftAction={
          <Appbar.Action
            icon="menu"
            onPress={() => {
              navigator.dispatch(DrawerActions.openDrawer())
            }}
          />
        }
      />
      <View style={styles.contentContainer}>
        {!isShowScanner && (
          <TouchableOpacity
            style={styles.scannerButton}
            disabled={isLoading}
            onPress={() => {
              setIsShowScanner(true)
            }}
          >
            <LottieView source={QR_ICON_SCANNER} autoPlay loop style={styles.scannerButton} />
          </TouchableOpacity>
        )}
      </View>
      {isShowScanner && (
        <View style={StyleSheet.absoluteFill}>
          {device && (
            <Camera
              style={StyleSheet.absoluteFill}
              device={device}
              isActive={true}
              codeScanner={codeScanner}
              torch={isEnableTorch}
            />
          )}
          <QRScanner onPress={onCloseQrScanner} torchOnPress={handleTorch} launcherLibrary={readQRFromGallery} />
        </View>
      )}
      <Snackbar visible={isShowSnackBar} onDismiss={() => setIsShowSnackBar(false)} duration={2000}>
        {snackBarMessage}
      </Snackbar>
      <Indicator isLoading={isLoading} />
    </SafeAreaView>
  )
}

export default Home
