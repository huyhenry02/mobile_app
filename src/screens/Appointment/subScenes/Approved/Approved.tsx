import React from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"
import { View } from "react-native"

const Approved = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.container}>
      <Text>Approved</Text>
    </View>
  )
}

export default Approved
