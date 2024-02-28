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
        list: {
          '&[role="menu"]': {
            backgroundColor: '#D9D9D9',
            width: '200px',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          border: '1px solid #613812',
          fontSize: '1rem',
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
          margin: 'auto',
          display: 'block',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFE0C2',
          boxShadow:
            '0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)',
        },
      },
    },
  },
})
