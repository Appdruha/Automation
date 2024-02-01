export interface UserRequestBody {
  readonly email: string
  readonly password: string
}

export interface UserResponseBody {
  readonly accessToken: string
  readonly user: {
    id: number
    email: string
  }
}