import { env } from 'node:process'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      env: typeof env
      readonly NODE_ENV: 'development' | 'production'
      readonly PORT: number
      readonly DB_NAME: string
      readonly DB_USER: string
      readonly DB_PASSWORD: string
      readonly DB_HOST: string
      readonly DB_PORT: number
      readonly SECRET_KEY: string
      readonly REFRESH_KEY: string
    }
  }
}

export default global
