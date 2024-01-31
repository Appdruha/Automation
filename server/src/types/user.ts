export interface UserRequestBody {
  readonly email: string
  readonly password: string
  readonly rememberMe: boolean
}

export interface UserResponseBody {
  readonly accessToken: string
  readonly id: number
}