import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Routes from "./Routes"

import { Home, Login } from "/screens"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeDrawerContent from "./HomeDrawerContent"
import TabMainStack from "./main-navigator"

const Drawer = createDrawerNavigator()

const HomeStack = () => (
  <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={HomeDrawerContent}>
    <Drawer.Screen name={Routes.MAIN} component={TabMainStack} />
  </Drawer.Navigator>
)

export default HomeStack
