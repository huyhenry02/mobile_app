import { useDispatch } from "react-redux"
import { Dispatch } from "redux"

import { AppAction } from "/redux"

const useDis = (): [Dispatch<AppAction>] => {
  const dispatch = useDispatch<Dispatch<AppAction>>()

  return [dispatch]
}

export default useDis
