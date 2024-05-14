import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, isAndroid, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  buttonsNavigationContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  buttonNavigationStyle: {
    borderRadius: 5,
  },
  imageStyle: {
    height: 173,
    marginBottom: 10,
  },
  contentContainerStyle: {
    paddingHorizontal: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: isAndroid ? 20 : 0,
  },
  buttonStyle: {
    height: 48,
    borderRadius: 5,
    flex: 1,
  },
  buttonContentStyle: {
    height: 48,
  },
  buttonLabelStyle: {
    marginHorizontal: 0,
  },
})
