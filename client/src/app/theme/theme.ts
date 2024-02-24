import { createTheme } from '@mui/material'
import { PaletteOptions } from '@mui/material/styles/createPalette'

declare module '@mui/material/styles' {
  interface Theme {
    palette: PaletteOptions
  }

  interface ThemeOptions {
    palette?: PaletteOptions
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: '#F79133',
    },
    secondary: {
      main: '#D9D9D9',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        paper: {

        },
        list: {
          '&[role="menu"]': {
            backgroundColor: '#D9D9D9',
            width: '200px',
          },
        },
      },
    },
  },
})