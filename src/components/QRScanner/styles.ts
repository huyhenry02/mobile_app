import { StyleSheet } from "react-native"

import { COLORS } from "/common/colors"
import { width } from "/utils/dimension"

export default StyleSheet.create({
  container: {
    justifyContent: "space-between",
  },

  topConnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    position: "absolute",
    top: 0,
    zIndex: 1,
    paddingHorizontal: 65 / 2,
  },
  middleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bottomConnerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: width,
    position: "absolute",
    bottom: 0,
    zIndex: 1,
    paddingHorizontal: 65 / 2,
  },
  squareScanner: {
    borderWidth: 3,
    borderColor: "rgb(47, 74, 161)",
    borderRadius: 8,
    width: width - 65,
    height: width - 65,
  },
  lottieStyle: {
    width: width - 65,
    height: width - 62,
    left: -3,
    top: -4,
  },
  styleSquareBehind: {
    left: -3,
    top: -3,
    borderWidth: 3,
    position: "absolute",
    borderRadius: 0,
    zIndex: -1,
    borderColor: "rgba(47, 74, 161,0.4)",
  },
  iconButton: {
    position: "absolute",
    left: 20,
    top: 50,
    zIndex: 2,
  },
  connerStyle: {
    width: 60,
    height: 60,
    position: "absolute",
  },
  topContainer: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
    flex: 1,
  },
  bottomContainer: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingBottom: 30,
    flex: 1,
  },
  backgroundLeft: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    width: 65 / 2,
    height: width - 65,
  },
  backgroundRight: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    width: 65 / 2,
    height: width - 65,
  },

  backgroundTop: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    position: "absolute",
    left: 0,
    top: 0,
    width: width,
    height: 65 / 2,
  },
  backgroundBottom: {
    backgroundColor: "rgba(47, 74, 161,0.4)",
    position: "absolute",
    right: 0,
    bottom: 0,
    width: width,
    height: 65 / 2,
  },
  labelHint: {
    color: COLORS.white,
  },
})
