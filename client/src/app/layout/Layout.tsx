import { Outlet } from 'react-router-dom'
import { Container } from '@mui/material'

export const Layout = () => {
  return (
    <Container sx={{m: 'auto'}}>
      <header style={{ background: 'blue', width: '100vw' }}>111</header>
      <main>
        <Outlet />
      </main>
      <footer style={{ background: 'red', width: '100vw' }}>222</footer>
    </Container>
  )
}
