import { RouteProp } from "@react-navigation/native"
import Routes from "./Routes"
export type RootStackParamList = {
  [Routes.SPLASH]: {}
  [Routes.AUTH]: {}
  [Routes.HOME_STACK]: {}
  [Routes.HOME]: {}
  [Routes.MAIN]: {}
  [Routes.CREATE_DELIVERY_NOTE]: { asset_id: string; name: string }
  [Routes.REPORT_EQUIPMENT]: { asset_id: string }
  [Routes.HISTORY_DELIVERY]: { asset_id: string }
  [Routes.HISTORY_MAINTENANCES]: { asset_id: string }
  [Routes.DELIVERY_DETAIL]: { id: string }
  [Routes.MAINTENANCE_DETAIL]: { id: string }
  [Routes.EQUIPMENT_DETAIL]: { id: string }
  [Routes.SCAN_HISTORY]: {}
  [Routes.APPOINTMENT_SCHEDULER]: { employee_id: string }
}
export type ScreenRoute =
  | Routes.SPLASH
  | Routes.AUTH
  | Routes.MAIN
  | Routes.CREATE_DELIVERY_NOTE
  | Routes.REPORT_EQUIPMENT
  | Routes.HISTORY_DELIVERY
  | Routes.HISTORY_MAINTENANCES
  | Routes.DELIVERY_DETAIL
  | Routes.MAINTENANCE_DETAIL
  | Routes.EQUIPMENT_DETAIL
  | Routes.SCAN_HISTORY
  | Routes.APPOINTMENT_SCHEDULER

export type SplashRoute = RouteProp<RootStackParamList, Routes.SPLASH>
export type AuthRoute = RouteProp<RootStackParamList, Routes.AUTH>
export type MainNoteRoute = RouteProp<RootStackParamList, Routes.MAIN>
export type HomeRoute = RouteProp<RootStackParamList, Routes.HOME>
export type CreateDeliveryNoteRoute = RouteProp<RootStackParamList, Routes.CREATE_DELIVERY_NOTE>
export type ReportEquipmentRoute = RouteProp<RootStackParamList, Routes.REPORT_EQUIPMENT>
export type HistoryDeliveryRoute = RouteProp<RootStackParamList, Routes.HISTORY_DELIVERY>
export type HistoryMaintenancesRoute = RouteProp<RootStackParamList, Routes.HISTORY_MAINTENANCES>
export type DeliveryDetailRoute = RouteProp<RootStackParamList, Routes.DELIVERY_DETAIL>
export type MaintenanceDetailRoute = RouteProp<RootStackParamList, Routes.MAINTENANCE_DETAIL>
export type EquipmentDetailRoute = RouteProp<RootStackParamList, Routes.EQUIPMENT_DETAIL>
export type AppointmentSchedulerRoute = RouteProp<RootStackParamList, Routes.APPOINTMENT_SCHEDULER>
