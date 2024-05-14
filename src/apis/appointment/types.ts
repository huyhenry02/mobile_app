export interface AppointmentCreateRequest {
  name: string
  employee_id: string
  email: string
  start_time: string
  end_time: string
  phone: string
  identification: string
  reason: string
}

export interface AppointmentCreateResponse {
  id: string
  employee_id: string
  registerer_id: string
  name: string
  email: string
  start_time: string
  end_time: string
  phone: string
  identification: string
  reason: string
  status: string
}
