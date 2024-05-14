import React from "react"

import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Drawer, Text } from "react-native-paper"
import { View } from "react-native"
import moment from "moment"
import { reset } from "./_root_navigator"
import Routes from "./Routes"
import TokenService from "/apis/tokenServices"

const HomeDrawerContent = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [active, setActive] = React.useState("")

  const onLogout = () => {
    TokenService.removeLocalTokenServices()
    reset(Routes.AUTH, { screen: Routes.LOGIN })
  }

  return (
    <SafeAreaView>
      <Drawer.Section title="Wish Care">
        <Drawer.Item label="Đăng xuất" onPress={onLogout} />
      </Drawer.Section>
    </SafeAreaView>
  )
}

export default HomeDrawerContent
