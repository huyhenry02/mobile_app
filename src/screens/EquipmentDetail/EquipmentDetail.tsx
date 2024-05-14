import React, { useEffect, useState } from "react"

import { AlertDialog, EquipmentTable, Header, Indicator, Text } from "/components"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { EquipmentDetailRoute, RootStackParamList, ScreenRoute } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Button, Snackbar } from "react-native-paper"
import Routes from "/navigators/Routes"
import { Image, ScrollView, View } from "react-native"
import { ButtonMode } from "./types"
import { getAssetDetail } from "/apis/assets"
import { EquipmentElementInfo } from "/components/EquipmentTable/types"
import { GetAssetDetailResponse, QrCodeTypes } from "/apis/assets/types"
import _ from "lodash"
import Config from "react-native-config"
import { formatMoney, getAssetImage } from "/utils/utils"
import { KEY_STORAGE } from "/common"
import { useMMKVObject } from "react-native-mmkv"

const TABLE_INFO_DEFAULT = [
  { label: "Tên thiết bị:", value: "" },
  { label: "Mã tài sản:", value: "" },
  { label: "Mã quản lý:", value: "" },
  { label: "Đơn vị quản lý:", value: "" },
  { label: "Nguyên giá:", value: "" },
  { label: "Giá trị còn lại:", value: "" },
  { label: "Hợp đồng bảo hiểm:", value: "" },
]

const EquipmentDetail = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<EquipmentDetailRoute>()
  const id = route?.params?.id ?? ""

  const [scanHistory, setScanHistory] = useMMKVObject<Array<GetAssetDetailResponse>>(KEY_STORAGE.SCAN_HISTORY)
  const [assetsTableDetail, setAssetTableDetail] = useState<Array<EquipmentElementInfo>>(TABLE_INFO_DEFAULT)
  const [imageEquipment, setImageEquipment] = useState<string>("https://")
  const [assetDetail, setAssetDetail] = useState<GetAssetDetailResponse>()
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false)

  const performGoBack = () => {
    navigator.goBack()
  }

  const buttonValues = [
    {
      screenName: Routes.EQUIPMENT_DETAIL,
      label: "Chi tiết",
      buttonMode: "contained",
    },
    {
      screenName: Routes.HISTORY_MAINTENANCES,
      label: "Lịch sử sửa chữa",
      buttonMode: "text",
    },
    { screenName: Routes.HISTORY_DELIVERY, label: "Lịch sử giao nhận", buttonMode: "text" },
  ]

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    try {
      const data = await getAssetDetail({ id: id })
      const tableInfo: Array<EquipmentElementInfo> = [
        { label: "Tên thiết bị:", value: data?.name },
        { label: "Mã tài sản:", value: data?.code },
        { label: "Mã quản lý:", value: data?.management_code },
        { label: "Đơn vị quản lý:", value: data?.management_unit },
        { label: "Nguyên giá:", value: formatMoney(data?.original_price) },
        { label: "Giá trị còn lại:", value: formatMoney(data?.residual_price) },
        { label: "Hợp đồng bảo hiểm:", value: data?.insurance_contract },
      ]
      const imageUri = getAssetImage(data?.asset_images)
      setImageEquipment(
        _.replace(imageUri, "http://localhost:8099", Config.API_URL || "https://wishcare.stg.nk-software.net"),
      )
      setAssetTableDetail(tableInfo)
      setAssetDetail(data)

      setScanHistory(_.unionBy(scanHistory, [data], "id"))
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setIsShowDialog(true)
      setSnackBarMessage("Không tải được thông tin thiết bị")
      log("getDetail error", error)
    }
  }

  const performNavigation = (screenName: ScreenRoute) => {
    switch (screenName) {
      case Routes.HISTORY_MAINTENANCES:
      case Routes.HISTORY_DELIVERY:
      case Routes.REPORT_EQUIPMENT:
        navigator.navigate(screenName, { asset_id: id })
        break

      case Routes.CREATE_DELIVERY_NOTE:
        navigator.navigate(screenName, { asset_id: id, name: assetDetail?.name ?? "" })
        break
      default:
        break
    }
  }

  const renderNavigationButton = () => {
    return (
      <View style={styles.buttonsNavigationContainer}>
        {buttonValues.map((item, index) => (
          <Button
            key={index}
            mode={item.buttonMode as ButtonMode}
            style={styles.buttonNavigationStyle}
            onPress={() => performNavigation(item.screenName as ScreenRoute)}
          >
            {item.label}
          </Button>
        ))}
      </View>
    )
  }

  const onDismissDialog = () => {
    setIsShowDialog(false)
    performGoBack()
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header backAction={performGoBack} label="Thiết bị" />

      {renderNavigationButton()}
      <ScrollView contentContainerStyle={styles.contentContainerStyle}>
        <Image source={{ uri: imageEquipment }} style={styles.imageStyle} resizeMode="contain" />
        <EquipmentTable equipmentData={assetsTableDetail} />
      </ScrollView>

      <View style={styles.buttonsContainer}>
        <Button
          style={[styles.buttonStyle, { marginRight: 15 }]}
          contentStyle={styles.buttonContentStyle}
          mode="outlined"
          onPress={() => performNavigation(Routes.CREATE_DELIVERY_NOTE)}
          labelStyle={styles.buttonLabelStyle}
        >
          Tạo phiếu giao nhận
        </Button>
        <Button
          style={styles.buttonStyle}
          contentStyle={styles.buttonContentStyle}
          mode="contained"
          onPress={() => performNavigation(Routes.REPORT_EQUIPMENT)}
          labelStyle={styles.buttonLabelStyle}
        >
          Báo cáo hư hỏng
        </Button>
      </View>
      <AlertDialog content={snackBarMessage} title="Thông báo" onDismiss={onDismissDialog} visible={isShowDialog} />
      <Indicator isLoading={isLoading} />
    </SafeAreaView>
  )
}

export default EquipmentDetail
