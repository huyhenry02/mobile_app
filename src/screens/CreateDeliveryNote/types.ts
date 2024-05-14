import { CreateAssetDeliveryHistoryParams } from "/apis/assets/types"

export interface ListCreateDeliveryNodeFields {
  fieldKey: keyof CreateAssetDeliveryHistoryParams
  label: string
  placeholder: string
  onChangeText: (text: string) => void
}
