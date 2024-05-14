import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flexGrow: 0,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonContainerStyle: {
    borderRadius: 5,
  },
})
