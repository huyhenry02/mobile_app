import Card, { Props as OriginalProps } from "react-native-paper/src/components/Card/Card"

export interface HistoryItemProps extends OriginalProps {
  mode?: "contained" | "outlined" | "elevated"
  elevation?: never
  label: string
  date?: string
}
