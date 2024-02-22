import { RootRouter } from './routes/RootRouter.tsx'
import './app.module.css'
import { ThemeProvider } from '@mui/material'
import { theme } from './theme/theme.ts'

export const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <RootRouter />
    </ThemeProvider>
  )
}