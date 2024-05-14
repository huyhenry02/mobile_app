import React, { useMemo } from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Card, Text, Icon, MD3Colors } from "react-native-paper"
import styles from "./styles"
import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions"
import { HistoryInfoProps, HistoryItemInfoType } from "./types"

const HistoryInfo = (props: HistoryInfoProps) => {
  const { historyData, ...rest } = props
  const navigator = useNavigation()

  const renderItemInfo = (item: HistoryItemInfoType, index: number) => {
    const { label, value } = item

    return (
      <View style={styles.textContainerStyle} key={index}>
        <Text variant="titleMedium" style={styles.labelStyles}>
          {label}
        </Text>
        <Text variant="bodyLarge" style={styles.infoStyles}>
          {value}
        </Text>
      </View>
    )
  }

  const renderListInfo = useMemo(() => {
    return historyData?.map(renderItemInfo)
  }, [historyData])

  return (
    <Card {...rest} style={styles.container}>
      {renderListInfo}
      {rest.children}
    </Card>
  )
}

export default HistoryInfo
