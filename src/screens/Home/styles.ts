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
    justifyContent: "center",
    alignItems: "center",
  },
  scannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  scannerButton: {
    minWidth: 300,
    minHeight: 300,
    width: 300,
    height: 300,
    borderRadius: 300,
  },
})
