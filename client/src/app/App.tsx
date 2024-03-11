import { RootRouter } from './routes/Root-router.tsx'
import './app.module.css'
import '../styles/fonts.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.ts'
import { useLayoutEffect } from 'react'
import { useRefreshTokenMutation } from '../api/user-api.ts'

export const App = () => {
  const [refresh, {}] = useRefreshTokenMutation()

  useLayoutEffect(() => {
    refresh()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
    </ThemeProvider>
  )
}