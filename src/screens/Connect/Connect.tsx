import React from "react"
import { SafeAreaView } from "react-native"
import { Text } from "/components"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"

const Connect = () => {
  const navigator = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Text>Connect</Text>
    </SafeAreaView>
  )
}

export default Connect
