import React, { useEffect, useState } from "react"
import { Header, HistoryInfo, HistoryItem, SizedBox } from "/components"
import styles from "./styles"
import { useNavigation, useRoute } from "@react-navigation/native"
import { log } from "/utils"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { MaintenanceDetailRoute, RootStackParamList } from "/navigators/types"
import { ScrollView } from "react-native"
import { Button, Text } from "react-native-paper"
import Routes from "/navigators/Routes"
import { HistoryItemInfoType } from "/components/HistoryInfo/types"
import { getDetailAssetMaintenance } from "/apis/assets"
import { GetDetailAssetMaintenanceResponse } from "/apis/assets/types"
import moment from "moment"

const TABLE_INFO_DEFAULT = [
  { label: "Người tạo phiếu", value: "..." },
  { label: "Lí do sửa chữa", value: "..." },
  { label: "Mô tả hỏng hóc", value: "..." },
  { label: "Nguyên nhân hư hỏng", value: "..." },
  { label: "Đề xuất xử lý", value: "..." },
  { label: "Số kiểm soát", value: "..." },
]

const MaintenanceDetail = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const route = useRoute<MaintenanceDetailRoute>()
  const id = route?.params?.id
  const [detailData, setDetailData] = useState<GetDetailAssetMaintenanceResponse>()
  const [historyData, setHistoryData] = useState<Array<HistoryItemInfoType>>(TABLE_INFO_DEFAULT)

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    try {
      const data = await getDetailAssetMaintenance({ id: id })
      const tableInfo: Array<HistoryItemInfoType> = [
        { label: "Người tạo phiếu", value: data?.created_by },
        { label: "Lí do sửa chữa", value: data?.reason },
        { label: "Mô tả hỏng hóc", value: data?.description },
        { label: "Nguyên nhân hư hỏng", value: data?.causal },
        { label: "Đề xuất xử lý", value: data?.proposal },
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
      <Header backAction={performGoBack} label="Chi tiết sửa chữa" />
      <ScrollView contentContainerStyle={styles.scrollViewContentStyle}>
        <SizedBox height={20} />
        <Text variant="titleLarge">Thông tin chi tiết</Text>
        <SizedBox height={20} />
        <HistoryItem
          label={detailData?.created_by ?? "Loading..."}
          date={detailData?.created_date}
          children={undefined}
        />
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

export default MaintenanceDetail
