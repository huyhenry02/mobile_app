import { CreateAssetMaintenanceParams } from "/apis/assets/types"

export interface ListReportFields {
  fieldKey: keyof CreateAssetMaintenanceParams
  label: string
  placeholder: string
  onChangeText: (text: string) => void
  rightIcon?: string
  onRightIcon?: () => void
}
