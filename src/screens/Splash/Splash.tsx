import { Indicator } from "/components"
import React, { useEffect } from "react"
import { View } from "react-native"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import Routes from "/navigators/Routes"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import TokenService from "/apis/tokenServices"

const Splash = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    ;(async () => {
      const accessToken = await TokenService.getLocalAccessToken()
      if (accessToken) {
        navigator.navigate(Routes.HOME_STACK, { screen: Routes.HOME })
      } else {
        navigator.navigate(Routes.AUTH as never)
      }
    })()

    // navigator.navigate(Routes.AUTH, {})
  }, [])

  return (
    <View style={styles.container}>
      <Indicator isLoading={true} />
    </View>
  )
}

export default Splash
