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
  emptyDataText: {
    textAlign: "center",
  },
  buttonStyle: {
    height: 48,
    borderRadius: 5,
    margin: 20,
  },
  buttonContentStyle: {
    height: 48,
  },
  surface: {
    marginHorizontal: 20,
    marginVertical: 20,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  searchFieldContainer: {
    margin: 20,
  },
})
