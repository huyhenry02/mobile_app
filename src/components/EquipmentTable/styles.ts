import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  rowContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
  },
  cellContainer: {
    flex: 1,
    borderLeftWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
})
