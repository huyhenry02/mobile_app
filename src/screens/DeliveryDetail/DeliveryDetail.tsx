import React, { useEffect, useState } from "react"
import { Header, HistoryInfo, HistoryItem, SizedBox } from "/components"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { log } from "/utils"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { DeliveryDetailRoute, RootStackParamList } from "/navigators/types"
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-paper"
import Routes from "/navigators/Routes"
import { getDetailAssetDeliveryHistory } from "/apis/assets"
import { GetDetailAssetDeliveryHistoryResponse } from "/apis/assets/types"
import { HistoryItemInfoType } from "/components/HistoryInfo/types"
import moment from "moment"
const TABLE_INFO_DEFAULT = [
  { label: "Người nhận", value: "..." },
  { label: "Người tạo phiếu", value: "..." },
  { label: "Lí do giao nhận", value: "..." },
  { label: "Địa điểm sử dụng", value: "..." },
  { label: "Tài liệu kèm theo", value: "..." },
  { label: "Số kiểm soát", value: "..." },
]
const DeliveryDetail = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<DeliveryDetailRoute>()
  const id = route?.params?.id
  const [detailData, setDetailData] = useState<GetDetailAssetDeliveryHistoryResponse>()
  const [historyData, setHistoryData] = useState<Array<HistoryItemInfoType>>(TABLE_INFO_DEFAULT)

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    try {
      const data = await getDetailAssetDeliveryHistory({ id: id })
      const tableInfo: Array<HistoryItemInfoType> = [
        { label: "Người nhận", value: data?.receiver },
        { label: "Người tạo phiếu", value: data?.deliver },
        { label: "Lí do giao nhận", value: data?.reason },
        { label: "Địa điểm sử dụng", value: data?.place_of_use },
        { label: "Tài liệu kèm theo", value: data?.attachments },
        { label: "Số kiểm soát", value: data?.code },
      ]
      setDetailData(data)
      setHistoryData(tableInfo)
    } catch (error) {
      log("getDetail error", error)
    }
  }

  const performGoBack = () => {
    navigator.goBack()
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header backAction={performGoBack} label="Chi tiết giao nhận" />
      <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
        <SizedBox height={20} />
        <Text variant="titleLarge">Thông tin chi tiết</Text>
        <SizedBox height={20} />
        <HistoryItem label={detailData?.code ?? "Loading..."} date={detailData?.created_date} children={undefined} />
        <SizedBox height={20} />
        <HistoryInfo historyData={historyData} children={undefined} />
      </ScrollView>
      <Button
        style={styles.buttonStyle}
        contentStyle={styles.buttonContentStyle}
        mode="contained"
        onPress={performGoBack}
      >
        Trở lại
      </Button>
    </SafeAreaView>
  )
}

export default DeliveryDetail
