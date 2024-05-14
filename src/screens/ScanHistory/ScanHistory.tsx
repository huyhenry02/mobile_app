import React from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"
import { ScanHistoryItem } from "/components"
import { useMMKVObject } from "react-native-mmkv"
import { GetAssetDetailResponse } from "/apis/assets/types"
import { KEY_STORAGE } from "/common"
import { FlatList, ListRenderItemInfo } from "react-native"

const ScanHistory = () => {
  const [scanHistory, setScanHistory] = useMMKVObject<Array<GetAssetDetailResponse>>(KEY_STORAGE.SCAN_HISTORY)
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const renderItem = ({ item, index }: ListRenderItemInfo<GetAssetDetailResponse>) => {
    return <ScanHistoryItem data={item} />
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList renderItem={renderItem} data={scanHistory} contentContainerStyle={styles.contentContainerStyle} />
    </SafeAreaView>
  )
}

export default ScanHistory
