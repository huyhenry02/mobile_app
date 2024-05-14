export interface Props {}

export interface TypeInput {
  icon: string
  placeholder: string
  onChangeText: (onChange: OnChangeText) => void
  secureTextEntry: boolean
  type: Input
}

export interface OnChangeText {
  value: string
  type: Input
}

export enum Input {
  EMAIL,
  PASSWORD,
  NAME,
  FIRST_NAME,
  LAST_NAME,
  PHONE,
  ADDRESS,
  CURRENT_PASSWORD,
  NEW_PASSWORD,
  CONFIRM_PASSWORD,
  CODE_FORGOT_PASSWORD,
}

export interface Social {
  email?: string
  token: string
  avatar?: string
}
