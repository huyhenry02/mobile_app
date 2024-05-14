import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Routes from "./Routes"

import { Login, AppointmentScheduler } from "/screens"

const Stack = createNativeStackNavigator()

const AuthStack = () => (
  <Stack.Navigator screenOptions={{ gestureEnabled: false, headerShown: false }}>
    <Stack.Screen name={Routes.LOGIN} component={Login} />
    <Stack.Screen name={Routes.APPOINTMENT_SCHEDULER} component={AppointmentScheduler} />
  </Stack.Navigator>
)

export default AuthStack
