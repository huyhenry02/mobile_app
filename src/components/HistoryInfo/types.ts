import Card, { Props as OriginalProps } from "react-native-paper/src/components/Card/Card"

export interface HistoryInfoProps extends OriginalProps {
  mode?: "contained" | "outlined" | "elevated"
  elevation?: never
  historyData: Array<HistoryItemInfoType>
}

export interface HistoryItemInfoType {
  label: string
  value: string
}
