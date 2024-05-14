import { NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native"

import { Props as OriginalProps } from "react-native-paper/src/components/TextInput/TextInput"
export interface InputFieldTypes extends OriginalProps {
  iconName?: string
  isPassword?: boolean
  inputFieldStyle?: "flat" | "outlined"
  label?: string
  isRequire?: boolean
  errorMessage?: string
  value?: string | undefined
  secureTextEntry?: boolean
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
  right?: React.ReactNode
}
