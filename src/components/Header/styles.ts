import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    height: 32,
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  labelStyle: {
    fontWeight: "700",
    color: COLORS.blackText,
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
})
