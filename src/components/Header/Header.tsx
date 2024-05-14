import React from "react"
import { SafeAreaView, TouchableOpacity, View } from "react-native"
import { Text } from "/components"
import { Appbar } from "react-native-paper"
import styles from "./styles"
import { useNavigation } from "@react-navigation/native"
import { log } from "/utils"
import { HeaderTypes } from "./types"
import Icon from "react-native-vector-icons/Ionicons"

const Header = (props: HeaderTypes) => {
  const { label, backAction, children, leftAction } = props
  const navigator = useNavigation()

  return (
    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.buttonContainer} onPress={backAction}>
    //     {backAction && <Icon name={leftIcon ?? "arrow-back-outline"} size={24} />}
    //   </TouchableOpacity>
    //   <Text style={styles.labelStyle}>{label ?? "Label"}</Text>
    //   <TouchableOpacity style={styles.buttonContainer} onPress={rightIconOnPress}>
    //     {rightIconOnPress && <Icon name={rightIcon!} size={24} />}
    //   </TouchableOpacity>
    // </View>

    <Appbar.Header safeAreaInsets={{ top: 0 }}>
      {backAction && <Appbar.BackAction onPress={backAction} />}
      {leftAction}
      <Appbar.Content title={label ?? "Label"} />
      {children}
    </Appbar.Header>
  )
}

export default Header
