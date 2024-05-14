export interface UseToken {
  message: string
  access_token: string
}

export interface LoginResponse {
  message: string
  status?: number
  access_token: string
}
