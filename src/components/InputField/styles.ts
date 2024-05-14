import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { fontSizer, getScreenHeight, getScreenWidth, responsiveH, responsiveW } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 48,
  },
  inputFieldBaseStyle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "400",
  },
  filledInputFieldStyle: {
    backgroundColor: COLORS.grayInputFeild,
    borderRadius: 14,
  },
  outlineInputFieldStyle: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.grayBorderColor,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  iconContainer: {
    height: 48,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  labelContainer: {
    paddingTop: 8,
    paddingBottom: 4,
  },
  labelText: {
    color: COLORS.darkText,
    fontSize: 14,
    fontWeight: "600",
  },
  requireText: {
    color: COLORS.alertRequire,
    fontSize: 14,
    fontWeight: "600",
  },
  errorMessageStyle: {},
})
