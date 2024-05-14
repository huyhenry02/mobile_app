import React from "react"
import { View } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Card, Text, Icon, MD3Colors } from "react-native-paper"
import styles from "./styles"
import CardActions from "react-native-paper/lib/typescript/components/Card/CardActions"
import { HistoryItemProps } from "./types"
import moment from "moment"

const HistoryItem = (props: HistoryItemProps) => {
  const { date, label, ...rest } = props
  const navigator = useNavigation()
  const createdDate = date ?? moment().format("YYYY-MM-DD HH:mm:ss")

  return (
    <Card {...rest}>
      <View style={styles.contentContainerStyle}>
        <Text variant="titleMedium">{label ?? ""}</Text>
        <View style={styles.bottomInfoContainer}>
          <View style={styles.textContainerStyle}>
            <Icon source="calendar-month-outline" color={MD3Colors.neutral0} size={20} />
            <Text variant="bodyMedium">
              {"   "}
              {moment(createdDate, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY")}
            </Text>
          </View>
          <View style={styles.textContainerStyle}>
            <Icon source="clock-outline" color={MD3Colors.neutral0} size={20} />
            <Text variant="bodyMedium">
              {"   "}
              {moment(createdDate, "YYYY-MM-DD HH:mm:ss").format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
      {rest.children}
    </Card>
  )
}

export default HistoryItem
