import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW, width } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    borderWidth: 1,
    height: 48,
    borderRadius: 5,
    borderColor: "#DDE4EE",
    width: width - 40,
    alignSelf: "center",
  },
  inputStyle: {
    minHeight: 48,
  },
  searchFieldBaseStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "400",
    paddingRight: 16,
  },
  iconContainer: {
    height: 28,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  emptyDataText: {
    textAlign: "center",
  },
  scrollViewContentStyle: {
    paddingHorizontal: 20,
  },
})
