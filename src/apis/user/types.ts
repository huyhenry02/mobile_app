export interface TRANSACTION_DATA {
  currentMoney?: number
  totalMoneyAdd?: number
  totalMoneyUsed?: number
  currencyUnit?: string
  listTransaction?: Array<TRANSACTION_ITEM>
}

export interface TRANSACTION_DETAIL {
  nameProduct?: string
  type?: number
  timeCreated?: number
  orderCode?: string
  priceProduct?: number
  fee?: number
  paymentValue?: number
  status?: number
  paymentMethod?: string
  currencyUnit?: string
}
export interface TRANSACTION_ITEM {
  id?: number
  memberId?: number
  money?: number
  type?: number
  status?: number
  body?: string
  note?: string
  createdBy?: number
  createdDate?: string
  objectInfo?: string
  bill?: number
  monetaryValue?: number
  currencyUnit?: number
}
export interface NOTIFICATION_FULL {
  data?: Array<NOTIFICATION_DATA>
  totalNotifyNotYet?: number
  totalRow?: number
}
export interface NOTIFICATION_DATA {
  fullName?: string
  flag?: string
  avatar?: string
  isRead?: boolean
  preContent?: string
  sufContent?: string
  titleObject?: string
  isAccept?: boolean
  isCancel?: boolean
  id?: number
  title?: string
  body?: string
  objectId?: number
  objectType?: string
  objectTypeId?: number
  groupObject?: string
  createdBy?: number
  createdDate?: string
  otherId?: number
}
export interface LIST_PACKAGE {
  id?: number
  price?: number
  currencyUnit?: string
  priority?: number
  status?: number
  name?: number
  description?: string
  priceUSD?: number
}
