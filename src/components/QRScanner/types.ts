import { GestureResponderEvent } from "react-native"

export interface QRScannerProps {
  onPress: (event: GestureResponderEvent) => void
  torchOnPress: () => void
  launcherLibrary: () => void
}
