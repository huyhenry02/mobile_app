import { InferableComponentEnhancerWithProps } from "react-redux"

export enum ReduxStateType {
  INIT,
  LOADING,
  LOADED,
  ERROR,
  CANCELED,
}

export interface ReduxState<T> {
  data?: T
  state: ReduxStateType
  error?: Error
}

export type ReduxScreenProps<T> = T extends InferableComponentEnhancerWithProps<infer P, any> ? P : {}

export const isDataRedux = <T>(data: unknown): data is ReduxState<T> => true
