import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: 60,
    paddingHorizontal: 40,
    justifyContent: "space-between",
  },
  loginButtonContainer: {
    borderRadius: 5,
    minHeight: 48,
  },
  loginLabelStyle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
  forgotPasswordLabel: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.blue,
    textAlign: "center",
  },
})
