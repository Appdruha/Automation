import { Box, Typography } from '@mui/material'

export const Footer = () => {
  return (
    <Box
      component="footer"
      bgcolor="secondary.main"
      flexGrow={1}
      sx={{
        height: '56px',
        display: 'flex',
      }}
    >
      <Typography
        component="span"
        fontSize={14}
        sx={{
          margin: 'auto'
        }}
      >
        Copyright © Appdruha 2024
      </Typography>
    </Box>
  )
}