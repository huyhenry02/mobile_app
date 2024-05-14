import { AppointmentCreateRequest } from "/apis/appointment/types"

export interface AppointmentCreateFields {
  fieldKey: keyof AppointmentCreateRequest
  label: string
  placeholder: string
  onChangeText: (text: string) => void
}
