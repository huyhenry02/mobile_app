import { Platform } from "react-native"

import Fonts from "/assets/fonts"

// Use your favorite font depend on each platform
// Must use the <Text> and <Button> component from "/components" in order to work
export default {
  normal: Platform.select({ android: Fonts.RobotoRegular }),
  bold: Platform.select({ android: Fonts.RobotoBold }),
}
