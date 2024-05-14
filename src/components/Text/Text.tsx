import React from "react"
import { Text as RNText, StyleSheet } from "react-native"
import TextProps from "./TextProps"
import styles from "./styles"
import { Typography } from "/configs"

const Text = (props: TextProps) => {
  const { multiLang, children, style: styleOverride, color, typography: typographyKey, ...rest } = props

  const style = StyleSheet.flatten([styles.text, { color, fontFamily: Typography[typographyKey] }, styleOverride])

  if ((!children || children === "") && !multiLang) {
    return null
  }

  return (
    <RNText style={style} {...rest}>
      {children}
    </RNText>
  )
}

Text.defaultProps = {
  typography: "normal",
  style: {},
}

export default Text
