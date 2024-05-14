import { Animated, StyleProp, TextInputProps, ViewStyle } from "react-native"

import { Props as OriginalProps } from "react-native-paper/src/components/Searchbar"
export interface SearchFieldTypes extends OriginalProps {
  top: number
  module: "asset_delivery" | "asset_maintenance" | string
  moduleParentId: string
  style?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>
}
