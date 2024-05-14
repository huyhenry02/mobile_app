import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Account, Appointment, Connect, ElectronicProfile, Home, Notification, ScanHistory } from "/screens"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Routes from "./Routes"
import { BottomNavigation } from "react-native-paper"
import { SOS } from "/screens/SOS"

const Tab = createBottomTabNavigator()

export interface PropsTabBottom {
  name: string
  component: React.ComponentType<any>
  icon: string
  color: string
  displayName: string
}

export const TAB_BOTTOM = () => {
  return [
    {
      displayName: "Scan QR",
      component: Home,
      icon: "qrcode-scan",
      color: "#FFFFFF",
      name: Routes.HOME,
    },
    {
      displayName: "Thông báo",
      component: Notification,
      icon: "bell",
      color: "#FFFFFF",
      name: Routes.NOTIFICATION,
    },
    {
      displayName: "Lịch hẹn",
      component: Appointment,
      icon: "calendar-month",
      color: "#FFFFFF",
      name: Routes.APPOINTMENT,
    },
    {
      displayName: "SOS",
      component: SOS,
      icon: "alarm-light",
      color: "#FFFFFF",
      name: Routes.SOS,
    },
    {
      displayName: "Hồ sơ điện tử",
      component: ElectronicProfile,
      icon: "file-multiple",
      color: "#FFFFFF",
      name: Routes.ELECTRONIC_PROFILE,
    },
    {
      displayName: "Tài khoản",
      component: Account,
      icon: "account-circle",
      color: "#FFFFFF",
      name: Routes.ACCOUNT,
    },
  ]
}

const TabComponent = (props: PropsTabBottom, index: number) => {
  return (
    <Tab.Screen
      key={index.toString()}
      name={props.name}
      component={props.component}
      options={{
        headerShown: false,
        tabBarLabel: props.displayName,
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name={props.icon} color={color} size={24} />,
      }}
      listeners={{
        focus: () => {},
      }}
    />
  )
}

const TabMainStack = () => {
  return (
    <Tab.Navigator detachInactiveScreens={false}>
      {TAB_BOTTOM().map((item, index) => TabComponent(item, index))}
    </Tab.Navigator>
  )
}

export default TabMainStack
