import { StyleProp, ViewStyle } from "react-native"

export interface Props {
  size?: "small" | "large"
  color?: string
  containerStyle?: StyleProp<ViewStyle>
  wrapLoading?: {}
  isLoading: boolean
}
