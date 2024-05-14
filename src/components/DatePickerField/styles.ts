import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonSelectStyle: {
    position: "absolute",
    width: "100%",
    height: "80%",
  },
})
