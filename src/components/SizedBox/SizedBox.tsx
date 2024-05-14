import React from "react"
import { View } from "react-native"
import { SizedBoxTypes } from "./types"

const SizedBox = (props: SizedBoxTypes) => {
  const { height, width } = props

  const sizedBoxStyle = {
    height,
    width,
  }

  return <View style={sizedBoxStyle} />
}

export default SizedBox
