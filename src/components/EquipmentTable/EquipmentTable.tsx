import React from "react"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { EquipmentElementInfo, EquipmentTableProps } from "./types"
import { View } from "react-native"
import { Text } from "react-native-paper"

const EquipmentTable = (props: EquipmentTableProps) => {
  const { equipmentData } = props
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const renderRow = (item: EquipmentElementInfo, index: number) => {
    return (
      <View key={index} style={styles.rowContainer}>
        <View style={styles.cellContainer}>
          <Text variant={index === 0 ? "titleMedium" : undefined}>{item?.label}</Text>
        </View>
        <View style={styles.cellContainer}>
          <Text variant={index === 0 ? "titleMedium" : undefined}>{item?.value}</Text>
        </View>
      </View>
    )
  }

  return <View style={styles.container}>{equipmentData.map(renderRow)}</View>
}

export default EquipmentTable
