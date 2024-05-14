import { StyleProp, ViewStyle } from "react-native"

export interface DatePickerFieldProps {
  label?: string
  selectedDate: Date
  format?: string
  performShowDatePicker: () => void
  style?: StyleProp<ViewStyle> | undefined
  right?: React.ReactNode
}
