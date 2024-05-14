import { StateType } from "typesafe-actions"
import reducers from "./reducers"

export type AppState = StateType<typeof reducers>
// export type AppAction
