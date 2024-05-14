import { CommonActions, NavigationContainerRef, StackActions } from "@react-navigation/native"
import * as React from "react"
import Routes from "./Routes"
import { ScreenRoute } from "./types"

export const navigationRef = React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>()
export const isMountedRef = React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>()

export function navigate(name: ScreenRoute, params?: any) {
  navigationRef.current?.navigate(name, params)
}

export function reset(routeName: string, params: { [key: string]: any }) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  )
}

export function push(args: any) {
  navigationRef.current?.dispatch(StackActions.push(args))
}
export function goBack() {
  navigationRef.current?.goBack()
}

export function getCurrentScreen() {
  return navigationRef.current?.getCurrentRoute()?.name
}
