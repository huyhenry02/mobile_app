import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { getScreenWidth, responsiveH } from "/utils/dimension"

const WIDTH = getScreenWidth(1)

export default StyleSheet.create({
  dialog: {
    backgroundColor: COLORS.opacityBlack,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 99,
  },
  wrapLoading: {
    backgroundColor: COLORS.opacityBlack,
    padding: responsiveH(30),
    borderRadius: responsiveH(20),
  },
})
