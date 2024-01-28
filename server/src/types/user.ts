import { Optional } from "sequelize";

export interface AuthRequestBody {
  readonly email: string
  readonly password: string
  readonly rememberMe: boolean
}

export interface UserAttributes {
  id: number
  email: string
  password: string
}

export interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }