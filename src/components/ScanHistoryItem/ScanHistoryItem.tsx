import React from "react"

import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { Card } from "react-native-paper"
import { ScanHistoryItemProps } from "./types"
import { getAssetImage } from "/utils/utils"
import Routes from "/navigators/Routes"

const ScanHistoryItem = (props: ScanHistoryItemProps) => {
  const { data } = props
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const performNavigation = () => {
    navigator.navigate(Routes.EQUIPMENT_DETAIL, { id: data?.id })
  }

  return (
    <Card onPress={performNavigation}>
      <Card.Title title={data?.name} subtitle={data?.code} />
      <Card.Cover source={{ uri: getAssetImage(data?.asset_images) }} resizeMode="center" style={{ height: 100 }} />
    </Card>
  )
}

export default ScanHistoryItem
