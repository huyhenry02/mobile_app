import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import Routes from "./Routes"
import * as Screens from "../screens"
import { navigationRef } from "./_root_navigator"
import AuthStack from "./auth-navigator"
import TabMainStack from "./main-navigator"
import { RootStackParamList } from "./types"
import { createDrawerNavigator } from "@react-navigation/drawer"
import HomeStack from "./HomeStack"

const Stack = createNativeStackNavigator<RootStackParamList>()

const Drawer = createDrawerNavigator()
const AppNavigator = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
      <Stack.Screen name={Routes.SPLASH} component={Screens.Splash} />
      <Stack.Screen name={Routes.AUTH} component={AuthStack} />
      {/* <Stack.Screen name={Routes.MAIN} component={TabMainStack} /> */}
      <Stack.Screen name={Routes.HOME_STACK} component={HomeStack} options={{ gestureEnabled: false }} />
      <Stack.Screen
        name={Routes.CREATE_DELIVERY_NOTE}
        component={Screens.CreateDeliveryNote}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.REPORT_EQUIPMENT}
        component={Screens.ReportEquipment}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.HISTORY_DELIVERY}
        component={Screens.HistoryDelivery}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.HISTORY_MAINTENANCES}
        component={Screens.HistoryMaintenances}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.DELIVERY_DETAIL}
        component={Screens.DeliveryDetail}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.MAINTENANCE_DETAIL}
        component={Screens.MaintenanceDetail}
        options={{ gestureEnabled: true }}
      />
      <Stack.Screen
        name={Routes.EQUIPMENT_DETAIL}
        component={Screens.EquipmentDetail}
        options={{ gestureEnabled: true }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
