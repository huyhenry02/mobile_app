import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollViewContentStyle: {
    paddingHorizontal: 20,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 5,
    margin: 20,
  },
  buttonContentStyle: {
    height: 48,
  },
})
