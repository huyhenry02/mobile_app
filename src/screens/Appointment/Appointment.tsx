import React from "react"

import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { RootStackParamList } from "/navigators/types"
import { SafeAreaView } from "react-native-safe-area-context"
import { Text } from "react-native-paper"
import { Header } from "/components"
import { Animated, TouchableOpacity, View, useWindowDimensions } from "react-native"
import { NavigationState, SceneMap, SceneRendererProps, TabView } from "react-native-tab-view"
import Routes from "/navigators/Routes"
import { Approved, Cancelled, Completed, InProgress, Pending } from "./subScenes"
import { TabBar } from "./components"

const renderScene = SceneMap({
  [Routes.SUB_APPOINTMENT_PENDING]: Pending,
  [Routes.SUB_APPOINTMENT_APPROVED]: Approved,
  [Routes.SUB_APPOINTMENT_IN_PROGRESS]: InProgress,
  [Routes.SUB_APPOINTMENT_COMPLETED]: Completed,
  [Routes.SUB_APPOINTMENT_CANCELLED]: Cancelled,
})

const Appointment = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: Routes.SUB_APPOINTMENT_PENDING, title: "Chờ duyệt" },
    { key: Routes.SUB_APPOINTMENT_APPROVED, title: "Đã duyệt" },
    { key: Routes.SUB_APPOINTMENT_IN_PROGRESS, title: "Đang diễn ra" },
    { key: Routes.SUB_APPOINTMENT_COMPLETED, title: "Hoàn thành" },
    { key: Routes.SUB_APPOINTMENT_CANCELLED, title: "Huỷ" },
  ])

  const renderTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any> }) => {
    return <TabBar {...props} currentIndex={index} onIndexChange={setIndex} />
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header label="Lịch hẹn" />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
      />
    </SafeAreaView>
  )
}

export default Appointment
