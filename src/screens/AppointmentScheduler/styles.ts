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
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 5,
    flex: 1,
  },
  buttonContentStyle: {
    height: 48,
  },
  dateSelectorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateSelectorView: {
    flex: 1,
    marginRight: 10,
  },
  timeSelectorView: {
    width: 100,
  },
})
