import { useNavigation } from "@react-navigation/native"
import React, { useEffect, useState } from "react"
import { BackHandler, Keyboard, View } from "react-native"

import * as authApi from "/apis/auth"
import styles from "./styles"
import Routes from "/navigators/Routes"
import { Header, Indicator, InputField, SizedBox } from "/components"
import { RootStackParamList } from "/navigators/types"
import { Button, Snackbar } from "react-native-paper"
import { COLORS } from "/common/colors"
import { SafeAreaView } from "react-native-safe-area-context"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { log, useDoubleBackPressExit } from "/utils"

const Login = () => {
  const navigator = useNavigation<NativeStackNavigationProp<RootStackParamList>>()
  const [userName, setUserName] = useState<string>("NS00000")
  const [password, setPassword] = useState<string>("Superadmin1@")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isShowSnackBar, setIsShowSnackBar] = useState<boolean>(false)
  const [snackBarMessage, setSnackBarMessage] = useState<string>("")

  useDoubleBackPressExit(() => {
    BackHandler.exitApp()
  })

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener("keyboardDidShow", () => {
      //
    })
    const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
      //
    })

    return () => {
      keyboardDidHideListener.remove()
      keyboardDidShowListener.remove()
    }
  }, [])

  const performLogin = async () => {
    setIsLoading(true)
    try {
      await authApi.login({ password, username: userName })

      setIsLoading(false)
      navigationToHome()
    } catch (error) {
      setIsLoading(false)
      setIsShowSnackBar(true)

      setSnackBarMessage((error as Error)?.message)
      log("performLogin error", error)
    }
  }

  const navigationToHome = () => {
    // navigator.navigate(Routes.EQUIPMENT_DETAIL, { id: "974a3b64-df02-4239-b0c8-061822863e40" })
    navigator.navigate(Routes.HOME_STACK, { screen: Routes.HOME })
  }

  const navigationToScheduler = () => {
    navigator.navigate(Routes.APPOINTMENT_SCHEDULER, { employee_id: "5d64fbf5-9290-4e85-b96c-8876f48c2986" })
  }

  return (
    <SafeAreaView style={styles.container} edges={["right", "bottom", "left"]}>
      <Header label="Đăng nhập" />
      <View style={styles.contentContainer}>
        <View>
          <InputField
            iconName="account-circle-outline"
            inputFieldStyle="flat"
            placeholder="User name"
            label="User name"
            value={userName}
            onChangeText={setUserName}
            isRequire={true}
          />
          <SizedBox width={24} height={24} />
          <InputField
            iconName="lock-outline"
            isPassword={true}
            inputFieldStyle="flat"
            placeholder="Password"
            label="Password"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
            isRequire={true}
          />
          <SizedBox width={24} height={48} />
          <Button
            mode="contained"
            buttonColor="#004EC3"
            style={styles.loginButtonContainer}
            contentStyle={styles.loginButtonContainer}
            onPress={performLogin}
          >
            Đăng Nhập
          </Button>
          <SizedBox width={24} height={28} />
          <Button
            mode="text"
            buttonColor={COLORS.white}
            rippleColor={COLORS.white}
            textColor="#004EC3"
            onPress={() => {
              setSnackBarMessage("Tính năng chưa hoạt động")
              setIsShowSnackBar(true)
            }}
          >
            Quên mật khẩu?
          </Button>
        </View>
        <Button
          mode="text"
          buttonColor={COLORS.white}
          rippleColor={COLORS.white}
          textColor="#004EC3"
          onPress={navigationToScheduler}
        >
          Đặt lịch hẹn
        </Button>
      </View>
      <Snackbar visible={isShowSnackBar} onDismiss={() => setIsShowSnackBar(false)}>
        {snackBarMessage}
      </Snackbar>
      <Indicator isLoading={isLoading} />
    </SafeAreaView>
  )
}

export default Login
