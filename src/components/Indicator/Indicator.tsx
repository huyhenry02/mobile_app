import React from "react"
import { View } from "react-native"

import { ActivityIndicator, MD2Colors, MD3Colors, Portal } from "react-native-paper"
import { COLORS } from "/common/colors"

import styles from "./styles"
import { Props } from "./types"

const Indicator = (props: Props) => {
  const { isLoading } = props

  return (
    <>
      {isLoading && (
        <View style={[styles.dialog, props.containerStyle]}>
          <ActivityIndicator animating={true} color={MD3Colors.primary0} size={"large"} />
        </View>
      )}
    </>
  )
}

export default Indicator
